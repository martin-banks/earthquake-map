<template>
  <div
    :is="getIcon"
    :fill="color"
    :w="40"
  />
</template>


<script>
import city from '@/components/icons/election-policies/icon-city.vue'
import crime from '@/components/icons/election-policies/icon-crime.vue'
import education from '@/components/icons/election-policies/icon-education.vue'
import energy from '@/components/icons/election-policies/icon-energy.vue'
import environment from '@/components/icons/election-policies/icon-environment.vue'
import finance from '@/components/icons/election-policies/icon-finance.vue'
import healthcare from '@/components/icons/election-policies/icon-healthcare.vue'
import infrastructure from '@/components/icons/election-policies/icon-infrastructure.vue'
import leadership from '@/components/icons/election-policies/icon-leadership.vue'
import population from '@/components/icons/election-policies/icon-population.vue'

import noIcon from '@/components/icons/election-policies/no-icon.vue'

export default {
  name: 'election-policy-icons',
  props: {
    icon: {
      required: true,
      type: String,
      default: 'energy',
    },
  },
  data () {
    return {}
  },
  computed: {
    getIcon () {
      const icons = {
        city,
        crime,
        education,
        energy,
        environment,
        finance,
        healthcare,
        infrastructure,
        leadership,
        noIcon,
        population,
      }
      return icons[this.icon] || icons.noIcon
    },
    color () {
      return this.$root.content.colors[this.icon.toLowerCase()] || '#333'
    },
  },
}
</script>


<style scoped lang="sass">
@import index


</style>