const express = require('express');

const router = express.Router();

const mainController = require('./controllers/mainController');
const authController = require('./controllers/authController');
const friendsController = require('./controllers/friendsController');


const authentification = require('./middleware/authentificationMw');
const friendList = require('./middleware/friendListMw');


router.get('/', mainController.homePage);

router.post("/registration", mainController.registration)

router.post('/login', authentification.isRegister, friendList.showFriendsList, mainController.displayFeed)

router.use(authentification.isLoggedIn)

router.get('/feed', friendList.showFriendsList, mainController.displayFeed)

router.get('/search/results', mainController.searchResults)

router.post('/addFriend', friendsController.addFriend)


router.use(mainController.errorPage);

module.exports = router;