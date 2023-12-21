const authController = {
  postLogin(req, res) {
    //* je recupere les données saisies par le client coté navigateur (le formulaire de  connexion)
    const userName = req.body.userName;
    const password = req.body.password
    //* Pour accéder à "mon casier de piscine" cad les données uniques que je veux garder coté navigateur : request.session
    //* Pour ajouter une propriété "login" à l'objet "session" qui aura pour valeur "request.body.login"
    req.session.login = {
      userName: userName,
      password: password
    };

    res.redirect('/');
  },
};

module.exports = authController;
