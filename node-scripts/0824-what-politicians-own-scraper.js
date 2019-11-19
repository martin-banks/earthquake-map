const fs = require('fs')
const path = require('path')

const location = '../src/content/projects/0907-sa-politicians-own'
const file = path.join(__dirname, `${location}/parts.json`)

const dataKeys = {
  // 'image',
  // 'name',
  // 'party',
  // 'district',
  // 'type',
  income: 'Income',
  investments: 'Investments',
  trusts: 'Trusts',
  land: 'Interests in land',
  directorships: 'Directorships',
  associations: 'Political and Trade and Professional Associations',
}
const parties = data => [...new Set(data.map(d => d.party))]

function getMostPerPerson ({ data, key }) {
  let count = null
  let person = null
  data.forEach(d => {
    const total = d[key]
      .split(', ')
      .length
    if (!count || total > count) {
      count = total
      person = d
    }
  })
  return { count, person }
}

function assetTotal ({ key, data }) {
  const mostPerPerson = getMostPerPerson({ data, key })
  const total = data
    .filter(d => d[key])
    .map(d => d[key].split(','))
    .reduce((output, item) => {
      const update = output
      update.push(...item)
      return update
    }, [])
    .filter(d => d.toLowerCase() !== 'n/a' || d.toLowerCase() !== 'na')
    .length

  return { total, mostPerPerson, key }
}

function peopleTotal ({ type, value, data }) {
  const dataset = data
    .filter(d => d[type.toLowerCase()].toLowerCase() === value.toLowerCase())
  const total = {
    people: dataset.length,
  }
  // const mostByPerson = getMostPerPerson({ data: dataset, key: dataKeys. })
  const mostByAssets = Object.keys(dataKeys)
    .map(k => assetTotal({ key: dataKeys[k], data: dataset }))

  return { total, mostByAssets }
}

function partyTotal ({ data }) {
  return data
    .reduce((output, item) => {
      const update = output
      if (!update[item.party]) {
        update[item.party] = { members: 0 }
        Object.keys(dataKeys).forEach(k => update[item.party][k] = {
          total: 0,
          mostPerPerson: getMostPerPerson({ data: data.filter(d => d.party === item.party), key: dataKeys[k] })
        })
      }
      update[item.party].members++
      Object.keys(dataKeys).forEach(k => {
        update[item.party][k].total += item[dataKeys[k]]
          .split(', ')
          .filter(x => x.length)
          .filter(x => x.toLowerCase() !== 'n/a')
          .length
      })
      return update
    }, {})

}

fs.readFile(file, (err, buffer) => {
  if (err) return console.error(err)
  const data = JSON.parse(buffer)
  const totals = {
    state: peopleTotal({ type: 'type', value: 'state', data }),
    federal: peopleTotal({ type: 'type', value: 'federal', data }),
    parties: partyTotal({ data }),
    income: assetTotal({ key: dataKeys.income, data }),
    associations: assetTotal({ key: dataKeys.associations, data }),
    directorships: assetTotal({ key: dataKeys.directorships, data }),
    trusts: assetTotal({ key: dataKeys.trusts, data }),
    investments: assetTotal({ key: dataKeys.investments, data }),
    land: assetTotal({ key: dataKeys.land, data }),
  }
  console.log(JSON.stringify(totals, 'utf-8', 2))
  // console.log(totals)
  Object.keys(totals).forEach(k => {
    fs.writeFile(
      path.join(__dirname, `/scrapedData_${k}.json`),
      JSON.stringify(totals[k], 'utf-8', 2),
      err => (console.log(err || k, 'written to file'))
    )
  })
})

