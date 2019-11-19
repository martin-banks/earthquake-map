// Custom directive for adding brightcove video element to Vue component
// Requires an id passwd in as a bound value eg:
// * const movieId = 'abc-123...'
// * <div v-brightcove="movieid" />
// Where movie ID is the brightcove / origin id from Kurator

export default {
  bind (el, binding, vnode) {
    const { value: id } = binding
    // Checks for any previously created video elements witht the same data-braoghtcove att
    // and remove that attr - prevents trailers doubling up in first item found
    // doesn't effect pre-loaded trailers as only required as a target to render player
    ;[...document.querySelectorAll(`[data-brightcove="${id}"]`)].forEach(domEl => {
      domEl.setAttribute('data-brightcove', null)
    })

    // Create new player element
    el.innerHTML = `<div data-brightcove="${id}"></div>`
    setTimeout(() => {
      window._vms = window._vms || []
      window._vms.push({
        embedCode: id,
        target: `[data-brightcove="${id}"]`,
        callback () {
          console.log(`video ${id} initalised`)
        }
      })
    }, 0)
  }
}
