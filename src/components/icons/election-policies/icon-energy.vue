<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="this.w"
    :fill="this.fill"
    viewBox="0 0 100 100"
  >
    <title>Energy</title>
    <path d="M11.14,42.86H2a2.38,2.38,0,0,0,0,4.76h9.14a2.38,2.38,0,0,0,0-4.76Z"/>
    <path d="M98,42.86H88.86a2.38,2.38,0,0,0,0,4.76H98a2.38,2.38,0,0,0,0-4.76Z"/>
    <path d="M21,72.13,14.1,79.27a2.44,2.44,0,0,0,0,3.37,2.24,2.24,0,0,0,3.23,0l6.86-7.15a2.45,2.45,0,0,0,0-3.36A2.23,2.23,0,0,0,21,72.13Z"/>
    <path d="M77.43,19.05a2.28,2.28,0,0,0,1.62-.7l6.85-7.14a2.44,2.44,0,0,0,0-3.37,2.22,2.22,0,0,0-3.23,0L75.81,15a2.46,2.46,0,0,0,0,3.37A2.26,2.26,0,0,0,77.43,19.05Z"/>
    <path d="M21,18.35a2.22,2.22,0,0,0,3.24,0,2.46,2.46,0,0,0,0-3.37L17.33,7.84a2.22,2.22,0,0,0-3.23,0,2.44,2.44,0,0,0,0,3.37Z"/>
    <path d="M79.05,72.13a2.23,2.23,0,0,0-3.24,0,2.45,2.45,0,0,0,0,3.36l6.86,7.15a2.24,2.24,0,0,0,3.23,0,2.44,2.44,0,0,0,0-3.37Z"/>
    <path d="M79.51,41.87a2.29,2.29,0,0,0-2.08-1.4H55.7L70.4,3.29A2.46,2.46,0,0,0,70,.77,2.26,2.26,0,0,0,67.61.1L37.9,9.63a2.32,2.32,0,0,0-1.5,1.52L22.69,54A2.43,2.43,0,0,0,23,56.15a2.27,2.27,0,0,0,1.86,1H40.14L29.51,97a2.44,2.44,0,0,0,1.12,2.74,2.23,2.23,0,0,0,2.81-.54L79.15,44.42A2.46,2.46,0,0,0,79.51,41.87ZM36.62,88.11,45.34,55.4A2.4,2.4,0,0,0,45,53.32a2.25,2.25,0,0,0-1.82-.94H28L40.37,13.82l24-7.68L50.17,42a2.45,2.45,0,0,0,.22,2.23,2.25,2.25,0,0,0,1.9,1.06H72.41Z"/>
  </svg>
</template>


<script>
export default {
  name: 'election-policy-icon-energy',
  props: {
    w: {
      required: false,
      type: Number,
      default: 30,
    },
    fill: {
      required: false,
      type: String,
      default: '#333',
    },
  },
}
</script>


<style scoped lang="sass">
@import index


</style>