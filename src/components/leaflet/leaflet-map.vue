<template>
  <div id="map"></div>
</template>


<script>
import L from 'leaflet'
import markerIcon from '@/map-icons/marker-icon.png'
import markerShadow from '@/map-icons/marker-shadow.png'
// https://leafletjs.com/reference-1.3.2.html

export default {
  name: 'leaflet-map',
  props: {
    // zoom: {
    //   type: Number,
    //   required: false,
    //   default: 5,
    //   // validator: (value) {
    //   //   // Custom function to validate prop value
    //   // }
    // },
    // lat: {
    //   type: Number,
    //   required: false,
    //   default: 52,
    // },
    // lng: {
    //   type: Number,
    //   required: false,
    //   default: 0,
    // },

  },
  components: {},
  data () {
    return {
      map: this.$root.content.map,
      mapInstance: null,
      tileLayer: null,
      markers: null,
    }
  },

  methods: {
    initMap () {
      this.mapInstance = L
        .map(this.$el)
        .setView(this.map.coords, this.map.zoom)
      const { tiles, attribution } = this.$root.content.tileOptions[this.$root.content.options.theme || 'light']
      this.tileLayer = L.tileLayer(
        tiles,
        { attribution }
      )

      this.tileLayer.addTo(this.mapInstance)
      console.log('map created')
    },
    createMarkers () {
      console.log('creating markers')
      const icon = L.icon({
        iconUrl: markerIcon,
        iconSize: [32, 54],
        iconAnchor: [16, 54],
        popupAnchor: [0, 0],
        shadowUrl: markerShadow,
        shadowSize: [54, 54],
        shadowAnchor: [16, 54],
      })

      this.markers = this.map.markers.map((marker, i) => {
        console.log({ marker })
        const id = `marker-${marker.title.replace(/\s+/gi, '_')}-${i}`
        const newMarker = L.marker(marker.coords, {
          icon
        }).addTo(this.mapInstance)
        newMarker.addTo(this.mapInstance)
        if (marker.caption) {
          newMarker.addEventListener('click', e => {
            const popup = L.popup()
              .setLatLng(marker.coords)
              .setContent(`
                <h4>${marker.title}</h4>
                <p>${marker.caption}</p>
              `)
              .openOn(this.mapInstance)
          })
        }
        return newMarker
      })
    },
    addMarkers () {
      this.markers.forEach(m => m.addTo(this.mapInstance))
    },
  },

  computed: {},

  mounted () {
    this.initMap()
    if (this.map.markers) {
      this.createMarkers()
    }


  },
}
</script>


<style lang="sass">
@import index
@import leaflet

#map
  position: abosolute
  top: 0
  left: 0
  width: 100%
  min-height: 400px
  height: 100%




</style>
