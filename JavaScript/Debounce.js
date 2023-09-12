function debounce(func, wait, immediate = false) {
  let timeout;

  return function executedFunction(...args) {
    const context = this;

    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

// 防抖
const debouncedFunction = debounce(() => {
  console.log('Debounced function executed!');
}, 500);

window.addEventListener('scroll', debouncedFunction);
