
module.exports = function () {
  const project = require('../src/content/project.json').name
  const env = process.env.NODE_ENV
  const options = {
    UAT: `${env}_${project}`,
    UAT_LOCAL: `${env}_${project}`,
    PROD: `${env}`,
  }
  return options[env]
}
