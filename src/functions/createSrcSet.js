import config from '../../images.config.json'

// Use in conjunction with calculateImgSize.js for older browser fallback
// create src set of image. iterate up through the img Increment size from min to max value.
// return as string with width value, and filter out thumbnail images
// image versions should be processed by the processImage.js node script

function createSrcSet (src) {
  // console.log(src)
  const srcset = Object.keys(src)
    .map(img => `${src[img]} ${img.split(config.images.jsPrefix)[1]}w`) // returns - imgName sizew
    .filter(img => parseInt(img.split(' ')[1][0], 10)) // filter for sizes that aren't numbers
    .join(', ')
  // console.log({srcset})
  return srcset
}

export default createSrcSet

// EXPECTED OUTPUT:
// path/to/image/ImgName.jpg 200w,
// path/to/image/ImgName.jpg 400w,
// path/to/image/ImgName.jpg 600w,
// path/to/image/ImgName.jpg 800w
