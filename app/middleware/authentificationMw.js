const dataMapper = require("../dataMapper");

const authenticationMw = {
  async isRegister(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    req.session.username = username;
    req.session.password = password;

    try {
      const user = await dataMapper.getUserByUserName(req.session.username);

      // Ajout d'une vérification pour s'assurer que l'utilisateur existe
      if (!user) {
        res.status(401).send("utilisateur introuvable");
        return;
      }

      if (req.session.username === user.username && req.session.password === user.password) {
        console.log("______ Connexion réussie _________", user);
        req.session.userId = user.id; // Assurez-vous que c'est 'id' et non 'Id'
        next();
      } else {
        res.status(401).send("Accès refusé");
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Le nom d'utilisateur ou le mot de passe saisis est incorrect");
    }
  },

  isLoggedIn(req, res, next) {
    if (req.session.userId) {
      next();
    } else {
      res.status(401).send("Non autorisé");
    }
  }

};

module.exports = authenticationMw;
