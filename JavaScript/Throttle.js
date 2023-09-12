function throttle(func, limit) {
  let inThrottle
  let lastFunc
  let lastRan

  return function () {
    const context = this
    const args = arguments

    if (!inThrottle) {
      func.apply(context, args)
      lastRan = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function () {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}

// 节流
const throttledFunction = throttle(() => {
  console.log('Throttled function executed!')
}, 2000)

window.addEventListener('scroll', throttledFunction)
