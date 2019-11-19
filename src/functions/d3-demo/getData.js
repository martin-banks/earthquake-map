// This function will trigger after D3 is loaded on the page
// It will start drawing the D3 objects on the page
import d3 from 'd3'

export default function getdata (dataLocation) {
  d3.csv(dataLocation + 'assets/shootings.csv', function(d) {
    // eslint-disable-line
    // Assigning data the value from the csv file
    data = d
    // fill/stroke Color is defined here as d3 might not be available on page load
    fillColor = d3.scale
      .ordinal()
      .domain([-3, -2, -1, 0, 1, 2, 3])
      .range(['#df1c2a', '#f37f8a', '#e6afb6', '#00882a', '#99b7e2', '#6e98d2', '#3a17f2'])
    strokeColor = d3.scale
      .ordinal()
      .domain([-3, -2, -1, 0, 1, 2, 3])
      .range(['#f5dad9', '#e4566a', '#d4929d', '#75d68e', '#7996e3', '#4574c3', '#2700c8'])
    createNodes()
  })
}
