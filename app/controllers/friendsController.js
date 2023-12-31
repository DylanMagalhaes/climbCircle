const dataMapper = require('../dataMapper')

const friendsController = {
  addFriend: async (req, res) => {
    try {
      const username = req.session.username;
      const friendToAdd = req.body.friendUsername;

      await dataMapper.addFriend(username, friendToAdd);
      res.redirect('/feed');

    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }

}

module.exports = friendsController

