let router = require('express').Router();
let controlleur = require('../controlleur/book.controlleur.js');

router.get('/list', controlleur.list)
router.get('/categories', controlleur.categories)
router.get('/categories/categorie', controlleur.categorie)
router.get('/book/:id', controlleur.bookDetails)
router.post('/find', controlleur.search)
module.exports = router;