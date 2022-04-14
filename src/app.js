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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/mangas', mangaRoute);
app.use('/users', userRoute);

module.exports = app;


