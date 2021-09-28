let BookModel = require('../Model/book.schema')
let url = require('url')
const BOOK_BY_PAGE = 6;

let prevNextpage = (page, totalBook) => {
    let prev, next;
    totalPage = Math.ceil(totalBook / BOOK_BY_PAGE);
    prev = page - 1;
    next = page + 1;
    if (prev == 0) prev = undefined;
    if (next > totalPage) next = undefined;
    return [prev, next]
}

module.exports.list = async (req, res) => {
    try {

        let page = Number(url.parse(req.url, true).query.page) || 1;
        let title = "Tous les livres · page " + page;
        let totalBook = await BookModel.count()
        let books = await BookModel.find().limit(BOOK_BY_PAGE).skip((page - 1) * BOOK_BY_PAGE);
        let [prevPage, nextPage] = prevNextpage(page, totalBook);
        let nav = "livres"
        res.locals = { books, totalBook, title, prevPage, page, nextPage, nav };
        res.status(200).render('allBook');
    } catch (e) {
        res.send("Echec de récupération de la bibliotheque de livre \n " + e);
    }
}

module.exports.categories = async (req, res) => {

    try {
        let title = 'Categories des livres . Biblio-Christ';
        let amour = await BookModel.find({ categorie: "Amour" }).count();
        let sante = await BookModel.find({ categorie: "Sante" }).count();
        let dieu = await BookModel.find({ categorie: "Dieu" }).count();
        let finance = await BookModel.find({ categorie: "Finance" }).count();
        let espritSaint = await BookModel.find({ categorie: "esprit-saint" }).count();
        let relation = await BookModel.find({ categorie: "Relation" }).count();
        let nav = "categories";
        // Mariage , Jeunesse , Couple, Deuil,  
        res.locals = { title, amour, sante, dieu, finance, espritSaint, relation, nav };
        res.render('categories');
    } catch (e) {
        res.send("echec de recuperation des categorie " + e)
    }
}

module.exports.categorie = async (req, res) => {
    try {
        let categorie = url.parse(req.url, true).query.name;
        let page = Number(url.parse(req.url, true).query.page) || 1;
        let title = "les livres " + categorie + " · page " + page;
        let totalBook = await BookModel.count()
        let books = await BookModel.find({ categorie }).limit(BOOK_BY_PAGE).skip((page - 1) * BOOK_BY_PAGE);
        let [prevPage, nextPage] = prevNextpage(page, totalBook);
        res.locals = { books, totalBook, title, prevPage, page, nextPage, categorie };
        res.status(200).render('allBookOfCategorie');
    } catch (e) {
        res.send("echec de recuperation du la categorie de livre choisi " + e);
    }
}

module.exports.bookDetails = async (req, res) => {
    try {
        let title = "Details du livre . Biblio-Christ"
        let book = await BookModel.findOne({ _id: req.params.id });
        res.locals = { title, book }
        res.render('bookDetails')
    } catch (error) {
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
