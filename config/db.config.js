const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Cyrs2001:CYRsewa@biblio.rqyq6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useFindAndModify: false,
    // useCreateIndex: true
}).then(() => console.log('connection a mongoo'))
.catch ( (err) =>  console.log('echec de connexion a mongo', err) )
