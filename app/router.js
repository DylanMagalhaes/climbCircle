const express = require('express');

const router = express.Router();

const mainController = require('./controllers/mainController');
const authController = require('./controllers/authController');
const authentification = require('./middleware/authentificationMw');


router.get('/', mainController.homePage);

router.post('/login', authentification.isRegister, mainController.displayFeed)


router.post("/registration", mainController.friendsList, mainController.registration)

router.use(mainController.errorPage);

module.exports = router;