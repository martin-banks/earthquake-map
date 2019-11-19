let ticks = 0
let diff = 0
const duration = 20
let target = 0
const offset = 80
const delay = 300

function scrollBy () {
  window.scrollBy(0, diff)
  ticks ++
  if (ticks === duration) {
    ticks = 0
    if (this.el.scrollIntoView) {
      this.el.scrollIntoView()
      window.scrollBy(0, 0 - offset)
    }
    return
  }
  window.requestAnimationFrame(scrollBy.bind({ el: this.el }))
}

function scrollToTop () {
  setTimeout(() => {
    target = this.el.getBoundingClientRect().top - offset
    diff = (target) / duration
    scrollBy.bind({ el: this.el })()
  }, delay)
}

export default {
  // bind (el, binding, vnode) {},
  update (el, binding, vnode) {
    const { value } = binding
    if (!value) return
    scrollToTop.bind({ el })()
  },
}
