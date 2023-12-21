const dataMapper = require('../dataMapper');


const mainController = {
  homePage: (req, res) => {
    console.log(req.session);
    res.render('home.ejs');
  },

  errorPage: (req, res) => {
    res.status(404).render('404.ejs');
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
        res.redirect(`/`);
        console.log(rowCount)
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  },

};

module.exports = mainController;
