<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :fill="color"
    viewBox="0 0 210 300"
  >
    <polygon points="210 150 105 0 0 150 70 150 70 300 140 300 140 150 210 150"/>
  </svg>

</template>


<script>
export default {
  name: 'arrow-up',
  props: {
    width: {
      type: String,
      required: false,
      default () {
        return 100
      },
    },
    height: {
      type: String,
      required: false,
      default () {
        return 100
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
