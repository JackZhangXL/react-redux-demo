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

- container目录里的组件需要关心Redux

- component目录里的组件仅做展示用，不需要关心Redux

目录结构

![reactredux](../img/reactredux1.jpg)

[例子 react-redux](http://0.0.0.0:9999/reactredux.html)

[slide]

# <font color=#0099ff>react-redux包</font>

- ```<Provider store>```
- connect

[slide]

# <font color=#0099ff>```<Provider store>```</font>

- 将入口组件包进去（被包进的组件及子组件才能访问到Store，才能使用connect方法）

``` JavaScript
import { Provider } from 'react-redux';     // 引入 react-redux

……
render(
    <Provider store={store}>
        <Sample />
    </Provider>,
    document.getElementById('app'),
);
```

[slide]

# <font color=#0099ff>connect</font>

```
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
```

``` JavaScript
const mapStateToProps = (state) => {
    return {
        number: state.changeNumber.number,
        showAlert: state.toggleAlert.showAlert,
    };
};

const mapDispatchToProps = {
    incrementNum: action.number.incrementNum,
    decrementNum: action.number.decrementNum,
    clearNum: action.number.clearNum,
    toggleAlert: action.alert.toggleAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Sample);
```

[slide]

# <font color=#0099ff>mapStateToProps</font>

- connect方法的第一个参数mapStateToProps是一个function（负责输入）
- 作用是将Store里的state变成组件的props。当state更新时，会同步更新组件的props，触发组件的render方法
- function返回值是一个key-value的plain object

``` JavaScript
const mapStateToProps = (state) => {
    return {
        number: state.changeNumber.number,
        showAlert: state.toggleAlert.showAlert,
    };
};
```
- 如果mapStateToProps为空（即设成()=>({})），那Store里的任何更新就不会触发组件的render方法。

[slide]

# <font color=#0099ff>mapDispatchToProps</font>

- connect方法的第二个参数mapDispatchToProps可以是一个object也可以是一个function（负责输出）
- 作用是将Action creator绑定到组件的props上，这样组件就能派发Action，更新state了

[slide]

# <font color=#0099ff>object型mapDispatchToProps</font>

- 是一个key-value的plain object
- key是组件props
- value是一个Action creator

``` JavaScript
const mapDispatchToProps = {
    incrementNum: action.number.incrementNum,
    decrementNum: action.number.decrementNum,
    clearNum: action.number.clearNum,
    toggleAlert: action.alert.toggleAlert,
};
```
- 这样就能在组件中通过```this.props. incrementNum()```方式来dispatch Action出去
- 但为何不是```dispatch(this.props. incrementNum())```？？

[slide]

# <font color=#0099ff>function型mapDispatchToProps</font>

- 是一个function
- 参数是dispatch方法
- 返回值是object型mapDispatchToProps

``` JavaScript
import { bindActionCreators } from 'redux';

const mapDispatchToProps2 = (dispatch, ownProps) => {
    return {
        incrementNum: bindActionCreators(action.number.incrementNum, dispatch),
        decrementNum: bindActionCreators(action.number.decrementNum, dispatch),
        clearNum: bindActionCreators(action.number.clearNum, dispatch),
        toggleAlert: bindActionCreators(action.alert.toggleAlert, dispatch),
    };
};
```
- 解释了上一页的疑问。其实dispatch已经被封装进去了，因此你不必手动写dispatch了

