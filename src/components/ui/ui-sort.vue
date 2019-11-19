<template>
  <div class="wrapper__sort">
    <label for="sort">{{ label }}</label>
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
        @click="emitSort(value)"
      >
        {{ value }}
        <span
          :class="{
            order: true,
            order__ascend: ascend,
            order__descend: !ascend,
            order__hide: value !== active,
          }"
        />
      </button>
    </div>
  </div>

</template>


<script>
export default {
  name: 'ratings-sort',
  props: {
    values: {
      type: Array,
      required: true,
      // validate (value) {},
    },
    label: {
      type: String,
      required: false,
      default: 'Choose option to sort by',
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
    }
  },
  components: {},
  data () {
    return {
      active: null,
    }
  },

  methods: {
    emitSort (val) {
      // if (this.active === val) return
      this.active = val
      this.$emit('newSort', val)
    }
  },

  computed: {},

  mounted () {
    this.active = this.values[0]
  }
}
</script>


<style scoped lang="sass">
@import index

.wrapper
  &__sort
    display: flex
    flex-wrap: wrap
    align-items: center
    // margin-bottom: 32px
    padding-bottom: 16px
    // border-bottom: solid 1px $color-grey-2
    label
      flex: 1 1 auto
      max-width: 200px
      padding-right: 16px
  &__buttons
    transition: all 300ms
    display: flex
    flex: 1 1 auto
    button
      transition: all 200ms
      box-sizing: border-box
      flex: 1 1 auto
      margin: 4px
      padding: 8px 14px
      // min-width: 80px
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
.order
  transition: all 200ms
  position: relative
  display: inline-block
  vertical-align: center
  border: solid 6px rgba(white, 0)
  opacity: 1
  &__ascend
    border-top: none
    border-bottom: solid 8px rgba(white, 1)
  &__descend
    border-top: solid 8px rgba(white, 1)
    border-bottom: none
  &__hide
    opacity: 0


</style>
