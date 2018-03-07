const Queue = require('bull')

const { queueName, options } = require('./queueConfig')

const queue = new Queue(queueName, options)

module.exports = task => queue.process(task)
