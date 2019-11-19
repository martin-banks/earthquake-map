const fs = require('fs')
const path = require('path')

function sanitize (err, response) {
  if (err) return console.error('oh no!!', err)
  const fullData = JSON.parse(response)
    .reduce((output, d, i) => {
      const update = output
      const cleaned = {}

      Object.keys(d)
        .filter(k => d[k])
        .filter(k => k !== 'categories')
        .filter(k => k !== 'x')
        .forEach(k => {
          cleaned[k] = d[k]
        })

      cleaned.price = cleaned.price.replace('$ ', '$')
      cleaned.value = cleaned.value.replace('$ ', '$')
      cleaned.caption = cleaned.caption.replace(/\*+ /gi, '***')

      if (cleaned.stand) {
        cleaned.stand = cleaned.stand.replace(/stand /gi, '')
      } else {
        console.log(i, d)
      }

      update.push(cleaned)
      return update
    }, [])

  const shortData = fullData.filter(item => item['Top picks'])

  fs.writeFile(
    path.join(__dirname, 'cleaned_toppick.json'),
    JSON.stringify(shortData, 'utf-8', 2),
    console.log)

  fs.writeFile(
    path.join(__dirname, 'cleaned.json'),
    JSON.stringify(fullData, 'utf-8', 2),
    console.log)
}

fs.readFile(
  path.join(__dirname, '../src/content/projects/0824-adv-showbags-parts-raw.json'), sanitize
)
