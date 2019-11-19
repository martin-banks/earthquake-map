const fs = require('fs')
const path = require('path')

const location = '../src/content/projects/2019/sa-election-policy-dashboard'
const data = require(path.join(__dirname, `${location}/parts.json`))
console.log({ data })

const blacklist = [
  'undefined',
]

const cleaned = data
  .reduce((output, d) => {
    const update = output
    const item = Object.keys(d)
      .filter(k => d[k].length)
      .filter(k => blacklist.indexOf(k) === -1)
      // Only process for keys that are NOT 'related'
      .filter(k => !k.includes('related'))
      .reduce((out, k) => {
        const update = out
        update[k] = d[k]
          .replace(/\n/gi, '')
          .replace(/\s+\?/gi, '\?')
          // .replace(/\’/gi, '\'')
          .trim()
        return update
      }, {})

    // Format related links
    Object.keys(d)
      .filter(k => blacklist.indexOf(k) === -1)
      .filter(k => k.includes('related'))
      .filter(k => d[k].length)
      .forEach(k => {
        if (!item.related) item.related = []
        const link = d[k]
          .split(',')
          .map(r => r.trim())
        item.related.push({
          title: link[0],
          id: link[1],
        })
      })

    update.push(item)
    return update

  }, [])
  .filter(d => Object.keys(d).length)

fs.writeFile(
  path.join(__dirname, `${location}/parts-cleaned.json`),
  JSON.stringify(cleaned, 'utf-8', 2),
  err => console.log(err || 'Cleaned file written')
)
