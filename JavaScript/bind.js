Function.prototype._bind = function (context, ...args) {
  // 不是函数则抛出错误
  if (typeof this !== 'function') {
    // 抛出错误：尝试绑定的不是一个可调用的对象
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable')
  }

  // 保存调用 _bind 的函数引用
  const originalFunction = this

  // 生成一个唯一的临时键，用于临时关联上下文和函数
  const tempKey = `__tempFunctionKey_${Math.random().toString(36).slice(2)}__`

  // 在指定的上下文中执行原始函数，并返回结果
  function executeInContext(context, ...args) {
    context[tempKey] = originalFunction   // 将原始函数临时关联到指定的上下文
    const result = context[tempKey](...args)  // 调用函数并获取结果
    delete context[tempKey]  // 删除临时关联
    return result  // 返回调用结果
  }

  // 设置绑定函数的原型以确保它可以访问原始函数的原型
  function setPrototype(targetFunction) {
    function BoundPrototype() {
    }  // 创建一个空的构造函数
    BoundPrototype.prototype = originalFunction.prototype  // 设置构造函数的原型为原始函数的原型
    targetFunction.prototype = new BoundPrototype()  // 创建一个新的原型对象并赋值给目标函数
  }

  // 绑定函数的实现
  function boundFunction(...innerArgs) {
    const isNewInstance = this instanceof boundFunction  // 检查是否使用 new 操作符调用绑定函数
    const thisContext = isNewInstance ? this : context  // 根据是否使用 new 操作符选择上下文

    const result = executeInContext(thisContext, ...args.concat(innerArgs))  // 在正确的上下文中执行原始函数

    // 如果使用 new 操作符并且返回值不是对象，则返回新创建的实例
    return (isNewInstance && (typeof result !== 'object' || result === null)) ? this : result
  }

  // 设置绑定函数的原型
  setPrototype(boundFunction)

  // 返回绑定函数
  return boundFunction
}

const obj ={
  name: '123123'
}

function testFunction() {
  console.log('This is a test function.')
  console.log(this)
}

const boundFunction = testFunction._bind(obj)

console.log(boundFunction === testFunction) // 这将输出 true
