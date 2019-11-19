const fs = require('fs')
const path = require('path')

const location = path.join(__dirname, '../src/content/projects/0907-sa-politicians-own')
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
  'assets',
]
const contentShortKeys = {
  'Income, employment': 'income',
  'Shares, investments': 'shares',
  'Trusts': 'trusts',
  'Interests in land': 'land',
  'Directorships': 'directorships',
  'Political, Trade, Professional Associations and donations': 'dontations',
  'Gifts, travel, hospitality': 'gifts',
}
const strip = [
  'undefined',
  // 'x',
]

function houses (item) {
  // * State/HA (house of assembly) is SA lower house
  // * State LC (legislative council is SA upper house)
  // * Federal HR (house of representatives) is lower house
  // * Senate (S) is Fed upper house
  if (item.house === 'HA') item.chamber = 'lower'
  if (item.house === 'LC') item.chamber = 'upper'
  if (item.house === 'HR') item.chamber = 'lower'
  if (item.house === 'S') item.chamber = 'upper'
  if (!item.house) {
    console.log('no house information', item)
  }
  return item
}
const partyGroups = {
  main: ['LIB', 'ALP'],
  others: ['GSA', 'IND', 'CA', 'SAB', 'ACP'],
}

function counter (item) {
  const total = popupBody.reduce((output, key) => {
    let update = output
    const itemToUse = item
    if (!itemToUse[key]) itemToUse[key] = ''
    const count = itemToUse[key]
      .split(',')
      .map(x => x.trim())
      .map(x => x.toLowerCase())
      .filter(a => a.length)
      .filter(a => a !== 'n/a')
      .filter(a => a !== 'na')
      .length
    update += count
    return update
  }, 0)

  // console.log({ total })
  item.assets = total
  return item
}

function cleaner (item) {
  const output = {}
  const update = item
  update.image.length < 1 && (update.image = 'profile')
  Object.keys(update)
    .filter(k => strip.indexOf(k) === -1)
    .filter(k => item[k])
    .filter(k => item[k].length)
    .filter(k => item[k].toLowerCase() !== 'n/a')
    .filter(k => item[k].toLowerCase() !== 'na')
    .forEach(k => {
      // const shortKey = contentShortKeys[k]
      // if (shortKey) {
      //   output[shortKey] = item[k].trim()
      // } else {
      //   output[k] = item[k].trim()
      // }
      output[k] = item[k].trim()
      output.year = item.year
      output.assets = item.assets
      output.partySort = partyGroups.main.indexOf(item.party) !== -1
        ? item.party
        : 'other'
      output.name = item.name
        .replace(/Mrs |Mr |Ms |Hon | the | MP| OAM| CSC|Dr /g, ' ')
        .replace(/\s+/gi, ' ')
        .trim()
    })
  return output
}

fs.readFile(path.join(location, 'parts.json'), (err, res) => {
  if (err) return console.log(err)
  const data = JSON.parse(res)
  const update = data
    .filter(p => p.name.length)
    .map(houses)
    .map(counter)
    .map(cleaner)
  const contentToWrite = JSON.stringify(update, 'utf-8', 2)
  fs.writeFile(path.join(location, 'parts_cleaned.json'), contentToWrite, err => {
    console.log(err || 'success')
  })
})
