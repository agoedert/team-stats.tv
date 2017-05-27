const Ajv = require('ajv')
const schema = require('./schema')
const read = require(__dirname + '/reader.js')
const parse = require(__dirname + '/parser.js')
const validator = require(__dirname + '/validator.js')
const defaults = require(__dirname + '/defaults.js')
const defaultsMerger = require(__dirname + '/defaults-merger.js')

const mergeDefaults = defaultsMerger(defaults)
const validate = validator(new Ajv(), schema)

module.exports = {

    fromFile: configFilePath =>
      read(configFilePath)
      .then(parse)
      .then(validate)
      .then(mergeDefaults)

}
