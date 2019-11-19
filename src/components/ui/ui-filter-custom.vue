<template>
  <div class="wrapper__filter">
    <div class="wrapper__customList">
      <label>{{ label }}</label>
      <p
        class="select select__active"
        @click="toggleNav"
      >
        {{ chosenNav }} 
        <span v-if="!openNav" class="arrow">
          <span></span>
        </span>
      </p>
      <ul>
        <li
          v-if="openNav"
          class="select select__option--all"
          data-value="all"
          @click="setFilter"
        >All</li>
        <li
          v-if="openNav"
          :class="{
            select: true,
            select__option: true,
            //'select__option--active': value.toLowerCase() === chosenNav.toLowerCase()
          }"
          v-for="(value, i) in values"
          :key="`filter-custom-${i}`"
          :data-value="value.toString()"
          @click="setFilter"
        >
          {{ value.toString() }}
        </li>
      </ul>

    </div>
  </div>
</template>


<script>
export default {
  name: 'ui-filter-custom',
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
  },
  components: {},
  data () {
    return {
      openNav: false,
      chosenNav: 'All options',
    }
  },
  methods: {
    // changeFilter (e) {
    //   this.$emit('newFilter', e.target.value.toLowerCase())
    // },
    toggleNav () {
      this.$emit('filterToggled')
      this.openNav = !this.openNav
    },
    setFilter (e) {
      // console.log(e.target.getAttribute('data-value').trim().toLowerCase())
      const value = e.target.getAttribute('data-value').trim() // .toLowerCase()
      this.chosenNav = value
      this.$emit('newFilter', {
        value,
        category: this.filter.category,
        match: this.filter.match,
      })
      this.toggleNav()
    },
  },
  computed: {},
  mounted () {},
}
</script>


<style scoped lang="sass">
@import index

.wrapper
  &__filter
    // border: solid 1px purple
    cursor: pointer
    margin-bottom: 32px

  &__customList
    label
    ul
      +shadow-box-2
      position: absolute
      width: 100%
      padding: 0
      padding-top: 2px
      max-height: 310px
      overflow: auto
      z-index: 1000
      li
        transition: background 180ms ease-in
        list-style: none
        margin: 0
        &:nth-of-type(odd)
          background: $color-grey-2
        &:nth-of-type(even)
          background: $color-grey-1
        &:hover
          background: gold

.select
  transition: background 200ms
  padding: 8px 16px
  &:hover
    background: rgba(black, 0.1)
  &__active
    border: solid 1px $color-grey-3
    border-radius: 4px
    text-transform: capitalize

  &__option
    text-transform: capitalize
    &--active
      font-weight: 800
      &:before
        content: '>'

.arrow
  position: absolute
  right: 0
  top: 0
  height: 100%
  width: 40px
  backgroubnd: white
  background: rgba(black, 0.1)
  span
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    border: solid 6px rgba(black, 0)
    border-bottom: none
    border-top: solid 10px $color-grey-6



</style>
