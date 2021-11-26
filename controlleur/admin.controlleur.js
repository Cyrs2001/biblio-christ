
let bookModel = require('../Model/book.schema');
let adminModel = require('../Model/admin.schema');
let { categoriesOnInBody, uploadFiles } = require('../utils/utils')




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
    let { author, shortDescription, description } = req.body;
    let title = "Add Book . Biblio-christ"
    let categorie = categoriesOnInBody(req.body);
    let { pictureName, documentName, error } = await uploadFiles(req);

    if (pictureName !== "" && documentName !== "" 
       && pictureName !== undefined && documentName !== undefined) {
        try {
            let newBook = await bookModel.create({
                title: req.body.title,
                author,
                shortDescription,
                description,
                categorie,
                picture: "/assets/images/firstPages/" + pictureName,
                document: "/assets/pdf/books/" + documentName
            })
            let message = "succes"
            res.locals = { title, message }
            res.render('adminPages/addBook');
        } catch (error) {
            let message = "echec";
            res.locals = { title, message, error }
            res.render('adminPages/addBook');
        }
    } else{
        let message = "echec";
        res.locals = { title, message, error }
        res.render('adminPages/addBook');
    }
}
module.exports.deleteBook = async(req, res) => {
    let title = "Add Book . Biblio-Christ"
    try{
    await bookModel.deleteOne()
    let message = "Bien effacer"
    res.locals = {title, message}
        res.render('adminPages/addBook')
        }catch(e){
            let message = "Echec"
            res.locals = {title, message}
            res.render('adminPages/addBook')
            }
    
}
