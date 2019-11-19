<template>
  <div>
    <div class="wrapper__sort">
      <label>{{ label }}</label>
      <div class="wrapper__buttons">
        <button
          v-for="(value, i) in values"
          :key="`sort-${value}-${i}`"
          :class="{
            sort__active: value === active
          }"
          :style="{
            background: (value === active) ? `linear-gradient(45deg, ${colors.dark}, ${colors.light})` : '',
          }"
          @click="setFilter(value)"
        >
          {{ value }}
        </button>
      </div>
    </div>
  </div>


</template>


<script>
export default {
  name: 'ui-filter-buttons',
  props: {
    filter: {
      type: Object,
      required: true,
    },
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
    ascend: {
      type: Boolean,
      required: false,
      default: true,
    },
    colors: {
      type: Object,
      // required: false,
      default () {
        return {
          dark: 'rgba(60,60,60, 1)',
          light: 'rgba(100,100,100, 1)',
        }
      },
    },
  },
  components: {},
  data () {
    return {
      openNav: false,
      chosenNav: 'All options',
      active: null,
    }
  },
  methods: {
    setFilter (value) {
      this.active = value
      // this.$emit('newFilter', value)

      // console.log(e.target.getAttribute('data-value').trim().toLowerCase())
      // const value = e.target.getAttribute('data-value').trim() // .toLowerCase()
      // this.chosenNav = value
      this.$emit('newFilter', {
        value,
        category: this.filter.category,
        match: this.filter.match,
      })
      // this.toggleNav()
    },
  },
  computed: {},
  mounted () {
    this.active = this.values[0]
  },
}
</script>


<style scoped lang="sass">
@import index

.wrapper
  &__sort
    // margin-bottom: 32px
    display: flex
    flex-wrap: wrap
    padding-bottom: 16px
    // border-bottom: solid 1px $color-grey-2
    label
      flex: 1 1 auto
      max-width: 200px
      padding-right: 16px
  &__buttons
    transition: all 300ms
    display: flex
    flex-wrap: wrap
    flex: 1 1 auto
    min-width: 280px
    button
      transition: all 200ms
      box-sizing: border-box
      flex: 1 1 auto
      margin: 2px
      padding: 8px 14px
      min-width: 60px
      // max-width: 200px
      opacity: 0.8
      &:first-letter
        text-transform: uppercase
      &:hover
        background: rgba(black, 0.1)
        opacity: 1

.sort
  &__active
    // background: lightblue
    border: solid 1px rgba(black, 0)
    color: white

  &__hide
    opacity: 0


</style>
