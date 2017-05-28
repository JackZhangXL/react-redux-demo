title: Redux (2)
speaker: JackZhang
theme: dark
transition: move

[slide]

# Redux介绍
JackZhang

[slide]

# <font color=#0099ff>Part 1</font>

- 概述

- Action

- Reducer

- Store

# <font color=#0099ff>Part 2</font>

- 结合React

- 中间件

- 异步Action

[slide]

# <font color=#0099ff>Part 1 回顾</font>

- <font color=#0099ff>概述</font>

- <font color=#0099ff>Action</font>

- <font color=#0099ff>Reducer</font>

- <font color=#0099ff>Store</font>

[slide]

# <font color=#0099ff>三大原则</font>

- 单一数据源Store
- 只能通过分派Action来修改state
- 使用纯函数来执行修改state

[slide]

# <font color=#0099ff>初始态流转图</font>

![initRedux](../img/initRedux.jpg)

[slide]

# <font color=#0099ff>更新态流转图</font>

![doRedux](../img/doRedux.jpg)

[slide]

# <font color=#0099ff>什么是Action？</font>

描述已发生事件，能携带数据的<font color=#ff9933>plain object</font>

[slide]

# <font color=#0099ff>什么是Reducer？</font>

Reducer是个<font color=#ff9933>纯函数</font>，执行计算，返回新的state

（可用combineReducers将多个Reducer合并成一个Reducer）

[slide]

# <font color=#0099ff>什么是Store？</font>

由createStore创建，提供getState，dispatch，subscribe方法，内部存储数据state的仓库

[slide]

# <font color=#0099ff>Part 2</font>

- <font color=#ff9933>结合React</font>

- 中间件

- 异步Action

[slide]

# <font color=#0099ff>react-redux包</font>

- ```<Provider store>```
- connect

[slide]

# <font color=#0099ff>```<Provider store>```</font>


