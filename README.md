# mini-react

跟着国外大佬的[代码思路](https://pomb.us/build-your-own-react/)一步一步跟着实现 mini 版本的 react

1. createElement 创建jsx对应的描述对象
2. createTextElement 创建文本节点的描述对象
3. createDom 创建真实的 dom 节点或者文本节点
4. updateDom 更新 dom 节点的属性
5. commitRoot 提交对整个树的处理
6. commitWork 提交对每个单元的处理
7. commitDeletion 提交对删除单元的处理
8. render 渲染函数
9. workLoop 根据浏览器空闲时间递归处理单元
10. performUnitOfWork 执行当前单元的处理并返回下一个要处理的单元
11. updateFunctionComponent 对函数组件单元的处理
12. useState 状态hook
13. updateHostComponent 对元素节点单元的处理
14. reconcileChildren 对当前单元子节点的处理
