const dataMapper = require('../dataMapper')

const friendsController = {
  friendsList: async () => {
    try {
      const friends = await dataMapper.getAllFriends(req.session.userName)

    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
}

module.exports = friendsController