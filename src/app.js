const express = require("express");
const path = require("path");
const methodOverride = require('method-override')
const app = express();



app.use(express.static(path.join(__dirname , "../public" )));

app.use(methodOverride('_method'))

app.set('view engine','ejs')

app.set('views', 'src/views')

const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');
const productRoute = require('./routes/product');

app.use('/',indexRoute);
app.use('/products',productRoute);
app.use('/user',usersRoute);

app.listen(8000, () => console.log("Servidor inicializado en el puerto 8.000"));