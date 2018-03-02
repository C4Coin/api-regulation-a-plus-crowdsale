const postLogin = (req, res) => {
  // pull the user credentials from the req
  // look up the user
  // check the credentials match
  // do some session management (use Passport for this)
  // then return

  res.json({
    token: 'some-awesome-jwt'
  })
}

module.exports = postLogin
