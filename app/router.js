const express = require('express');

const router = express.Router();

const mainController = require('./controllers/mainController');
const authController = require('./controllers/authController');
const friendsController = require('./controllers/friendsController');
const postsController = require('./controllers/postsController')


const authentification = require('./middleware/authentificationMw');
const friendList = require('./middleware/friendListMw');
const showPosts = require('./middleware/showPostsMw')

const multer = require('multer');

const upload = multer({ dest: 'uploads/' });


router.get('/', mainController.homePage);

router.post("/registration", mainController.registration)

router.post('/login', authentification.isRegister, friendList.showFriendsList, showPosts.showPost, mainController.displayFeed)

router.use(authentification.isLoggedIn)

router.get('/feed', friendList.showFriendsList, showPosts.showPost, mainController.displayFeed)

router.get('/search/results', mainController.searchResults)

router.post('/addFriend', friendsController.addFriend)

router.post('/addPost', upload.single('image_url'), postsController.addPost);


router.use(mainController.errorPage);

module.exports = router;