const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/Biblio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useFindAndModify: false,
    // useCreateIndex: true
}).then(() => console.log('connection a mongoo'))
.catch ( (err) =>  console.log('echec de connexion a mongo', err) )