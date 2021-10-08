let fs = require('fs');
let { promisify } = require('util');
let pipeline = promisify(require('stream').pipeline);

const BOOK_BY_PAGE = 6;


module.exports.prevNextpage = (page, totalBook) => {
    let prev, next;
    totalPage = Math.ceil(totalBook / BOOK_BY_PAGE);
    prev = page - 1;
    next = page + 1;
    if (prev == 0) prev = undefined;
    if (next > totalPage) next = undefined;
    return [prev, next]
}
module.exports.categoriesOnInBody = (body) => {
    let categorie = []
    if (body.Amour) categorie.push("Amour")
    if (body.EspritSaint) categorie.push("Esprit-saint")
    if (body.Dieu) categorie.push("Dieu")
    if (body.Finance) categorie.push("Finance")
    if (body.Relation) categorie.push("Relation")
    if (body.Sante) categorie.push("Sante")

    return categorie;
}
module.exports.uploadFiles = async (req) => {
    let result = { pictureName : "", documentName : "", error : ""}
   
    try {
        if (
            req.files.picture[0].detectedMimeType !== "image/jpg" &&
            req.files.picture[0].detectedMimeType !== "image/png" &&
            req.files.picture[0].detectedMimeType !== "image/jpeg"
        ) throw Error("image invalid");
        if (req.files.picture[0].size > 1048576) throw Error("image trop lourd");

        if (req.files.document[0].detectedMimeType !== "application/pdf") throw Error("document invalid");
    } catch (e) {
        
        if(e.message.includes("image invalid")) result.error = "image invalid"
        if(e.message.includes("image trop lourd")) result.error = "image trop lourd"
        if(e.message.includes("document invalid")) result.error ="document invalid"
    }
    
    let imageExtention = req.files.picture[0].detectedFileExtension
    let pictureName = (req.body.author).toUpperCase() + "-" + (req.body.title).toLowerCase() + imageExtention
    let documentName = (req.body.author).toUpperCase() + "-" + (req.body.title).toLowerCase() + ".pdf"
    //save image
    await pipeline(
        req.files.picture[0].stream,
        fs.createWriteStream(
            `${__dirname}/../public/images/firstPages/${pictureName}`
        )
    )
    // save document
    await pipeline(
        req.files.document[0].stream,
        fs.createWriteStream(
            `${__dirname}/../public/pdf/books/${documentName}`
        )
    )
    return result
}
