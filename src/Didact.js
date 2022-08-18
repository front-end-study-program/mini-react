// 第一步 实现 createElement
function createElement(type, props, ...children) {

  return {
    type,
    props: {
      ...props,
      children: children.map(child => typeof child === 'object' ? child : createTextElement(child))
    }
  }
}

function createTextElement(text) {

  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

// 第二步 实现 render
// function render(element, container) {
//   // 创建元素，如果是文本类型创建一个文本节点，否则是常规节点
//   const dom = element.type === 'TEXT_ELEMENT' 
//     ? document.createTextNode('')
//     : document.createElement(element.type)

//   // 挂载元素属性
//   const isProperty = key => key !== 'children'
//   Object.keys(element.props)
//     .filter(isProperty)
//     .forEach(name => {
//       dom[name] = element.props[name]
//     })
  
//   // 递归处理子节点
//   element.props.children.forEach(child => render(child, dom))

//   // 插入容器
//   container.appendChild(dom)
// }

// 改良版
function render(element, container) {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element]
    }
  }
}
function createDom(fiber) {
  const dom = element.type === 'TEXT_ELEMENT' 
    ? document.createTextNode('')
    : document.createElement(element.type)

  const isProperty = key => key !== 'children'
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })

  return dom
}

// 将渲染流程拆分为小单元
let nextUnitOfWork = null
function workLoop() {
  let shouldYield = false
  while(nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)
// 执行当前单元并返回下一次单元
function performUnitOfWork(fiber) {
  if(!fiber.dom) {
    // 创建 dom
    fiber.dom = createDom(fiber)
  }

  if(fiber.parent) {
    // 插入到父节点下
    fiber.parent.dom.appendChild(fiber.dom)
  }

  const elements = fiber.props.children
  let index = 0
  let prevSibling = null
  // 同层节点的挂载
  while(index < elements.length) {
    const element = elements[index]
    // 创建工作单元
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null
    }
    if(index === 0) {
      fiber.child = newFiber
    } else {
      // 兄弟节点
      prevSibling.sibling = newFiber
    }

    prevSibling = newFiber
    index++
  }
  
  if(fiber.child) {
    return fiber.child
  }

  // 查找下一个单元
  let nextFiber = fiber
  while(nextFiber) {
    if(nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}


const Didact = {
  createElement,
  render
}

// 当 babel 编译 jsx 时会根据下面的注释使用我们定义的函数。
/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)
// transform
// const element = Didact.createElement(
//   "div",
//   { id: "foo" },
//   Didact.createElement("a", null, "bar"),
//   Didact.createElement("b")
// )


const container = document.getElementById("root")
Didact.render(element, container)



