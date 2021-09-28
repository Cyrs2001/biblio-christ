let express = require('express');
require('./config/db.config');
let app = express();
let port = process.env.PORT || 8000;
let bookRouter = require('./routes/book.routes')

// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content, Accept,Content-Type');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//     next();
// })

app.set('view engine', 'ejs');
app.use('/assets', express.static('public'));

app.get('/', (req, res)=>{
    let title = "Acceuil . Biblio-christ";
    let nav = "acceuil";
    res.locals = {title, nav}
    res.render('index')
})

app.use('/books', bookRouter)

app.listen(port, ()=>{
    console.log('listen to port '+ port);
})