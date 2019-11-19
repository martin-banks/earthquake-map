<template>
  <div>
    <div class="map__wrapper">
      <div id="map"></div>
      <div v-if="details.properties" class="quakeDetails">
        <h6 v-if="details.properties">{{ details.properties.type }}</h6>
        <h3 v-if="details.properties">{{ details.properties.place }}</h3>
        <p v-if="details.properties">{{ quakeDate(details.properties.time) }}</p>
        <div  class="magnitude__wrapper">
          <p>Magnitude: {{ details.properties.mag }}</p>
          <div class="magnitude__track">
            <div
              class="magnitude__mark"
              :style="{
                left: `${details.properties.mag / 10 * 100}%`,
              }"
            ></div>
          </div>
        </div>
        <p v-if="details.properties && details.properties.tsunami">
          Tsunami warning issued
        </p>
        <p v-else>
          No tsunami warning
        </p>
      </div>
    </div>

    <div v-if="responseData" class="timeline__wrapper">
      <h4>Timeline of quakes</h4>
      <div
        class="timeline__track"
        @mousemove="changeTimelineScale"
      >
        <div class="timeline__mark--wrapper">
          <div
            v-for="(quake, i) in responseData.features"
            :key="`timeline-${i}`"
            class="timeline__mark"
            :style="styles__timelineMark(quake.properties)"
          ></div>
        </div>

        <div v-if="showControls" class="timeline__controls--wrapper">
          <div
            class="timeline__controls--bracket"
            :style="{
              left: `${bracket.from * 100}%`,
              width: `${bracket.width * 100}%`
            }"
          ></div>
          <div
            class="timeline__slide timeline__slide--from"
            data-scale="from"
            :style="{
              left: `${bracket.from * 100}%`,
            }"
            @mousedown="startTimelineScale('from')"
            @mouseup="endTimelineScale"
          ></div>
          <div
            class="timeline__slide timeline__slide--to"
            data-scale="to"
            :style="{
              left: `${(bracket.width + bracket.from) * 100}%`,
            }"
            @mousedown="startTimelineScale('to')"
            @mouseup="endTimelineScale"
          ></div>
        </div>

      </div>
      <div class="ticks__wrapper">
        <div
          v-for="day in (days + 1)"
          :key="`tick-${day}`"
          class="tick"
        ></div>
      </div>
      <div class="timeline__labels">
        <p>{{ quakeDate(dateRange.from) }}</p>
        <p>{{ quakeDate(dateRange.to) }}</p>
      </div>
    </div>


    <!-- <button
      @mouseover="testfunc"
    >test button</button> -->
  </div>
</template>


<script>
import L from 'leaflet'
// import 'leaflet/dist/leaflet.css'

export default {
  name: 'leaflet-data',
  props: [],
  components: {},
  data () {
    return {
      days: 7,
      tileLayer: null,
      myMap: null,
      map: null,
      tile: {
        subdomains: 'abcd',
        maxZoom: 19,
        layer: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png',
        attr:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      },
      coords: {
        center: [52, 0],
        zoom: 15,
      },
      details: false,
      responseData: null,
      dateRange: null,
      sliding: false,
      slideTarget: null,
      bracket: {
        width: 1,
        from: 0,
        to: 1,
      },
      showControls: false,
    }
  },
  methods: {
    initMap () {
      const { map: { coords, zoom } } = this.$root.content
      this.myMap = L.map(this.$el.querySelector('#map')).setView([coords.lat, coords.lng], zoom)
      this.tileLayer = L.tileLayer(
        this.tile.layer,
        { attribution: this.tile.attr }
      )
      this.tileLayer.addTo(this.myMap)
    },
    addMarkers () {
      const { markers } = this.$root.content
      markers.forEach(m => {
        const { coords: { lat, lng }, tooltip, type, size, popup } = m
        const newMarker = L[type]([lat, lng], {
          // radius: 100 * 1000, // circle size is geographic in meters
          radius: size, // circleMarker: radius is fixed in pixels
          color: 'orange',
          fillColor: 'rgb(220, 130, 0)',
          fillOpacity: 0.2,
          fill: true,
          interactive: false,
        })
        newMarker.addTo(this.myMap)

        if (tooltip) {
          newMarker.bindTooltip(`${tooltip}`, {
            direction: 'center',
            interactive: true,
            permanent: true,
          })
            .openTooltip()
        }

        if (popup) {
          newMarker.addEventListener('click', () => {
            L.popup()
              .setLatLng([lat, lng])
              .setContent(popup)
              .openOn(this.myMap)
          })
        }
      })
    },
    addPopups () {
      const { popups } = this.$root.content
      popups.forEach(popup => {
        const { coords: { lat, lng }, tooltip, type, size } = popup
        const newPopup = L.popup()
          .setLatLng([lat, lng])
          .setContent('Some popuyp content')
          .openOn(this.myMap)
      })
    },
    mouseOverQuake (e) {
      const { data } = arguments[0]
      // console.log({ data })
      this.details = data
    },
    renderQuakes () {
      this.myMap.eachLayer(l => {
        if (l.type === 'circlemarker') {
          this.myMap.removeLayer(l)
        }
      })
      this.markers = this.responseData.features
        .filter(f => {
          if (!this.dateRange) return true
          const start = this.dateRange.from + (this.bracket.from * this.dateRange.range)
          const end = this.dateRange.from + (this.dateRange.range * this.bracket.to)
          return f.properties.time > start && f.properties.time < end
        })
        .map(f => {
          const { coordinates } = f.geometry
          const quake = L.circleMarker([coordinates[1], coordinates[0]], {
            radius: 5 * f.properties.mag,
            fillColor: `hsl(${50 * ((10 - f.properties.mag) / 10)}, 100%, 50%)`,
            fillOpacity: 0.2,
            color: 'rgba(0,0,0,0)',
          })
          quake.addTo(this.myMap)
          quake.type = 'circlemarker'
          quake.addEventListener('mouseover', this.mouseOverQuake.bind(false, { data: f }))

          const quakeAlt = L.circleMarker([coordinates[1], coordinates[0]+360], {
            radius: 5 * f.properties.mag,
            fillColor: `hsl(${50 * ((10 - f.properties.mag) / 10)}, 100%, 50%)`,
            fillOpacity: 0.2,
            color: 'rgba(0,0,0,0)',
          })
          quakeAlt.addTo(this.myMap)
          quakeAlt.type = 'circlemarker'
          quakeAlt.addEventListener('mouseover', this.mouseOverQuake.bind(false, { data: f }))
          return { quake, quakeAlt }
        })
    },
    styles__timelineMark (properties) {
      const pct = (properties.time - this.dateRange.from + 1) / this.dateRange.range * 100
      const height = `${properties.mag / 10 * 40}px`
      // console.log(properties.mag, height, 50 * ((properties.mag) / 10))
      return {
        left: `${pct}%`,
        // background: `hsl(${50 * ((10 - properties.mag) / 10)}, 100%, 50%)`,
        // height,
      }
    },
    quakeDate (time) {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      const date = new Date(time)
      const year = date.getFullYear()
      const month = months[date.getMonth()]
      const day = date.getDate()
      
      return `${day} ${month} ${year}`
    },
    startTimelineScale (type) {
      this.slideTarget = type
      this.sliding = true
    },
    endTimelineScale (e) {
      this.sliding = false
      this.slideTarget = null
      this.renderQuakes()
    },
    changeTimelineScale (e) {
      if (this.sliding && this.slideTarget) {
        const { left } = this.$el.getBoundingClientRect()
        const mouseLeft = e.pageX

        if (this.slideTarget === 'from') {
          const draggedPosition = Math.max(0, (mouseLeft - left) / this.$el.offsetWidth)
          this.bracket.from = draggedPosition > (this.bracket.to - 0.03) ? this.bracket.to - 0.03 : draggedPosition

        } else if (this.slideTarget === 'to') {
          const draggedPosition = Math.min(1, (mouseLeft - left) / this.$el.offsetWidth)
          // this.bracket.to = Math.min(1, (mouseLeft - left) / this.$el.offsetWidth)
          this.bracket.to = draggedPosition < (this.bracket.from + 0.03) ? this.bracket.from + 0.03 : draggedPosition
        }

        this.bracket.width = 1 - this.bracket.from - (1 - this.bracket.to)
      }
    },
    testfunc () {
      window.alert('you did something')
    }
  },
  computed: {
    style__bracket () {
      return {
        left: 0,
        width: 0,
      }
    }
  },

  beforeMount () {},

  mounted () {
    const { markers } = this.$root.content
    this.initMap()
    if (markers) this.addMarkers()

    const today = new Date()
    const lastweek = new Date(new Date().setDate(today.getDate() - this.days))

    const monthFrom = `0${lastweek.getMonth() + 1}`.slice(-2)
    const dayFrom = `0${lastweek.getDate()}`.slice(-2)
    const yearFrom = lastweek.getFullYear()

    const monthTo = `0${today.getMonth() + 1}`.slice(-2)
    const dayTo = `0${today.getDate()}`.slice(-2)
    const yearTo = today.getFullYear()

    const dateFrom = `${yearFrom}-${monthFrom}-${dayFrom}`
    const dateTo = `${yearTo}-${monthTo}-${dayTo}`

    const endpoint = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${dateFrom}&endtime=${dateTo}`
    // console.log(endpoint)

    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        this.responseData = data
        this.renderQuakes()
        const dates = data.features.map(f => f.properties.time)
        const from = Math.min(...dates)
        const to = Math.max(...dates)
        const range = to - from
        this.dateRange = { from, to, range }
        this.showControls = (!('ontouchstart' in document.documentElement))
      })
      .catch(console.error)

  },
}
</script>


<style lang="sass">
@import index
@import leaflet

#map, #testmap, #newmap, #childmap
  // height: 0px
  // padding-bottom: 60%
  height: 100vh
  margin-bottom: 32px
  z-index: 0

  .leaflet-tooltip
    background: none
    border: none
    font-size: 20px
    text-align: center
    transform: translate(50%, 0)
    box-shadow: none
    text-shadow: none
    font-weight: 800

.quakeDetails
  position: absolute !important
  top: 0
  right: 0
  color: white
  width: 100%
  max-width: 400px
  padding: 16px
  background: rgba(black, 0.4)
  // border-radius: 4px
  // +shadow-box-2
  z-index: 10000
  *
    color: white !important
  p
    text-transform: capitalize
    margin: 0 !important

.magnitude
  &__wrapper
    display: flex
    p
      padding-right: 24px
      min-width: 30%
  &__track
    flex: 1 1 auto
    height: 20px
    background: linear-gradient(90deg, hsl(60, 100%, 50%), hsl(40, 100%, 50%), hsl(0, 100%, 50%))
    border: solid 1px $color-grey-8
    border-radius: 20px
    padding: 2px
    margin-bottom: 8px
  &__mark
    transition: left 200ms
    position: absolute
    top: 0
    left: 0
    height: 14px
    width: 14px
    background: black
    border-radius: 20px
    transform: translate(-50%, 0)

.timeline
  &__wrapper
    position: absolute !important
    display: block
    top: 100vh
    width: 100%
    transform: translateY(-100%)
    background: rgba(255,255,255, 0.5)
    padding: 32px
    z-index: 100
  &__track
    height: 40px
    margin-bottom: 12px
  &__mark
    position: absolute !important
    top: 0
    height: 40px
    width: 1px
    background: rgba($color-grey-5, 0.2)
  &__labels
    display: flex
    p
      flex: 1 1 auto
      margin: 0
      color: $color-grey-5
      font-weight: 600 !important
      font-size: 12px !important
      &:nth-of-type(even)
        text-align: right
  &__controls
    &--wrapper
      height: 100%
      opacity: 0.6
      &:hover
        opacity: 1
        .timeline__slide
          transform: translate(-50%, 0) scale(1, 1)
    &--bracket
      transition: transform 200ms
      position: absolute !important
      top: 50%
      left: 0
      height: 60px
      transform: translate(0, -50%)
      border-top: solid 2px rgba(173, 216, 230, 1)
      border-bottom: solid 2px rgba(173, 216, 230, 1)
      border-radius: 2px
      &:hover
        border-left: solid 2px rgba(173, 216, 230, 1)
        border-right: solid 2px rgba(173, 216, 230, 1)
  &__slide
    transition: transform 200ms, opacity 200ms
    position: absolute !important
    top: 0
    width: 20px
    height: 40px
    transform: translate(-50%, 0) scale(0, 1)
    background: rgba(120, 150, 180, 1)
    color: white
    text-align: center
    font-size: 20px
    line-height: 40px
    opacity: 1
    border-radius: 10px
    &:hover
      transform: translate(-50%, 0) scale(2) !important
    &:before
      content: '||'
    &--from
      left: 0
    &--to
      left: 100%


.ticks__wrapper
  display: flex
  width: 100%
  justify-content: space-between

.tick
  width: 4px
  height: 4px
  // background: $color-grey-4
  flex: 0 0 auto
  border: solid 2px rgba($color-grey-5, 0)
  border-top: solid 6px rgba($color-grey-5, 1)

</style>
