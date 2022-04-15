const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const router = express.Router();

//Conexão com o banco de dados (MongoDB)
mongoose.connect(process.env.DB_CONNECTION.toString());

//Carregando models
const Manga = require('./models/manga');
const User = require('./models/user');

//Carregando rotas
const indexRoute = require('./routes/indexRouter');
const mangaRoute = require('./routes/mangaRouter');
const userRoute = require('./routes/userRouter');

app.use(bodyParser.json({
  limit: '10mb'
}));
app.use(bodyParser.urlencoded({ 
  extended: false
}));

// Habilita o CROS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


// Rotas
app.use('/', indexRoute);
app.use('/mangas', mangaRoute);
app.use('/users', userRoute);

module.exports = app;


