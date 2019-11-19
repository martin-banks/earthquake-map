import imagesLoaded from 'imagesloaded'

// Once the image has finished loading it will fade it
// Offers more graceful image loading
// should be used in conjunction with placeholder or background

function removeSpinner (spinner) {
  const fadeTime = 300

  spinner.style.transition = `opacity ${fadeTime}ms`
  spinner.style.background = 'none'
  spinner.style.opacity = 0
  setTimeout(() => {
    spinner.parentNode.removeChild(spinner)
  }, fadeTime)
}

export default {
  bind (el, binding, vnode) {
    el.style.opacity = 0
    el.style.transition = 'opacity 1s'
    // imagesLoaded(el, { background: true }, () => {
    //   el.style.opacity = 1
    // })

    const imgLoad = imagesLoaded(el, { background: true })
    imgLoad.on('fail', () => {
      const parent = el.parentElement
      const spinner = parent.querySelector('[data-spinner]')
      console.error('Image missing for:', el)
      if (spinner) {
        removeSpinner(spinner)
      }
    })
    imgLoad.on('done', () => {
      const spinner = el.parentElement.querySelector('[data-spinner]')
      if (spinner) {
        removeSpinner(spinner)
      }
      el.style.opacity = 1
    })
  },
}
