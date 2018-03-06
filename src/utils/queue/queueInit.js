const Queue = require('bull')
const hello = require('../../tasks/hello')

const queue = new Queue('my queue', 'redis://127.0.0.1:6379')

queue.process(hello)

module.exports = queue
