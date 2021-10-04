let express = require('express');
require('./config/db.config');
let app = express();
let port = process.env.PORT || 8000;
let bookRouter = require('./routes/book.routes')
let adminRouter = require('./routes/admin.routes')
let bodyParser = require('body-parser');
let session  = require('express-session')

// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content, Accept,Content-Type');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//     next();
// })


app.use(session({
    secret: "azert",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.set('view engine', 'ejs');
app.use('/assets', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    let title = "Acceuil . Biblio-christ";
    let nav = "acceuil";
    res.locals = {title, nav}
    res.render('index')
})

app.use('/books', bookRouter)

app.use('/admin', adminRouter)

app.listen(port, ()=>{
    console.log('listen to port '+ port);
})