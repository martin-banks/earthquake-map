const fs = require('fs')
const path = require('path')
const json2csv = require('json2csv').parse
// * https://www.npmjs.com/package/json2csv

const popupBody = [
  // 'image',
  // 'name',
  // 'party',
  // 'district',
  // 'type',
  'Income, employment',
  'Shares, investments',
  'Trusts',
  'Interests in land',
  'Directorships',
  'Political, Trade, Professional Associations and donations',
  'Gifts, travel, hospitality',
]

const jsonFile = require(`../src/content/projects/0907-sa-politicians-own/parts.json`)
  .filter(item => item.name.length)
  .map(item => {
    const update = item
    popupBody.forEach(k => {
      update[k] = update[k].replace(/\,/gi, ' || ')
    })
    return update
  })

try {
  const csv = json2csv(jsonFile)
  const output = path.join(__dirname, '../src/content/projects/0907-sa-politicians-own/parts.csv')
  fs.writeFile(output, csv, err => {
    console.log(err || 'sucess')
  })
  console.log(csv)
} catch (err){
  console.error(err)
}
