const express = require('express');
const app = express();
const session = require('express-session');
require('dotenv').config();

const router = require('./app/router.js');

app.set('views', './app/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/uploads', express.static('uploads'));


app.use(
  session({
    secret: 'keyboard cat', //! A METTRE dans le fichier .env !!!!!!!!!!!!
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(` ----> http://localhost:${process.env.PORT}`);
});
