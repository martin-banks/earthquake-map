const colors = require('colors')
const fs = require('fs')
const path = require('path')
const distOutput = require('../build_extra/distOutput')()

function writeSync (location, content) {
  return new Promise ((res, rej) => {
    fs.writeFile(location, content, err => {
      if (err) {
        rej(err)
        return
      }
      res(`file written to: ${location}`)
    })
  })
}

function writeEmbed ({ env, project, location }) {
  console.log({ location })
  /* eslint-disable */
  const template = [
    `<div>`,
      `<link rel="stylesheet" href="${location}/css/app.css" />`,
      `<div id="app_${project}"></div>`,
      `<script type="text/javascript" src="${location}/js/manifest.js"></script>`,
      `<script type="text/javascript" src="${location}/js/vendor.js"></script>`,
      `<script type="text/javascript" src="${location}/js/app.js"></script>`,
    `</div>`,
  ].join('')
  /* eslint-enable */

  // ! Potential issues with including script/styles inline
  // ! Alt embed code: adds app script and styles to the head
  /* eslint-disable */
  const newTemplate = [
    `<div>`,
      `<div id="app_${project}"></div>`,
      `<script>`,
        `!function(d){`,
          `var head=d.getElementsByTagName("head")[0];`,

          `var appStyles=d.createElement("link");`,
          `appStyles.type="text/css";`,
          `appStyles.rel="stylesheet";`,
          `appStyles.href="${location}/css/app.css";`,
          `head.appendChild(appStyles);`,

          `var appManifest=d.createElement("script");`,
          `appManifest.type="text/javascript";`,
          `appManifest.src="${location}/js/manifest.js";`,
          `head.appendChild(appManifest);`,

          `var appVendor=d.createElement("script");`,
          `appVendor.type="text/javascript";`,
          `appVendor.src="${location}/js/vendor.js";`,
          `head.appendChild(appVendor);`,

          `var appScript=d.createElement("script");`,
          `appScript.type="text/javascript";`,
          `appScript.src="${location}/js/app.js";`,
          `head.appendChild(appScript);`,
        `}(document);`,
      `</script>`,
    `</div>`,
  ].join('')
  /* eslint-enable */

  return new Promise(async (resolve, reject) => {
    const fileLocation = `${path.join(process.cwd(), `dist/${distOutput}`)}/embed.html`
    const fileNewLocation = `${path.join(process.cwd(), `dist/${distOutput}`)}/script_only_embed.html`
    console.log({ template, newTemplate })

    try {
      await writeSync(fileLocation, template)
      await writeSync(fileNewLocation, newTemplate)
      console.log('\n', ` Embed codes generated successfully ${colors.bgBlack('\ue0b0').white}`.bgWhite.black, '\n')
      resolve('All embed codes written')
    } catch (err) {
      console.log('\n', ` ERROR writing embed codes ${colors.bgBlack('\ue0b0').red}`.bgRed.white, '\n')
      reject(err)
    }
  })
}

module.exports = writeEmbed
