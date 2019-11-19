const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

function imageOptim (dir) {
  return new Promise((resolve, reject) => {
    const imageOptim = spawn(`imageoptim`, [`${dir}/*.jpg`])
    imageOptim.stdout.on('data', data => {
      console.log('imageoptim stdout', dir, data.toString())
    })
    imageOptim.stderr.on('data', data => {
      reject(data)
      console.log('imageoptim stderr', dir, data.toString())
    })
    imageOptim.on('exit', data => {
      console.log('imageoptim exiting', dir, data.toString())
    })
    imageOptim.on('close', data => {
      console.log('imageoptim closing', dir, data.toString())
      resolve(data)
    })
  })
}

exports.optimizeImages = async () => {
  return new Promise((resolve, reject) => {
    fs.readdir(path.join(__dirname, '../../src/content/images/processed'), async (err, res) => {
      console.log(err || res)
      const dirs = res
        .filter(d => d !== '.DS_Store')
        .filter(d => d !== 'js')

      for (dir in dirs) {
        try {
          console.log([
            '\n',
            '=====================================',
            `Starting imageOptim for: ${dirs[dir]}`,
            '=====================================',
            '\n',
          ].join('\n\t'))
          await imageOptim(`./src/content/images/processed/${dirs[dir]}`)
        } catch (err) {
          console.log(err)
          reject(err)
        }
      }
      resolve('All images optimized')
    })
  })
}

