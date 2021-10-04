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
    if (body.amour) categorie.push("amour")
    if (body.espritSaint) categorie.push("espritSaint")
    if (body.dieu) categorie.push("dieu")
    if (body.finance) categorie.push("finance")
    if (body.relation) categorie.push("relation")
    if (body.sante) categorie.push("sante")

    return categorie;
}