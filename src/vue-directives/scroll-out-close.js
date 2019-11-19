
// For use with interactives that reveal additional content on a user action
// where that content should be removed if the user scrolls that content out
// of the viewport.
// A 'close' event will be emitted, the component using this directive should
// have an event listener for 'close' event

export default {
  bind (el, binding, vnode) {
    function handleEndOfScroll () {
      let scrollTimer = null
      setTimeout(() => {
        if (!el.getBoundingClientRect) return
        if (scrollTimer) {
          clearTimeout(scrollTimer)
        }
        scrollTimer = setTimeout(() => {
          const { top, height } = el.getBoundingClientRect()
          if (top + (height * 0.8) < 0 || (top * 0.8) > window.innerHeight) {
            // vnode.context.$emit('close') // not working?
            window.removeEventListener('scroll', handleEndOfScroll)
            binding.value()
          }
        }, 150)
      })
    }
    window.addEventListener('scroll',handleEndOfScroll)
  },
}
