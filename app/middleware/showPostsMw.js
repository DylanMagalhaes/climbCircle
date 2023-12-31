const dataMapper = require('../dataMapper')

const showPostsMw = {
  showPost: async (req, res, next) => {
    try {
      const posts = await dataMapper.getAllposts()
      req.posts = posts
      next()

    } catch (error) {
      console.log(error.message);
      res.status(500).send("error MW show post");
    }
  }
}

module.exports = showPostsMw