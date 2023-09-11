function bigNumberAddition(num1, num2) {
  let carry = 0
  let result = []

  const length = Math.max(num1.length, num2.length)
  num1 = num1.padStart(length, '0')
  num2 = num2.padStart(length, '0')

  for (let i = length - 1; i >= 0; i--) {
    let tempSum = parseInt(num1[i]) + parseInt(num2[i]) + carry
    result.unshift(tempSum % 10)
    carry = Math.floor(tempSum / 10)
  }

  if (carry) {
    result.unshift(carry)
  }

  return result.join('')
}

function bigDecimalAddition(num1, num2) {
  const parts1 = num1.split('.')
  const parts2 = num2.split('.')

  const intPart1 = parts1[0]
  const intPart2 = parts2[0]

  const fracPart1 = parts1[1] || ''
  const fracPart2 = parts2[1] || ''

  const maxFracLength = Math.max(fracPart1.length, fracPart2.length)
  const adjustedFrac1 = fracPart1.padEnd(maxFracLength, '0')
  const adjustedFrac2 = fracPart2.padEnd(maxFracLength, '0')

  const fracSum = bigNumberAddition(adjustedFrac1, adjustedFrac2)

  let carry = 0
  let finalFrac = fracSum
  if (fracSum.length > maxFracLength) {
    carry = 1
    finalFrac = fracSum.slice(1)
  }

  const intSum = bigNumberAddition(
      String(Number(intPart1) + carry),
      intPart2
  )

  return `${intSum}.${finalFrac}`
}

// Test
const decimalA = '123.456'
const decimalB = '789.012'
const decimalSum = bigDecimalAddition(decimalA, decimalB)
console.log(decimalSum)
