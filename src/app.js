const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

//Carregando rotas
const indexRoute = require('./routes/index');
const productRoute = require('./routes/product');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;


