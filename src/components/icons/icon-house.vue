<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :fill="color"
    viewBox="0 0 100 90"
  >
    <g>
      <path d="M15.11,45.87V88.22A1.8,1.8,0,0,0,16.93,90H82.57a1.81,1.81,0,0,0,1.82-1.78V45.87a1.76,1.76,0,0,0-.77-1.45L50.8,21.52a1.85,1.85,0,0,0-2.11,0L15.87,44.42A1.75,1.75,0,0,0,15.11,45.87Z"/>
      <path d="M48.59.47,1,33.34A2.44,2.44,0,0,0,.48,36.8l3.66,4.91a2.55,2.55,0,0,0,3.52.55L48.58,14.1a2.55,2.55,0,0,1,3,0l40.8,29.06a2.55,2.55,0,0,0,3.52-.55l3.66-4.92A2.43,2.43,0,0,0,99,34.24L51.56.47A2.57,2.57,0,0,0,48.59.47Z"/>
    </g>
  </svg>


</template>


<script>
export default {
  name: 'icon-house',
  props: {
    size: {
      type: Number,
      default () {
        return 30
      }
    },
    color: {
      type: String,
      required: false,
      default () {
        return '#333'
      },
    },
  },
}
</script>


<style scoped lang="sass">
@import index

</style>
