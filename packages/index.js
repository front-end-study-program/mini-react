
// <h1 title="foo">hello</h1>
// jsx -> js对象来描述
const element = {
  type: 'h1', // 标签
  props: {
    title: 'foo',
    children: 'hello'
  }
}

// ReactDOM.render(element, container) -> 具体 js 代码
const container = document.createElement('root')
// 创建自身节点
const node = document.createElement(element.type)
node['title'] = element.props.title
// 创建孩子节点
const text = document.createTextNode('')
text['nodeValue'] = element.props.children
node.appendChild(text)
// 渲染到容器节点上
container.appendChild(node)