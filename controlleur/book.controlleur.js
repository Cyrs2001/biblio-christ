let BookModel = require('../Model/book.schema')
let url = require('url')
let { prevNextpage } = require('../utils/utils')
const BOOK_BY_PAGE = 6;



module.exports.list = async (req, res) => {
    let page = Number(url.parse(req.url, true).query.page) || 1;
    let title = "Tous les livres · page " + page;
    let nav = "livres";

    try {
        let totalBook = await BookModel.count();
        let [prevPage, nextPage] = prevNextpage(page, totalBook);
        let books = await BookModel.find().limit(BOOK_BY_PAGE).skip((page - 1) * BOOK_BY_PAGE);
        res.locals = { title, nav, books, totalBook, prevPage, page, nextPage };
        res.status(200).render('allBook');
    } catch (e) {
        //*******************definir une meilleur response en cas d'echec */
        res.send("Echec de récupération de la bibliotheque de livre \n " + e);
    }
}

module.exports.categories = async (req, res) => {
    let title = 'Categories des livres . Biblio-Christ';
    let nav = "categories";
    /**prochaine mise a jour : definir une collection de categories avec leur couleur en frontEnd
     * utiliser une boucle en frontEnd comme en BackEnd pour la gestion des categories, au final on renverra 
     * un tableau de 
     * categorie
     */
    try {
        let amour = await BookModel.find({ categorie: "Amour" }).count();
        let sante = await BookModel.find({ categorie: "Sante" }).count();
        let dieu = await BookModel.find({ categorie: "Dieu" }).count();
        let finance = await BookModel.find({ categorie: "Finance" }).count();
        let espritSaint = await BookModel.find({ categorie: "Esprit-saint" }).count();
        let relation = await BookModel.find({ categorie: "Relation" }).count();

        // Mariage , Jeunesse , Couple, Deuil
        res.locals = { title, nav, amour, sante, dieu, finance, espritSaint, relation };
        res.render('categories');
    } catch (e) {
        //*******************definir une meilleur response en cas d'echec */
        res.send("echec de recuperation des categorie " + e)
    }
}

module.exports.categorie = async (req, res) => {
    let categorie = url.parse(req.url, true).query.name;
    let page = Number(url.parse(req.url, true).query.page) || 1;
    let title = "les livres " + categorie + " · page " + page;
    try {
        // totalBook of categories who selected
        let totalBook = await BookModel.find({ categorie }).count()
        let books = await BookModel.find({ categorie }).limit(BOOK_BY_PAGE).skip((page - 1) * BOOK_BY_PAGE);
        let [prevPage, nextPage] = prevNextpage(page, totalBook);
        res.locals = { title, books, totalBook,  categorie, prevPage, page, nextPage };
        res.status(200).render('allBookOfCategorie');
    } catch (e) {
          //*******************definir une meilleur response en cas d'echec */
        res.send("echec de recuperation du la categorie de livre choisi " + e);
    }
}

module.exports.bookDetails = async (req, res) => {
    let title = "Details du livre . Biblio-Christ"
    try {
        let book = await BookModel.findOne({ _id: req.params.id });
        res.locals = { title, book }
        res.render('bookDetails')
    } catch (error) {
        console.log(error);
        res.send("Error lors de la recuperation du livre " + error);
    }
}
module.exports.search = async (req, res) => {
    try {
        book = await BookModel.find({ 'author': { $regex: 'Abc' } }).limit(20);
        res.send(book)
    } catch (error) {
        res.send("Error lors de la recuperation du livre " + error);
    }
}
