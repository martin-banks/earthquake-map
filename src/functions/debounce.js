/*
  Control function repetition
  Useful for controlling how often functions are called on window scroll or resize
*/
const frame = 16
function debounce (func, wait = frame, immediate = true) {
  if (!func) {
    console.error('Debounce requires a callback as the first parameter')
    return
  }
  let timeout = null
  return function() {
    const context = this
    const args = arguments
    const later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

export default debounce
