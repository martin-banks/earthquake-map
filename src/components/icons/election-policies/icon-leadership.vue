<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="this.w"
    :fill="this.fill"
    viewBox="0 0 100 100"
  >
    <title>Leadership</title>
    <path d="M86.3,64.92H85V27.14H80V25.32h-12v5.46H80V29.19H83V64.92H74.82V49.18A17.72,17.72,0,0,0,57.13,31.49h-2L53.35,29.7l0,0a14.46,14.46,0,1,0-5.7,0l0,0-1.79,1.79h-2A17.71,17.71,0,0,0,26.1,49.18V64.92H14.6V80.19h7V99H79.37V80.19H86.3ZM70.72,49.18V64.92H65.38V48.42h-4.1v16.5h-9.1l1.17-1.17,3.33-3.33L58.12,59l-.28-2L55.51,40l1.17-1.17,2.9-2.89-.12-.12A13.6,13.6,0,0,1,70.72,49.18ZM53.78,35.93l-2.61,2.6,2.61,19-3.32,3.32-3.33-3.32,2.61-19-2.61-2.6.33-.34h.17v-.16l2.83-2.83ZM40.1,15.48A10.36,10.36,0,1,1,50.46,25.84,10.36,10.36,0,0,1,40.1,15.48Zm-9.9,33.7A13.59,13.59,0,0,1,41.45,35.81l-.12.12,2.9,2.89L45.4,40,43.07,57l-.28,2,1.44,1.44,3.32,3.33,1.18,1.17H39.36V48.42h-4.1v16.5H30.2ZM75.27,94.9H25.64V80.19H75.27ZM82.2,76.09H18.71V69H82.2Z"/>
  </svg>
</template>


<script>
export default {
  name: 'election-policy-icon-leadership',
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