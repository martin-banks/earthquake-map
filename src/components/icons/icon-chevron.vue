<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="w"
    :fill="color"
    viewBox="0 0 29 50"
    :style="{
      transform: `rotate(${angle}deg)`,
    }"
  >
    <path
      d="M3.58,49.92a3.46,3.46,0,0,1-2.47-1,3.49,3.49,0,0,1,0-5l19-19-19-19A3.5,3.5,0,0,1,6.06.94l21.5,21.5a3.51,3.51,0,0,1,0,4.95L6.06,48.89A3.48,3.48,0,0,1,3.58,49.92Z"
    />
  </svg>
</template>


<script>
export default {
  name: 'icon-chevron',
  props: {
    w: {
      type: Number,
      required: false,
      default () {
        return 20
      },
    },
    color: {
      type: String,
      required: false,
      default () {
        return '#333'
      },
    },
    angle: {
      type: Number,
      required: false,
      default () {
        return 0
      },
    },
  },
  components: {},
  data () {
    return {}
  },
  methods: {},
  computed: {},
}
</script>


<style scoped lang="sass">
@import index

</style>
