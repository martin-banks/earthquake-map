<template>
<div
    class="spinner"
    data-spinner
    :style="{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '60px',
      height: '60px',
    }"
  >
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      class="lds-rolling
    ">
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="#fff"
        stroke-width="10"
        r="35"
        stroke-dasharray="164.93361431346415 56.97787143782138"
        transform="rotate(140.903 50 50)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
          dur="2.5s"
          begin="0s"
          repeatCount="indefinite"
        />
    </circle>
  </svg>

</div>

</template>


<script>
export default {
  name: 'icon-spinner',
  props: [],
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
