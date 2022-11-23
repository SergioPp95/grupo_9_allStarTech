const express = require("express");
const path = require("path");
const methodOverride = require('method-override')
const session = require("express-session")
const cookieParser = require("cookie-parser")

const app = express();



app.use(express.static(path.join(__dirname , "../public" )));

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session( {
   secret: "Mensaje ultrasecreto",
   resave: false,
   saveUninitialized: false
} ))
app.use(cookieParser())

app.set('view engine','ejs')

app.set('views', 'src/views')

const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');
const productRoute = require('./routes/product');

app.use('/',indexRoute);
app.use('/products',productRoute);
app.use('/user',usersRoute);

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Servidor inicializado en http://localhost:${port}`));