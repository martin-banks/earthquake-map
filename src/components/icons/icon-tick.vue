<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    :fill="color"
    viewBox="0 0 100 100"
  >
    <path
      d="M43.76,91.76a13.57,13.57,0,0,1-7.86-2.5L2.31,65.47a4.78,4.78,0,0,1-1.13-6.66L10,46.41a4.77,4.77,0,0,1,6.66-1.14L41.18,62.66,78.94,9.55a4.79,4.79,0,0,1,6.67-1.12L98,17.23a4.8,4.8,0,0,1,1.13,6.67L55,86A13.73,13.73,0,0,1,43.76,91.76Z"
    />
  </svg>
</template>


<script>
export default {
  name: 'icon-tick',
  props: {
    size: {
      type: Number,
      required: false,
      default () {
        return 50
      },
    },
    color: {
      type: String,
      required: false,
      default () {
        return '#333'
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
