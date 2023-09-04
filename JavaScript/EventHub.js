class EventHub {
  constructor() {
    // 存储所有的事件及其对应的回调
    this.events = {}
  }

  // 注册事件监听器
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
    return this  // 支持链式调用
  }

  // 注册只触发一次的事件监听器
  once(event, callback) {
    const wrappedCallback = (...args) => {
      callback(...args)
      this.off(event, wrappedCallback)
    }
    return this.on(event, wrappedCallback)  // 利用 on 方法进行注册
  }

  // 在指定上下文中注册事件监听器
  bind(event, callback, context) {
    return this.on(event, callback.bind(context))
  }

  // 发射事件
  emit(event, ...args) {
    if (this.hasListener(event)) {
      new Promise((resolve, reject) => {
        const listeners = [...this.events[event]]
        for (let callback of listeners) {
          try {
            callback(...args)
          } catch (error) {
            // 如果 error 事件的监听器也出错，直接拒绝 Promise
            if (event === 'error') {
              reject(error)
              return
            } else {
              this.emit('error', error)
            }
          }
        }
        resolve()
      })
          .catch(error => {
            console.error('Error in emit method:', error)
          })
    }
    return this
  }

  // 移除事件监听器
  off(event, callback) {
    if (this.hasListener(event)) {
      this.events[event] = this.events[event].filter(cb => cb !== callback)
    }
    return this
  }

  // 检查指定事件是否有监听器
  hasListener(event) {
    return this.events[event] && this.events[event].length > 0
  }

  // 获取所有已注册的事件类型
  getEventTypes() {
    return Object.keys(this.events)
  }
}

//  使用示例
// 1. 获取 EventHub 的实例
const eventHub = new EventHub()

// 2. 注册事件监听器
eventHub.on('data', data => {
  console.log(data)
  throw new Error('Sample error from data listener')
})

eventHub.once('data', data => {
  console.log(`Once: ${data}`)
})

const errorCallback = error => {
  console.log(`Error: ${error.message}`)
}
eventHub.on('error', errorCallback)

const user = {
  name: 'Alice',
  showName() {
    console.log(`Hello, my name is ${this.name}`)
  }
}
eventHub.bind('showName', user.showName, user)

// 3. 发射事件
console.log('Before emit')
eventHub.emit('data', 'Some data')
eventHub.emit('showName')
console.log('After emit')

// 4. 移除事件监听器
eventHub.off('error', errorCallback)

// 5. 检查是否有监听器
console.log('Has data listener:', eventHub.hasListener('data'))  // true
console.log('Has error listener:', eventHub.hasListener('error'))  // false

// 6. 获取所有的事件类型
console.log('Event types:', eventHub.getEventTypes())  // ['data', 'error', 'showName']

