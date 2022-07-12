const { throttle } = require("./utils.js")

function resize(box) {
  let width = window.innerWidth
  let height = window.innerHeight
  box.style.width = width + "px"
  box.style.height = height + "px"
  window.addEventListener("resize", throttle(resize, 300))

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
  box.style.transform = `scale(
    ${width / window.screen.width},
    ${height / window.screen.height}
  )`
}

module.exports = resize