<template>
  <div class="wrapper__filter">
    <label for="filter">{{ label }}</label>
    <select
      name="filter"
      id=""
      @change="changeFilter"
    >
      <option value="all">All options</option>
      <option
        v-for="(value, i) in values"
        :key="`filter-${i}`"
        :value="value"
      >
        {{ value }}
      </option>
    </select>
  </div>

</template>


<script>
export default {
  name: 'ratings-sort',
  props: {
    label: {
      type: String,
      required: false,
      default: 'Choose option to filter by',
    },
    values: {
      type: Array,
      required: true,
      // validate (value) {},
    },
  },
  components: {},
  data () {
    return {}
  },
  methods: {
    changeFilter (e) {
      this.$emit('newFilter', e.target.value.toLowerCase())
    }
  },
  computed: {},
}
</script>


<style scoped lang="sass">
@import index

.wrapper
  &__filter
    margin-bottom: 32px

</style>
