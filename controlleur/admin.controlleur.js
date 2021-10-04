let fs = require('fs');
let { promisify } = require('util');
let bookModel = require('../Model/book.schema');
let adminModel = require('../Model/admin.schema');
let { categoriesOnInBody } = require('../utils/utils')

let pipeline = promisify(require('stream').pipeline);



module.exports.signup = async (req, res) => {
    const { email, password } = req.body;
    let title = "Inscription . Biblio-Christ";
    let action = '/signup';
    let formTitle = "Inscription";
    try {
        let admin = await adminModel.create({ email, password });
        let message = { type: "succes", content: "inscription reussi" }
        res.locals = { title, action, formTitle, message }
        res.render('adminPages/signUpIn');
    } catch (error) {
        let message = { type: 'danger', content: "admin created is FAILLURE because ..." }
        res.locals = { title, action, formTitle, message }
        res.render('adminPages/signUpIn');
    }
}
module.exports.signin = async (req, res) => {
    const { email, password } = req.body;
    let title = "Connexion . Biblio-Christ";
    let action = '/signin';
    let formTitle = "Connexion";
    try {
        let admin = await adminModel.findOne({ email });
        if (admin.password !== password) throw "Password is not correct"
        res.cookie("adminID", admin._id, { maxAge: 9000000, httpOnly: true });
        let message = { type: "succes", content: "Connexion reussi" }
        res.locals = { title, action, formTitle, message }
        res.redirect('adminPages/addBook');
    } catch (error) {
        let message = { type: 'danger', content: "admin connexion is FAILLURE because ..." }
        res.locals = { title, action, formTitle, message }
        res.render('adminPages/signUpIn');
    }
}
module.exports.logout = (req, res) => {
    res.clearCookie("adminID");
    res.redirect('/')
}
module.exports.addBookPage = (req, res) => {
    let title = "Add Book . Biblio-christ"
    let message = undefined;
    let error = undefined
    res.locals = { title, message, error }
    res.render('adminPages/addBook');
}


module.exports.addBook = async (req, res) => {
    let filename;
    if (req.file) {
        try {
            if (
                req.file.detectedMimeType !== "images/jpg" &&
                req.file.detectedMimeType !== "images/png" &&
                req.file.detectedMimeType !== "images/jpeg"
            ) throw Error("ficher invalid");
            if (req.file.size > 500000) throw Error("max size");

        } catch (error) {

        }

        filename = req.body.author + req.body.title + ".jpg"
        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../public/images/firstPages/${filename}`
            )
        )
    }

    console.log('req.files.file');
    console.log(req.files.file[0].originalName);
    console.log('req.files.files');
    console.log(req.files.files[0].originalName);


    let { author, shortDescription, description } = req.body;
    let categorie = categoriesOnInBody(req.body);
    let title = "Add Book . Biblio-christ"

    try {
        let newBook = await bookModel.create({ title: req.body.title, author, shortDescription, description, categorie })
        let message = "succes"
        res.locals = { title, message }
        res.render('adminPages/addBook');
    } catch (error) {

        let message = "echec";
        res.locals = { title, message, error }
        res.render('adminPages/addBook');
    }
}