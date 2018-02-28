const fs = require('fs')
const yaml = require('js-yaml')

const loadYAML = name =>
  yaml.safeLoad(fs.readFileSync(`seed-data/${name}.yml`, 'utf8'))

module.exports = loadYAML
