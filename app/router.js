const express = require('express');

const router = express.Router();

const mainController = require('./controllers/mainController');
const authController = require('./controllers/authController');
const authentification = require('./middleware/authentificationMw');
const friendList = require('./middleware/friendListMw');


router.get('/', mainController.homePage);

router.post('/login', authentification.isRegister, friendList.showFriendsList, mainController.displayFeed)

router.get('/search/results', mainController.searchResults)

router.post("/registration", mainController.registration)

router.use(mainController.errorPage);

module.exports = router;