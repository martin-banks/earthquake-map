// import $ from 'jquery'
import { ajaxSetup, getJSON } from 'jquery'

require('es6-promise').polyfill()

export default function dataAPI ({ env = 'UAT', quiz, question }) {
  const endpoint = {
    PROD: 'http://api.news.com.au/mm/dataset',
    UAT: 'http://api.ni.news.com.au/mm/dataset'
  }

  // Name of the data set containing results for each 'quiz'
  // Individual questions are stored as objects under this parent name

  const entryName = `${quiz}_${question}`
  const url = {
    create: `${endpoint[env]}/NNDT3InteractiveVoting/insert?callback=?`,
    read: `${endpoint[env]}/NNDT3InteractiveVoting/select?callback=?`,
    update: `${endpoint[env]}/NNDT3InteractiveVoting/update?callback=?`,
  }

  return {
    create () {
      const params = {
        format: 'json',
        args: {
          values: [{ 
            project_name: entryName 
          }]
        }
      }
      return new Promise((resolve, reject) => {
        ajaxSetup({ cache: true });
        getJSON(url.create, params, data => {
          resolve(data)
        })
      })
    },

    read () {
      const params = {
        format: 'json',
        args: {
          'count': 100,
          'where': [{
            field: 'project_name',
            op: '=',
            value: entryName
          }]
        }
      }
      return new Promise((resolve, reject) => {
        ajaxSetup({ cache: true });
        getJSON(url.read, params, data => {
          if (!data.items.length) {
            console.warn('Data not found, create new set first')
            reject(new Error(JSON.stringify(data, 'utf-8', 2)))
            return
          }
          resolve(data)
        })
      })
    },

    update ({ key = 'rating0', value }) {
      const params = {
        format: 'json',
        args: {
          // count: 100,
          where: [{
            field: 'project_name', 
            op: '=', 
            value: entryName
          }],
          values: [{ [key]: value }]
        }
      }
      return new Promise((resolve, reject) => {
        ajaxSetup({ cache: true });
        getJSON(url.update, params, response => {
          if (response.error) {
            reject(new Error('Update failed:', response))
          }
          resolve(response)
        })
      })
    },

  }
}

