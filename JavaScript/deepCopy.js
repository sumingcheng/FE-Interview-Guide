function deepClone(obj) {
  const visited = new WeakMap()

  function getClonedObject(currentObj) {
    const type = Object.prototype.toString.call(currentObj)
    switch (type) {
      case '[object Array]':
        return []
      case '[object Date]':
        return new Date(currentObj)
      case '[object RegExp]':
        return new RegExp(currentObj)
      case '[object Set]':
        return new Set()
      case '[object Map]':
        return new Map()
      case '[object Function]':
        return function () {
          return currentObj.apply(this, arguments)
        }
      case '[object Error]':
        return new Error(currentObj.message)
      default:
        return Object.create(Object.getPrototypeOf(currentObj))
    }
  }

  function _clone(currentObj) {
    if (currentObj === null || typeof currentObj !== 'object') return currentObj

    if (visited.has(currentObj)) return visited.get(currentObj)

    const clonedObject = getClonedObject(currentObj)

    visited.set(currentObj, clonedObject)

    if (currentObj instanceof Set) {
      for (let value of currentObj) {
        clonedObject.add(_clone(value))
      }
    } else if (currentObj instanceof Map) {
      for (let [key, value] of currentObj) {
        clonedObject.set(_clone(key), _clone(value))
      }
    } else {
      _copyProperties(currentObj, clonedObject)
    }

    return clonedObject
  }

  function _copyProperties(source, target) {
    const allKeys = [...Object.getOwnPropertyNames(source), ...Object.getOwnPropertySymbols(source)]
    for (let key of allKeys) {
      let descriptor = Object.getOwnPropertyDescriptor(source, key)
      if (descriptor.enumerable && !descriptor.get && !descriptor.set) {
        target[key] = _clone(source[key])
      } else {
        if (descriptor.value) descriptor.value = _clone(descriptor.value)
        Object.defineProperty(target, key, descriptor)
      }
    }
  }

  return _clone(obj)
}

// 使用示例
const originalObject = {
  number: 123,
  string: 'Hello World',
  bool: true,
  nullValue: null,
  undefinedValue: undefined,
  date: new Date(),
  regexp: /test/g,
  array: [1, 2, 3],
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
  symbol: Symbol('test'),
  nestedObject: {
    number: 456,
    string: 'Nested Hello World'
  },
  func: function () {
    return 'I\'m a function'
  },
  arrowFunction: () => 'I\'m an arrow function'
}

// 创建循环引用
originalObject.self = originalObject
originalObject.nestedObject.parent = originalObject

const clonedObject = deepClone(originalObject)

// 一些测试断言：
console.log(clonedObject !== originalObject)  // true
console.log(clonedObject.self !== originalObject.self)  // true
console.log(clonedObject.nestedObject.parent !== originalObject.nestedObject.parent)  // true
console.log(clonedObject.array !== originalObject.array)  // true
console.log(clonedObject.func() === originalObject.func())  // true
console.log(clonedObject.arrowFunction() === originalObject.arrowFunction())  // true
console.log(clonedObject.date.getTime() === originalObject.date.getTime())  // true
console.log(clonedObject.regexp.source === originalObject.regexp.source)  // true

