<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    :fill="color"
    viewBox="0 0 300 300"
  >
    <polygon points="293.44 45.15 254.29 6 150.22 110.07 46.15 6 7 45.15 111.07 149.22 7 253.29 46.15 292.44 150.22 188.37 254.29 292.44 293.44 253.29 189.37 149.22 293.44 45.15"/>
  </svg>
</template>


<script>
export default {
  name: 'icon-close',
  props: {
    size: {
      type: Number,
      required: false,
      default () {
        return 30
      },
    },
    color: {
      type: String,
      required: false,
      default () {
        const { theme } = this.$root.content.options
        return (theme && theme === 'light') ? 'rgba(0,0,0, 0.7)' : '#f2f2f2'
      },
    },
  },
}
</script>


<style scoped lang="sass">
@import index

</style>
