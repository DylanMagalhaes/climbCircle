const dataMapper = require('../dataMapper')

const friendListMw = {
  showFriendsList: async (req, res, next) => {
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
}

module.exports = friendListMw