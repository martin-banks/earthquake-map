/* eslint no-console: 0 */
const fs = require('fs')
const path = require('path')
const csvJson = require('csvtojson')
// ? https://www.npmjs.com/package/csvtojson


const projectLocation = '../../src/content/projects/2019/NED-0380-operation-wait-times'

function clean (profile) {
  const cleanProfile = {}
  cleanProfile.name = profile.name
  cleanProfile.about = {
    hospital: profile.about.hospital,
    lhn: profile.about.lhn,
    state: profile.about.state,
    peerGroup: profile.urgency[0] && profile.urgency[0]['Peer group'],
  }
  cleanProfile.name = profile.name
  cleanProfile.urgency = profile.urgency.reduce((output, item, i) => {
    const update = output
    const category = item['Urgency category']
      .split('.')[0]
      .toLowerCase()
      .trim().replace(/\W/gi, '_')
    if (!update[category]) update[category] = { fy: {}, q: {} }

    const urgencyKeys = [
      // 'Hospital',
      // 'State',
      // 'Local Hospital Network (LHN)',
      // 'Peer group',
      // 'Interval',
      // 'Time period',
      // 'Urgency category',
      'Number of surgeries',
      'Median waiting time (days)',
      'Peer group median (days)',
      'Percentage of surgeries within recommended time',
      'Peer group average',
    ]
      .forEach(key => {
        const interval = item['Interval'].toLowerCase()
        const timePeriod = item['Time period']
          .toLowerCase()
          .trim().replace(/\W/gi, '_')
        // if (interval === 'fy') {
        //   update[category][interval][key] = item[key]
        // } else {
          if (!update[category][interval][timePeriod]) {
            update[category][interval][timePeriod] = {}
          }
          update[category][interval][timePeriod][key] = item[key]
        // }
      })

    return update
  }, {})

  cleanProfile.specialities = profile.specialities.reduce((output, item, i) => {
    const update = output
    const speciality = item['Patient cohort']
      .split('.')[0]
      .toLowerCase()
      .trim().replace(/\W/gi, '_')
    if (!update[speciality]) update[speciality] = { fy: {}, q: {} }

    try {
      const specialityKeys = [
        // 'Hospital',
        // 'State',
        // 'Local Hospital Network (LHN)',
        // 'Peer group',
        // 'Interval',
        // 'Time period',
        // 'Patient cohort',
        'Number of surgeries',
        'Median waiting time (days)',
        'Peer group median (days)',
        'Percentage who waited more than 365 days for surgery',
        'Peer group average',
      ]
        .forEach(key => {
          const interval = item['Interval'].toLowerCase()
          const timePeriod = item['Time period']
            .toLowerCase()
            .trim().replace(/\W/gi, '_')
          // if (interval === 'fy') {
          //   update[speciality][interval][key] = item[key]
          // } else {
            if (!update[speciality][interval][timePeriod]) {
              update[speciality][interval][timePeriod] = {}
            }
            update[speciality][interval][timePeriod][key] = item[key]
          // }
        })
    } catch (err) {
      throw err
    }

    return update
  }, {})

  cleanProfile.procedures = profile.procedures.reduce((output, item, i) => {
    const update = output
    const procedure = item['Patient cohort']
      .split('.')[0]
      .toLowerCase()
      .trim().replace(/\W/gi, '_')
    if (!update[procedure]) update[procedure] = { fy: {}, q: {} }

    try {
      const procedureKeys = [
        // 'Hospital',
        // 'State',
        // 'Local Hospital Network (LHN)',
        // 'Peer group',
        // 'Interval',
        // 'Time period',
        // 'Patient cohort',
        'Number of surgeries',
        'Median waiting time (days)',
        'Peer group median (days)',
        'Percentage who waited more than 365 days for surgery',
        'Peer group average',
      ]
        .forEach(key => {
          const interval = item['Interval'].toLowerCase()
          const timePeriod = item['Time period']
            .toLowerCase()
            .trim().replace(/\W/gi, '_')
          // if (interval === 'fy') {
            // update[procedure][interval][key] = item[key]
          // } else {
            if (!update[procedure][interval][timePeriod]) {
              update[procedure][interval][timePeriod] = {}
            }
            update[procedure][interval][timePeriod][key] = item[key]
          // }
        })
    } catch (err) {
      throw err
    }

    return update
  }, {})
  // console.log({ cleanProfile })
  return cleanProfile
}

async function start () {
  const urgencyJson = await csvJson()
    .fromFile(path.join(__dirname, `${projectLocation}/urgency-category.csv`))
  const specialitiesJson = await csvJson()
    .fromFile(path.join(__dirname, `${projectLocation}/speciality.csv`))
  const proceduresJson = await csvJson()
    .fromFile(path.join(__dirname, `${projectLocation}/procedures.csv`))

  const fileName = x => `${x['Hospital']}______${x['Local Hospital Network (LHN)']}______${x['State']}`
    .trim()
    .replace(/\W/gi, '_')


  const hospitals = [... new Set([
    ... urgencyJson.map(p => fileName(p)),
    ... specialitiesJson.map(p => fileName(p)),
    ... proceduresJson.map(p => fileName(p)),
  ])]
  const hospitalsAboutObject = [... new Set([
    ... urgencyJson.map(p => {
      const data = {
        hospital: p['Hospital'].replace(/\�/gi, '\''),
        lhn: p['Local Hospital Network (LHN)'],
        state: p['State'],
      }
      return JSON.stringify(data)
    })
  ])
  ]
  console.log({ hospitalsAboutObject })
  const hospitalsAbout = hospitalsAboutObject.map(h => JSON.parse(h))
  // ... specialitiesJson.map(p => ({
  //   hospital: p['Hospital'],
  //   lhn: p['Local Hospital Network (LHN)'],
  //   state: p['State'],
  // })),
  // ... proceduresJson.map(p => ({
  //   hospital: p['Hospital'],
  //   lhn: p['Local Hospital Network (LHN)'],
  //   state: p['State'],
  // })),
  const peerGroups = [... new Set(urgencyJson.map(p => p['Peer group']))]
  const specialities = [... new Set(specialitiesJson.map(p => p['Patient cohort']))]
  const procedures = [... new Set(proceduresJson.map(p => p['Patient cohort']))]

  const procedureStats = procedures.reduce((output, procedure) => {
    const update = output
    const foundData = proceduresJson
      .filter(p => p['Patient cohort'] === procedure && p['Time period'].includes('2017'))
      .map(d => {
        const cleaned = [
          'Hospital',
          'State',
          'Local Hospital Network (LHN)',
          'Peer group',
          'Interval',
          'Time period',
          // 'Patient cohort',
          'Number of surgeries',
          'Median waiting time (days)',
          'Peer group median (days)',
          'Percentage who waited more than 365 days for surgery',
          'Peer group average',
        ]
          .reduce((cleanedOutput, key) => {
            const cleanedUpdate = cleanedOutput
            cleanedUpdate[key] = d[key]
            return cleanedUpdate
          }, {})

        return cleaned
      })
    // console.log(procedure, foundData.length)
    // if (!update[procedue]) update[procedue] = []
    update[procedure] = foundData
    return update
  }, {})

  // console.log(procedureStats)

  try {
    const hospitalProfiles = hospitals
      .map((h, i) => {
        // console.log(h, '\t-||-\t', h.split('______')[0])
        return {
          name: h.split('______'),
          about: hospitalsAbout[i],
          urgency: urgencyJson
            .filter(x => {
              return x['Hospital']
                .trim()
                .toLowerCase()
                .replace(/\W/gi, '_')
                .replace(/_/gi, ' ')
                .trim()
              === h.split('______')[0]
                .toLowerCase()
                .replace(/_/gi, ' ')
                .trim()
            }),
          specialities: specialitiesJson
            .filter(x => x['Hospital']
              .toLowerCase()
              .replace(/\W/gi, '_')
              .replace(/_/gi, ' ')
              .trim()
            === h.split('______')[0]
              .trim()
              .toLowerCase()
              .replace(/_/gi, ' ')
              .trim()
            ),
          procedures: proceduresJson
            .filter(x => x['Hospital']
              .toLowerCase()
              .replace(/\W/gi, '_')
              .replace(/_/gi, ' ')
              .trim()
            === h.split('______')[0]
              .toLowerCase()
              .replace(/_/gi, ' ')
              .trim()
            ),
        }
      })
      .map(clean)
    for (profile of hospitalProfiles) {
      try {
        // console.log('Writing profile for', profile.name)
        await fs.writeFileSync(
          path.join(__dirname, `${projectLocation}/hospitals/${profile.name.join('______').toLowerCase().trim().replace(/\W/gi, '_')}.js`),
          `var profile__${profile.name.join('______').toLowerCase().trim().replace(/\W/gi, '_')} = ${JSON.stringify(profile, 'utf8', 2)}`,
          err => console.log(err)
        )
        // console.log('Hospital profile written for\n', profile.name, '\n')
      } catch (err) {
        console.error(
          '\n---------------------------\n',
          'ERROR\n',
          err,
          '\n---------------------------\n'
        )
      }
    }
  } catch(err) {
    throw err
  }


  await fs.writeFileSync(
    path.join(__dirname, `${projectLocation}/hospitals.json`),
    JSON.stringify(hospitals, 'utf8', 2),
    err => console.log(err)
  )
  await fs.writeFileSync(
    path.join(__dirname, `${projectLocation}/peer-groups.json`),
    JSON.stringify(peerGroups, 'utf8', 2),
    err => console.log(err)
  )
  await fs.writeFileSync(
    path.join(__dirname, `${projectLocation}/specialities.json`),
    JSON.stringify(specialities, 'utf8', 2),
    err => console.log(err)
  )
  await fs.writeFileSync(
    path.join(__dirname, `${projectLocation}/procedures.json`),
    JSON.stringify(procedures, 'utf8', 2),
    err => console.log(err)
  )

  for (procedure in (procedureStats)) {
    // console.log('Writing data for', procedure)
    const fileName = procedure
      .toLowerCase()
      .trim()
      .trim().replace(/\W/gi, '_')
    await fs.writeFileSync(
      path.join(__dirname, `${projectLocation}/procedures/${fileName}.js`),
      `var procedure__${fileName} = ${JSON.stringify(procedureStats[procedure], 'utf8', 2)}`,
      err => console.log(err)
    )
  }
}


try {
  start()
} catch (err) {
  console.log({ err })
}