let router = require('express').Router()
let controlleur = require('../controlleur/admin.controlleur')

router.get('/signup', (req, res) => {
    let title = "Inscription . Biblio-Christ";
    let action = '/signup';
    let formTitle = "Inscription";
    res.locals = { title, action, formTitle }
    res.render('adminPages/signUpIn');
})
router.get('/signin', (req, res) => {
    let title = "connexion . Biblio-Christ";
    let action = '/signin'
    let formTitle = "Connexion"
    res.locals = { title, action, formTitle }
    res.render('adminPages/signUpIn');
})

router.post('/signup', controlleur.signup)
router.post('/signin', controlleur.signin)
router.get('/logout', controlleur.logout)
router.get('/add_page', controlleur.addBookPage)


let multer = require('multer')
let upload = multer();
let fields = [
    { name: 'picture', maxCount: 1 },
    { name: 'document', maxCount: 1 }
  ]
router.post('/addBook',upload.fields(fields), controlleur.addBook)

module.exports = router;
