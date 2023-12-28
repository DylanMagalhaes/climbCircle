const dataMapper = require('../dataMapper');
const { trace } = require('../router');


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
      const { username } = req.body
      const { email } = req.body
      const { password } = req.body

      const rowCount = await dataMapper.registrationNewUser(username, email, password)
      if (rowCount !== 1) {
        res.status(500).send('Aucun enregistrement créé');
      } else {
        res.redirect(`/`);
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

  async searchResults(req, res) {
    try {
      const { searchClimber } = req.query;
      let climbers = await dataMapper.searchClimber(searchClimber);

      for (const climber of climbers) {
        climber.isFriend = await dataMapper.isFriend(req.session.username, climber.username);
      }

      res.render('searchResults.ejs', {
        climbers,
        pageTitle: 'searchResults'
      });

    } catch (error) {
      console.log(error);
      res.status(500).send("Erreur lors de la recherche des grimpeurs");
    }
  }

};

module.exports = mainController;
