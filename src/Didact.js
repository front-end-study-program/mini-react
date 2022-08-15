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
function render(element, container) {
  // 创建元素，如果是文本类型创建一个文本节点，否则是常规节点
  const dom = element.type === 'TEXT_ELEMENT' 
    ? document.createTextNode('')
    : document.createElement(element.type)

  // 挂载元素属性
  const isProperty = key => key !== 'children'
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })
  
  // 递归处理子节点
  element.props.children.forEach(child => render(child, dom))

  // 插入容器
  container.appendChild(dom)
}


const Didact = {
  createElement,
  render
}

// 当 babel 编译 jsx 时会根据下面的注释使用我们定义的函数。
/** @jsx Didact.createElement */
// const element = (
//   <div id="foo">
//     <a>bar</a>
//     <b />
//   </div>
// )
// transform
// const element = Didact.createElement(
//   "div",
//   { id: "foo" },
//   Didact.createElement("a", null, "bar"),
//   Didact.createElement("b")
// )


const container = document.getElementById("root")
Didact.render(element, container)



