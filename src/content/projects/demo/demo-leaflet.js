import layout from '@/layouts/demo-leaflet.vue'
// import importAllImages from '@/functions/importAllImages.js'


export default {
  layout,
  showDump: false,
  custom: {},

  // !! WARNING !!
  // This function imports all images, regardless of whether they are used or not
  // be sure to move unused images to a different location
  // allImages: importAllImages(require.context('../images', false, /\.js/)),

  header: {
    title: 'Seven days of earthquakes',
    intro: false,
  },
  parts: [],

  map: {
    coords: {
      lat: 15,
      lng: 180,
    },
    zoom: 3,
  },

  popups: [
    {
      type: 'circleMarker',
      coords: {
        lat: 51.3,
        lng: -2,
      },
      size: 20,
      tooltip: 100,
    },
  ],

  markers: [
    // {
    //   // circleMarker is a circle with size measured in pixels relative to the screen
    //   // circle has size measured in meters relative to the map
    //   type: 'circleMarker',
    //   coords: {
    //     lat: 51.5,
    //     lng: 0,
    //   },
    //   size: 20,
    //   tooltip: 100,
    //   popup: 'Lorem ipsum dolores sit amet...',
    // },
  ],
}
