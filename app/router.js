const express = require('express');

const router = express.Router();

const mainController = require('./controllers/mainController');
const authController = require('./controllers/authController');
const authentification = require('./middleware/authentification');

router.get('/', mainController.homePage);

router.post('/login', authentification.isRegister)

router.post("/registration", mainController.registration)

router.use(mainController.errorPage);

module.exports = router;