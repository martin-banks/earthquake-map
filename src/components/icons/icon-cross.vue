<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    :fill="color"
    viewBox="0 0 100 100"
  >
    <path
      d="M66.68,50.5l28-28a4.45,4.45,0,0,0,0-6.28L83.8,5.3a4.45,4.45,0,0,0-6.28,0l-28,28L22,5.85a4.45,4.45,0,0,0-6.28,0L4.85,16.75a4.45,4.45,0,0,0,0,6.28L32.32,50.5l-28,28a4.45,4.45,0,0,0,0,6.28L15.2,95.7a4.45,4.45,0,0,0,6.28,0l28-28L77,95.15a4.45,4.45,0,0,0,6.28,0l10.9-10.9a4.45,4.45,0,0,0,0-6.28Z"
    ></path>
  </svg>
</template>


<script>
export default {
  name: 'icon-cross',
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
