<template>
  <div
    class="responsiveImage"
    :style="styles__wrapper"
  >
    <picture v-imageloaded>
      <source :srcset="createSrcSet"/>
      <img v-imageloaded
        class="responsiveImage"
        :src="image"
        :alt="alt"
        :style="imgStyles"
      />
    </picture>
  </div>
</template>


<script>
import imageConfig from '@/content/config/images.config.json'

export default {
  name: 'responsive-image',
  props: [
    'imageFiles', // Object of image files
    'image', // Default image to use as fallback where browsers do not support picture/srcset
    'alt', // alt text if image is not rendered
    'imgStyles', // Custom styles to add to the img element
  ],
  components: {},
  data () {
    return {
      config: imageConfig,
    }
  },
  // methods: {},

  computed: {
    createSrcSet () {
      const { jsPrefix } = this.config
      const { imageFiles } = this
      const srcset = Object.keys(imageFiles)
        .map(img => `${imageFiles[img]} ${img.split(jsPrefix)[1]}w`) // returns - imgName sizew
        .filter(img => parseInt(img.split(' ')[1][0], 10)) // filter for sizes that aren't numbers
        .join(', ')
      // console.log({srcset})
      return srcset
      // EXPECTED OUTPUT:
      // path/to/image/ImgName.jpg 200w,
      // path/to/image/ImgName.jpg 400w,
      // path/to/image/ImgName.jpg 600w,
      // path/to/image/ImgName.jpg 800w
    },

    styles__wrapper () {
      const { ImgData, colors } = this.imageFiles

      const colorFrom = colors ? (colors.Vibrant || colors.DarkVibrant || colors.LightVibrant)._rgb : [100,100,100]
      const colorTo = colors ? (colors.Muted || colors.DarkMuted || colors.LightMuted)._rgb : [180,180,180]
      const output = {}
      output.backgroundImage = `linear-gradient(45deg,
          rgb(${colorFrom.join(',')}),
          rgb(${colorTo.join(',')})
        )`
      output.height = 0
      output.paddingBottom = `${ImgData.ratio * 100}%`

      if (this.imgStyles) {
        Object.keys(this.imgStyles).forEach(k => {
          output[k] = this.imgStyles[k]
        })
      }
      return output
    }
  },

}
</script>


<style scoped lang="sass">
@import index

.responsiveImage
  object-fit: contain
  object-position: 50% 50%
  margin: 0

</style>
