const express = require('express');
const app = express();
const session = require('express-session');
require('dotenv').config();

const router = require('./app/router.js');

app.set('views', './app/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

//* pour la mise en place de express session
//* ce middleware permettra d'accéder à request.session sur toutes les routes
app.use(
  session({
    secret: 'keyboard cat', //! A METTRE dans le fichier .env !!!!!!!!!!!!
    resave: true,
    saveUninitialized: true, //* il se crée automatiquement dés la 1ere request
    cookie: {
      maxAge: 1000 * 60 * 60, //* le token ne sera valable qu'un heure
    },
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(` ----> http://localhost:${process.env.PORT}`);
});
