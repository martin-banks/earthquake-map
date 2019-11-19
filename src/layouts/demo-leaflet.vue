<template>
  <div>
    <leaflet-data />
  </div>
</template>


<script>
// import SimpleTitle from '@/components/headers/simple-title.vue'
import LeafletData from '@/components/leaflet/leaflet-data.vue'

export default {
  name: 'demo-leaflet',
  props: [],
  components: {
    // SimpleTitle,
    LeafletData,
  },
  data () {
    return {
      
    }
  },
  methods: {},
  computed: {},
}
</script>


<style scoped lang="sass">
@import index

</style>
