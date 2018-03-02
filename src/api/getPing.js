const getPing = (req, res) => {
  res.json({
    response: 'Okay',
    uptime: process.uptime()
  })
}

module.exports = getPing
