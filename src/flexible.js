const { throttle } = require("./utils.js")

function enhance(box) {
  let tempBox = box
  let width = window.innerWidth
  let height = window.innerHeight
  tempBox.style.width = width + "px"
  tempBox.style.height = height + "px"

  function resize() {
    width = window.innerWidth
    height = window.innerHeight
    tempBox.style.width = width + "px"
    tempBox.style.height = height + "px"
    // 1080/1920 = 0.5625
    if(window.screen.height / window.screen.width === 0.5625) {
      height = width * 0.5625
    } else {
      if(height / width < 0.5625) {
        width = height / 0.5625
      } else {
        height = width / 0.5625
      }
    }
    if(width <= 1024) {
      width = 1024
      height = 576
    }
    tempBox.style.transform = `scale(
      ${width / window.screen.width},
      ${height / window.screen.height}
    )`
    window.location.reload()
  }

  window.addEventListener("resize", throttle(resize, 3000))
}


module.exports = enhance