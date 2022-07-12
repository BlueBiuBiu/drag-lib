function drag(box) {
  box.style.left = 0;
  box.style.top = 0
  box.classList.add("sky-drag-box")
  const minWidth = 20; // 最小宽度
  const minHeight = 20; // 最小高度
  let canMove = true // 默认不移动
  let currentPageX, currentPageY, tempX = 0, tempY = 0;

  // 记录拖拽后所在的位置
  function FinalLocation() {
    tempX = parseInt(box.style.left.split("px")[0])
    tempY = parseInt(box.style.top.split("px")[0])
    canMove = false
    box.removeEventListener("mousemove", mouseMove)
  }

  function mouseDown(e) {
    currentPageX = e.pageX;
    currentPageY = e.pageY;
    box.style.left = tempX + "px"
    box.style.top = tempY + "px"
    canMove = true
    box.addEventListener("mousemove", mouseMove, false)
  }

  function mouseMove(e) {
    if(canMove) {
      box.style.left = tempX + e.pageX - currentPageX + "px"
      box.style.top = tempY + e.pageY - currentPageY + "px"
    }
  }

  box.addEventListener("mousedown",mouseDown, false)
  box.addEventListener("mouseup",FinalLocation, false)
  box.addEventListener("mouseleave", FinalLocation, false)

  // ---------------------------------------------------------
  // 是否达到限制的最小宽度与最小高度
  function isMin(width, height = box.offsetHeight, isScale = false) {
    if(width === "default") width = box.offsetWidth
    if(width > minWidth && height > minHeight) {
      const Wreg = /(?<=scale\()\d.*(?=,)/gi
      const Hreg = /(?<=,\s*)\d.*(?=\))/gi
      const beforeWidthRate = box.style.transform.match(Wreg) || ["1"]
      const beforeheightRate = box.style.transform.match(Hreg) || ["1"]
      wValue = width > box.offsetWidth ? 0.01 : -0.01
      hValue = height > box.offsetHeight ? 0.01 : -0.01
      // 只有四个角拉才会缩放（同时宽高缩放比例一样）
      isScale && wValue === hValue && (
        box.style.transform = `scale(
          ${beforeWidthRate[0] * 1 + wValue},
          ${beforeheightRate[0] * 1 + hValue}
        )`  
      )
      return true
    }
  }

  function scale(e1) {
    beforeWidth = box.offsetWidth
    beforeHeight = box.offsetHeight
    e1.stopPropagation()
    const wMouseMove = (e) => {
      const type = this.dataset.type
      switch (type) {
        case "left":
          const lWidth = box.offsetWidth + box.offsetLeft - e.pageX
          if(!isMin(lWidth)) break;
          box.style.width = lWidth + "px"
          box.style.left = parseInt(box.style.left.split("px")[0]) + e.pageX - box.offsetLeft + "px"
          break;
        case "top":
          const THeight = box.offsetHeight + box.offsetTop - e.pageY
          if(!isMin("default", THeight)) break;
          box.style.height = THeight + "px"
          box.style.top = parseInt(box.style.top.split("px")[0]) + e.pageY - box.offsetTop + "px"
        break;
        case "right":
          const RWidth = e.pageX - box.offsetLeft
          if(!isMin(RWidth)) break;
          box.style.width = RWidth + "px"
          box.style.left = parseInt(box.style.left.split("px")[0]) + e.pageX - box.offsetLeft - box.offsetWidth + "px"
        break;
        case "bottom":
          const BHeight = e.pageY - box.offsetTop
          if(!isMin("default", BHeight)) break;
          box.style.height = BHeight + "px"
          box.style.top = parseInt(box.style.top.split("px")[0]) + e.pageY - box.offsetTop - box.offsetHeight + "px"
        break;
        case "left_top":
          const LTWidth = box.offsetWidth + box.offsetLeft - e.pageX
          const LTHeight = box.offsetHeight + box.offsetTop - e.pageY
          if(!isMin(LTWidth, LTHeight, true)) break;
          box.style.width = LTWidth + "px"
          box.style.height = LTHeight + "px"
          box.style.top = parseInt(box.style.top.split("px")[0]) + e.pageY - box.offsetTop + "px"
          box.style.left = parseInt(box.style.left.split("px")[0]) + e.pageX - box.offsetLeft + "px"
        break;
        case "left_bottom":
          const LBWidth = box.offsetWidth + box.offsetLeft - e.pageX
          const LBHeight = e.pageY - box.offsetTop
          if(!isMin(LBWidth, LBHeight, true)) break;
          box.style.width = LBWidth + "px"
          box.style.height = LBHeight + "px"
          box.style.top = parseInt(box.style.top.split("px")[0]) + e.pageY - box.offsetTop - box.offsetHeight + "px"
          box.style.left = parseInt(box.style.left.split("px")[0]) + e.pageX - box.offsetLeft + "px"
        break;
        case "right_top":
          const RTWidth = e.pageX - box.offsetLeft
          const RTHeight = box.offsetHeight + box.offsetTop - e.pageY
          if(!isMin(RTWidth, RTHeight, true)) break;
          box.style.width = RTWidth + "px"
          box.style.height = RTHeight + "px"
          box.style.top = parseInt(box.style.top.split("px")[0]) + e.pageY - box.offsetTop + "px"
          box.style.left = parseInt(box.style.left.split("px")[0]) + e.pageX - box.offsetLeft - box.offsetWidth + "px"
        break;
        case "right_bottom":
          const RBWidth = e.pageX - box.offsetLeft
          const RBHeight = e.pageY - box.offsetTop
          if(!isMin(RBWidth, RBHeight, true)) break;
          box.style.width = e.pageX - box.offsetLeft + "px"
          box.style.height = e.pageY - box.offsetTop + "px"
          box.style.top = parseInt(box.style.top.split("px")[0]) + e.pageY - box.offsetTop - box.offsetHeight + "px"
          box.style.left = parseInt(box.style.left.split("px")[0]) + e.pageX - box.offsetLeft - box.offsetWidth + "px"
        break;
        default:
          break;
      }
    }

    const removeWMouseMove = (e) => {
      window.removeEventListener("mousemove", wMouseMove, false)
    }

    window.addEventListener("mousemove", wMouseMove, false)
    window.addEventListener("mouseup", removeWMouseMove, false)
    window.addEventListener("mouseleave", removeWMouseMove, false)
  }

  // 缩放的点
  const dots = ["left", "left_top", "top", "right_top", "right", "right_bottom", "bottom", "left_bottom"]
  for (const dot of dots) {
    const el = document.createElement("div")
    el.className = "dot " + dot
    el.dataset.type = dot
    el.addEventListener("mousedown", scale, false)
    box.appendChild(el)
  }
}

module.exports = drag