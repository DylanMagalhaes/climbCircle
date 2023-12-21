const express = require('express');

const router = express.Router();

const mainController = require('./controllers/mainController')

router.get('/', mainController.homePage);

router.post("/registration", mainController.registration)

//* un controller spécifique pour la page error que je mets dans le main controller (controller globale)
router.use(mainController.errorPage);

module.exports = router;