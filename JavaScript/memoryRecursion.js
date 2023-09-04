// 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

function fibonacciWithMemo(n, memo = []) {
  // 如果已经计算过这个值，直接从 memo 中返回
  if (memo[n] !== undefined) return memo[n]

  // 基础情况
  if (n <= 1) return n
  // 递归计算并将结果存储到 memo 中
  memo[n] = fibonacciWithMemo(n - 1, memo) + fibonacciWithMemo(n - 2, memo)

  return memo[n]
}


// console.log(fibonacci(20))

console.log(fibonacciWithMemo(20))
