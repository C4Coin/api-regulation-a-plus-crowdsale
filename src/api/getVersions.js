const getPing = (req, res) => {
  res.json([
    {
      version: 1,
      path: '/api/v1'
    }
  ])
}

module.exports = getPing
