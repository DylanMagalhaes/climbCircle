const dataMapper = require("../dataMapper");

const authentication = {
  async isRegister(req, res, next) {
    const userName = req.body.userName;
    const password = req.body.password
    req.session.userName = userName
    req.session.password = password

    try {
      console.log("Username:", userName, "Password:", password);
      const user = await dataMapper.getUserByUserName(req.session.userName);
      console.log("User from DB:", user);

      if (req.session.userName === user.username && req.session.password === user.password) {
        console.log("______ Connexion réussie _________", user);
        res.send("c'est gooooooood")
      } else {
        res.status(401).send("Accès non autorisé");
      }

    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },
};

module.exports = authentication;
