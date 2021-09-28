const mongoose = require('mongoose');

let bookSchema = new mongoose.Schema({
    title:{
        type : String
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
        maxlength: 50,
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
    }
})
bookModel = mongoose.model('book', bookSchema);

module.exports = bookModel;
