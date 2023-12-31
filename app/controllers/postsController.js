const dataMapper = require('../dataMapper')

const postsController = {
  addPost: async (req, res) => {
    const content = req.body.content
    const image = req.file ? req.file.path : null
    const userId = req.session.userId


    try {
      await dataMapper.addPost(userId, content, image)
      res.redirect('/feed')

    } catch (error) {
      res.status(500).send("Erreur de la publication");
      console.log(error)
    }

  },

}

module.exports = postsController