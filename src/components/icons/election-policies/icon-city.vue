<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="this.w"
    :fill="this.fill"
    viewBox="0 0 100 100"
  >
    <title>City</title>
    <rect x="21.72" y="33.61" width="5.97" height="5.97"/>
    <rect x="21.72" y="44.53" width="5.97" height="5.97"/>
    <rect x="21.72" y="55.44" width="5.97" height="5.97"/>
    <rect x="21.72" y="66.36" width="5.97" height="5.97"/>
    <rect x="63.36" y="44.31" width="5.36" height="5.36"/>
    <rect x="74.04" y="44.31" width="5.36" height="5.36"/>
    <rect x="63.36" y="56.24" width="5.36" height="5.36"/>
    <rect x="74.04" y="56.24" width="5.36" height="5.36"/>
    <rect x="63.36" y="68.17" width="5.36" height="5.36"/>
    <rect x="74.04" y="68.17" width="5.36" height="5.36"/>
    <path d="M97.25,91.23h-7V37.62a3.53,3.53,0,0,0-3.52-3.52H63.83V7.39a3.52,3.52,0,0,0-3.51-3.52H26.23a3.53,3.53,0,0,0-3.52,3.52V20.53H15.62a6,6,0,0,0-6,6v64.7H2.75a2.45,2.45,0,1,0,0,4.9h94.5a2.45,2.45,0,0,0,0-4.9Zm-12-.16h-28v-52h28ZM27.67,8.83h31.2V34.1h-3a3.52,3.52,0,0,0-3.51,3.52V91.23H45.43V26.53a6,6,0,0,0-6-6H27.67ZM14.59,26.53a1,1,0,0,1,1-1H39.43a1.05,1.05,0,0,1,1,1v64.7h-5.2v-12a2.42,2.42,0,0,0-2.42-2.42h-11a2.42,2.42,0,0,0-2.42,2.42v12H14.59Zm9.7,64.7V81.67h6.15v9.56Z"/>
  </svg>
</template>


<script>
export default {
  name: 'election-policy-icon-city',
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
  }
}
</script>


<style scoped lang="sass">
@import index


</style>