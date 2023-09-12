/**
 * 确定小数点位置：首先，找到两个数中的最大小数位数。例如，对于 0.123 和 0.12345，最大小数位数是5。
 * 转换为整数：将两个数乘以相应的10的幂，使它们变为整数。在上面的例子中，我们会乘以 105105，得到 12300 和 12345。
 * 整数相加：使用你提供的 bigNumberAddition 函数或类似的方法来加这两个整数。
 * 转回小数：将结果除以之前的10的幂（在这个例子中是 105105）得到小数结果。
 *
 * @param num1
 * @param num2
 * @return {string}
 */
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

/**
 * 小数相加，复用字符串相加逻辑
 * @param num1
 * @param num2
 * @return {string}
 */
function bigDecimalAddition(num1, num2) {
  // 分离整数和小数部分
  let [intPart1, decimalPart1 = ''] = num1.split('.')
  let [intPart2, decimalPart2 = ''] = num2.split('.')

  // 找到最大的小数位数
  const maxDecimalLength = Math.max(decimalPart1.length, decimalPart2.length)

  // 将小数转换为整数
  const intNum1 = intPart1 + decimalPart1.padEnd(maxDecimalLength, '0')
  const intNum2 = intPart2 + decimalPart2.padEnd(maxDecimalLength, '0')

  // 整数相加
  const sum = bigNumberAddition(intNum1, intNum2)

  // 如果没有小数部分，直接返回
  if (maxDecimalLength === 0) return sum

  // 否则，将结果分为整数部分和小数部分
  const resultIntPart = sum.slice(0, -maxDecimalLength) || '0'
  const resultDecimalPart = sum.slice(-maxDecimalLength)

  return `${resultIntPart}.${resultDecimalPart}`
}

// Test
const decimalA = '123.456'
const decimalB = '789.012'
const decimalSum = bigDecimalAddition(decimalA, decimalB)
console.log(decimalSum)
