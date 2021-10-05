let router = require('express').Router();
let controlleur = require('../controlleur/book.controlleur.js');
//route : /books
//route : /books/list => give all book list
router.get('/list', controlleur.list)
//route : /books/categories => give all categories and number of every categorie
router.get('/categories', controlleur.categories)
//route : /books/categories/categorie => give book of categories you choose
router.get('/categories/categorie', controlleur.categorie)
//route : /books/book/id => give more information to book 'id'
router.get('/book/:id', controlleur.bookDetails)
//route : /books/find => searching book 
router.post('/find', controlleur.search)
module.exports = router;