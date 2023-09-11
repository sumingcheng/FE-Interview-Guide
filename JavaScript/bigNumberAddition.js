function bigNumberAddition(num1, num2) {
  let carry = 0  // 初始化进位
  let result = []

  // 使两个数字字符串长度相同
  const length = Math.max(num1.length, num2.length)
  num1 = num1.padStart(length, '0')
  num2 = num2.padStart(length, '0')

  // 从低位到高位进行相加
  for (let i = length - 1; i >= 0; i--) {
    let tempSum = parseInt(num1[i]) + parseInt(num2[i]) + carry
    result.unshift(tempSum % 10)  // 取模得到当前位
    console.log(result)
    carry = Math.floor(tempSum / 10)  // 取整得到进位
  }

  // 如果最后仍有进位，添加到结果前面
  if (carry) {
    result.unshift(carry)
  }

  return result.join('')
}

// 测试
const numA = '99'
const numB = '99'
const sum = bigNumberAddition(numA, numB)
console.log(sum)
