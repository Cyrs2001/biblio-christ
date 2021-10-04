let mongoose = require('mongoose')

let adminSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required : true
    },
    password: {
        type: String,
        required : true
    },
    BooksAdd:{
        type: []
    }
})

let adminModel = mongoose.model('admin', adminSchema)
module.exports = adminModel;