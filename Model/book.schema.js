const mongoose = require('mongoose');

let bookSchema = new mongoose.Schema({
    title:{
        type : String,
        unique: true
    },
    author:{
        type : String,
        default: "Inconnu"
    },
    description:{
        type : String,
        minlength: 50
    },
    shortDescription :{
        type: String,
        maxlength: 200,
        minlength: 10    
    },
    comment:{
        type : []
    },
    categorie: {
        type :  []
    },
    totalDowload :{
        type: Number,
        default :0
    },
    picture :{
        type: String
    },
    document :{
        type: String
    }
})
bookModel = mongoose.model('book', bookSchema);

module.exports = bookModel;
