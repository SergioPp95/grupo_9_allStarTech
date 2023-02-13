const express = require("express");
const path = require("path");
const methodOverride = require('method-override')
const session = require("express-session")
const cookieParser = require("cookie-parser")

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
  secret: "Mensaje ultrasecreto",
  resave: false,
  saveUninitialized: false
}))
app.use(cookieParser())

app.set('view engine', 'ejs')

app.set('views', 'src/views')

const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');
const productRoute = require('./routes/product');
const usersApiRoute = require('./routes/api/usersApi');
const productsApiRoute = require('./routes/api/productsApi');

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/user', usersRoute);
app.use('/api/users', usersApiRoute);
app.use('/api/products', productsApiRoute);

// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { user: req.cookies.userLogged });
});

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Servidor inicializado en http://localhost:${port}`));