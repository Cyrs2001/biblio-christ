let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let app = express();
require('./config/db.config');
let bookRouter = require('./routes/book.routes')
let adminRouter = require('./routes/admin.routes')

let port = process.env.PORT || 8000;


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
let acceuilRoute = (req, res) => {
    let title = "Acceuil . Biblio-christ";
    let nav = "acceuil";
    res.locals = { title, nav }
    res.render('index')
}
app.get('/', acceuilRoute)

app.use('/books', bookRouter)

app.use('/admin', adminRouter)
app.use('*', (req, res) => {
let title = "Error 404 . Bilio-christ"
    res.locals = { title }
    res.render('404');

})

app.listen(port, () => {
    console.log('listen to port ' + port);
})