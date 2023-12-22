const dataMapper = require('../dataMapper');


const mainController = {
  homePage: (req, res) => {
    console.log(req.session);
    res.render('home.ejs', {
      pageTitle: "home"
    });
  },

  errorPage: (req, res) => {
    res.status(404).render('404.ejs', {
      pageTitle: "404"
    });
  },

  registration: async (req, res) => {

    try {
      const { userName } = req.body
      const { email } = req.body
      const { password } = req.body

      const rowCount = await dataMapper.registrationNewUser(userName, email, password)
      if (rowCount !== 1) {
        res.status(500).send('Aucun enregistrement créé');
      } else {
        res.redirect(`/authentification`);
        console.log(rowCount)
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  },

  async displayFeed(req, res) {
    try {
      const userId = req.session.userId;
      const friends = await dataMapper.getAllFriendsOfClimber(userId);
      res.render('feed.ejs', {
        user: req.session.username,
        pageTitle: "feed",
        friends
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur lors de la récupération des amis");
    }
  },

  friendsList: async (req, res, next) => {
    try {
      const friends = await dataMapper.getAllFriendsOfClimber(req.session.userId)
      req.friends = friends
      console.log("req.username = " + req.session.userName);
      console.log("friends = " + friends);
      next()

    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
      console.log(req.session.userName);
    }
  }

};

module.exports = mainController;
