const fs = require('fs')
const path = require('path')

const dataPath = '../src/content/projects/2019/NED-0154-election-sa-policy-picker-quiz'

async function start () {
  console.log('\n----------\nStarting\n----------\n')
  try {
    const data = await fs.readFileSync(
      path.join(__dirname, `${dataPath}/parts-all.json`),
      err => { if (err) throw err }
    )
    console.log('Data read')
    const dataJson = JSON.parse(data)
    const cleanedData = dataJson.map(d => {
      return Object.keys(d).reduce((output, key) => {
        const update = output
        // test for party keys
        // const party = /alp|lib|gre|con|ca/.test(key)
        const party = key === 'alp'
          || key === 'lib'
          || key === 'gre'
          || key === 'con'
          || key === 'ca'
        if (party) {
          // if a party key is found we need to change the value to a number
          if (d[key].toLowerCase() === 'yes') {
            update[key] = 1
          } else if (d[key].toLowerCase() === 'no') {
            update[key] = -1
          } else {
            update[key] = 0
          }
        } else {
          // not a party, return the original value
          update[key] = d[key]
        }

        return update
      }, {})
    })
    console.log(
      'Data cleanedData:\n----------\n',
      cleanedData,
      '\n-----------\n\n'
    )
    await fs.writeFileSync(
      path.join(__dirname, `${dataPath}/parts-all-cleaned.json`),
      JSON.stringify(cleanedData, 'utf8', 2),
      err => { if (err) throw err }
    )

    console.log('Cleaned data written')
    console.log('\n----------\nEOL\n----------\n')

  } catch (err) {
    throw err
  }

}

start ()
