// WARNING!!
// This import function will import all images, regardless of whether they are used or not
// be sure to move unused images to a different location

function importAllImages (req) {
  const images = {}
  req.keys()
    .forEach(item => {
      const imageName = item
        .replace('./', '')
        .replace(/\.js|\.jpg|\.png/g, '')
      images[imageName] = req(item)
    })
  return images
}

export default importAllImages

/*
// example calling
// path to images / recursive through folders / file type
const allImages = importAllImages(require.context('../path/to/images', false, /\.jpg$/))

// creates an object of images, each accessible by it's file name

// so for the structure:
// images_folder
// 	|_ image_1.jpg
// 	|_ image_2.jpg
// 	|_ image_3.jpg
// 	|_ image_4.jpg

access the first image:
// allImages.image_1

*/
