const fs = require('fs')
const path = require('path')
const Queue = require('bull')

const { name, options } = require('../utils/queue/queueConfig')
const queue = new Queue(name, options)

const basename = path.basename(module.filename)

fs
  .readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    const job = require(path.join(__dirname, file))
    const jobName = file.slice(0, -3)
    queue.process(jobName, job)
  })

module.exports = queue
