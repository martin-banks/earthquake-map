<template>
  <div
    :style="{
      width: `${w}px`,
      height: `${w}px`,
      background: '#e2e2e2',
      borderRadius: `${w}px`,
      border: `solid 1px ${fill}`,
      marginBottom: '4px',
    }"
  />
</template>


<script>
export default {
  name: 'election-policy-icon-education',
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