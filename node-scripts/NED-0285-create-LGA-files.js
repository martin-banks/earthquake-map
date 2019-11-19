const c2j = require('csvtojson')
const path = require('path')
const fs = require('fs')

const projectLocation = '../src/content/projects/2019/NED-0285-nsw-suburb-crime-stats-phase1'
const lgaDataCsv = path.join(__dirname, `${projectLocation}/data_raw/LGA_trends.csv`)
const nswDataCsv = path.join(__dirname, `${projectLocation}/data_raw/NSW_trends.csv`)


async function readJsonFromCsv (file) {
  // Returns JSON format data converted from CSV file
  return new Promise(async (res, rej) => {
    const dataStore = await c2j().fromFile(file)
    const cleanData = dataStore.map(d => {
      return Object.keys(d)
        .reduce((output, key) => {
          const update = output
          const cleanValue = d[key].replace(/\,/gi, '')
          const num = parseFloat(cleanValue, 10)
          if (num || num === 0) {
            update[key] = num
          } else {
            update[key] = d[key]
          }
          return update
        }, {})
    })
    res(cleanData)
  })
}


async function init () {
  // Record timestamp when starting the app
  // Used to measure the time taken to complete
  const startTime = new Date().getTime()
  console.log('\nStarting...\n\n')

  try {
    const lgaData = await readJsonFromCsv(lgaDataCsv)
    const nswData = await readJsonFromCsv(nswDataCsv)
    // Create an array of unique LGA names
    const lgaList = [... new Set([...lgaData.map(d => d.lga)])]
    // Creata an array of unique crimes names/types
    const crimeList = [... new Set(lgaData.map(d => d.offence))]


    // ! Write list of crimes to file
    await fs.writeFileSync(
      path.join(__dirname, `${projectLocation}/crimeList.json`),
      JSON.stringify(crimeList, 'utf8', 2),
      err => { if (err) throw err }
    )
    console.log('\n---------\nList of all crimes written\n---------\n')

    // ! Write list of LGA names to file
    const lgaListJs = `export default ${JSON.stringify(lgaList, 'utf8', 2)}`
    await fs.writeFileSync(
      path.join(__dirname, `${projectLocation}/lgaList.js`),
      lgaListJs,
      err => { if (err) throw err }
    )
    console.log('\n---------\nLGA names list written\n---------\n')

    // ! Write NSW trends data to single json file (reference)
    await fs.writeFileSync(
      path.join(__dirname, `${projectLocation}/data_json/nsw_trends.json`),
      JSON.stringify(nswData, 'utf8', 2),
      err => console.log(err)
    )
    console.log('written JSON files for: nsw_trends.json')

    // ! Generate individual objects for each LGA
    // Loop over the list of LGAs, use this as a key to filter the full data set
    // Filter the data for each crime in each LGA to remove the LGA name; reduces repetition
    for (lga of lgaList) {
      // Create a standardised file name; lowercase, no spaces
      console.log({ lga })
      const filename = lga.toLowerCase().replace(/\s+|-/gi, '_')
      const lgaDataJson = lgaData
        .filter(d => d.lga === lga) // filter for data that matches LGA name
        .reduce((output, crime) => {
          const update = output
          const newEntry = {}
          Object.keys(crime)
            .filter(k => k !== 'lga') // Filter out LGA reference from crime stats
            .forEach(k => newEntry[k] = crime[k]) // store in temp object
          update.push(newEntry) // add to update to return
          return update
        }, [])


      // ! Write all LGA data to single json file (reference)
      await fs.writeFileSync(
        path.join(__dirname, `${projectLocation}/data_json/${filename}.json`),
        JSON.stringify(lgaDataJson, 'utf8', 2),
        err => console.log(err)
      )
      console.log('written JSON files for:', filename)

      // ! Write to js file as variable
      // Content should be written as a JavaScript object
      // The variable name is consists of the project index and LGA name
      // These files will be loaded to the head of the DOM when match is found after search
      const lgaDataJs = `var NED_0285_lgadata_${filename} = ${JSON.stringify(lgaDataJson, 'utf8', 2)}`
      await fs.writeFileSync(
        path.join(__dirname, `${projectLocation}/data_js/${filename}.js`),
        lgaDataJs,
        err => console.log(err)
      )
      console.log('written JS files for:', filename)
    } // ? end for of loop

    // Create a new time stamp, measure the difference for time taken
    const endTime = new Date().getTime()
    console.log('\n\n-------\nAll files written\n--------\n')
    console.log('Process took:', `${endTime - startTime}ms\n\n`)

  } catch (err) {
    throw err
  }
}

init()
