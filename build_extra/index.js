const mkdirp = require('mkdirp')
const path = require('path')
const colors = require('colors')

const createBuildXML = require('./createBuildXML')
const createEmbedCode = require('./embedcode')
const projectName = require('../src/content/project.json').name
const distOutput = require('../build_extra/distOutput')()

const paths = {
  UAT: require('../src/content/config/uat.json').path,
  UAT_LOCAL: require('../src/content/config/uat_local.json').path,
  PROD: require('../src/content/config/prod.json').path,
}

const env = process.env.NODE_ENV
console.log(env)
const cwd = process.cwd()
const projectPath = cwd.toLowerCase().split('t3interactives/')[1]
const location = `${paths[env]}/${projectPath || projectName}`
console.log(JSON.stringify(location, 'utf-8', 2))

function mkdirpSync ({ dir }) {
  return new Promise((resolve, reject) => {
    mkdirp(dir, err => {
      if (err) reject(err)
      resolve(`${dir} created`)
    })
  })
}

async function start () {
  try {
    await mkdirpSync({
      dir: path.join(cwd, `dist/${distOutput}`)
    })
    if (env === 'PROD') {
      await createBuildXML({
        env,
        project: projectName,
        location: location.toLowerCase().split('t3interactives/')[1] || projectName,
      })
    }
    await createEmbedCode({
      env,
      project: projectName,
      location: `${location}/dist/${env}/static`,
    })
    console.log(` Build complete at: ${new Date()} ${colors.bgBlack('\ue0b0').white}`.bgWhite.black, '\n')
  } catch (err) {
    console.log('\nERROR in start(): ', err, '\n')
  }
}

start()
