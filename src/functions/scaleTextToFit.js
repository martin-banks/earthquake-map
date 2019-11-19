const minSize = 2
const inc = 2

export default function (parent) {
  let fontSize = minSize
  let parentWidth = parent.offsetWidth
  let tick = 0
  const items = [...parent.querySelectorAll('[data-scaletext]')]
  if (!parentWidth) return

  function increaseSize (item) {
    const itemWidth = item.offsetWidth
    if (!itemWidth) return

    fontSize = inc + fontSize
    item.style.fontSize = `${fontSize}px`
    item.style.letterSpacing = `-${fontSize * 0.03}px`
    tick++
    if (tick > 200) {
      console.log({ itemWidth, parentWidth, fontSize })
      return
    }
    if (((itemWidth * 1.2) >= parentWidth)) {
      return
    }
    increaseSize(item)
  }

  items.forEach(item => {
    if (!item.innerText.length) return
    item.style.fontSize = `${minSize}px`
    increaseSize(item)
  })
}
