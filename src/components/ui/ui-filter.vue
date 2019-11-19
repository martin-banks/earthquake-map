<template>
  <div>

    <!-- <div class="wrapper__filter">
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
    </div> -->

    <div class="wrapper__filter">
      <div class="wrapper__customList">
        <label>{{ label }}</label>
        <p
          class="select select__active"
          @click="toggleNav"
        >
          {{ chosenNav }}
          <span v-if="!openNav" class="arrow" />
        </p>
        <ul>
          <li
            v-if="openNav"
            class="select select__option--all"
            data-value="all"
            @click="setFilter"
          ><i>{{ $root.content.selectcta || 'Select an option' }}</i></li>
          <li
            v-if="openNav"
            :class="{
              select: true,
              select__option: true,
              'select__option--active': value.toLowerCase() === chosenNav.toLowerCase()
            }"
            v-for="(value, i) in values"
            :key="`filter-custom-${i}`"
            :data-value="value"
            @click="setFilter"
          >
            {{ value }}
          </li>
        </ul>

      </div>
    </div>
  </div>

</template>


<script>
export default {
  name: 'ui-filter',
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
    return {
      openNav: false,
      chosenNav: 'Select and option',
    }
  },
  methods: {
    changeFilter (e) {
      this.$emit('newFilter', e.target.value.toLowerCase())
    },
    toggleNav () {
      this.openNav = !this.openNav
    },
    setFilter (e) {
      // console.log(e.target.getAttribute('data-value').trim().toLowerCase())
      const value = e.target
        .getAttribute('data-value')
        .trim()
      this.chosenNav = value
      this.$emit('newFilter', value.toLowerCase().replace(/\s+/gi, '_'))
      this.toggleNav()
    },
  },
  computed: {},
  mounted () {}
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
      // display: inline-block
    ul
      // border: solid 1px blue
      +shadow-box-2
      position: absolute
      width: 100%
      padding: 0
      padding-top: 2px
      max-height: 300px
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
    background: gold
  &__active
    border: solid 1px $color-grey-3
    border-radius: 4px
    // text-transform: capitalize

  &__option
    // text-transform: capitalize
    &--active
      font-weight: 800
      &:before
        content: '>'

.arrow
  display: inline-block
  vertical-align: middle
  backgroubnd: white
  border: solid 6px rgba(black, 0)
  border-top: solid 10px rgba(black, 0.5)
  border-bottom: none
  margin-left: 12px

</style>
