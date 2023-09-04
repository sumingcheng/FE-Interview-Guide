function add(x, y) {
  return x + y
}

// 柯里化版本
function curriedAdd(x) {
  return function (y) {
    return x + y
  }
}

// 使用 你首先传入第一个参数，并得到一个新函数，然后传入第二个参数：
const add5 = curriedAdd(5)
const result = add5(3)
console.log(result)

