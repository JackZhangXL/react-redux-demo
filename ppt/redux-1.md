title: Redux (1)
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

- 结合React（用法）

# <font color=#0099ff>Part 2</font>

- 结合React（原理）

- 中间件

- 异步Action

[slide]

# <font color=#0099ff>Part 1</font>

- <font color=#ff9933>概述</font>

- Action

- Reducer

- Store

- 结合React（用法）

[slide]

# <font color=#0099ff>Why Flux？</font>

传统 MVC 框架

![initRedux](../img/mvc.jpeg)

[slide]

# <font color=#0099ff>Why Flux？</font>

最终几乎肯定失控

![initRedux](../img/mvc2.jpeg)

[slide]

# <font color=#0099ff>Why Flux？</font>

单向数据流（禁止 view 直接对话 modal）

![initRedux](../img/mvc3.png)

[slide]

# <font color=#0099ff>Why Redux？</font>

Redux 是 Flux 的一种实现

替你管理难以维护的state

让state的变化可控

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

![initRedux](../img/initRedux.jpg)

[例子 originRedux](http://0.0.0.0:9999/originredux.html)

[slide]

# <font color=#0099ff>Part 1</font>

- <font color=#0099ff>概述</font>

- <font color=#ff9933>Action</font>

- Reducer

- Store

- 结合React（用法）

[slide]

# <font color=#0099ff>什么是Action？</font>

描述已发生事件，能携带数据的<font color=#ff9933>plain object</font>

[slide]

# <font color=#0099ff>Action的作用</font>

- 告诉Reducer发生了什么事
- 携带数据

[slide]

# <font color=#0099ff>典型的Action</font>

- 必须有type属性，用于告知Reducer发生了什么事

``` JavaScript
// 例1
{
  type: 'ADD_TODO',
  payload: {
    text: 'Do something.'  
  }
}

// 例2
{
  type: 'ADD_TODO',
  payload: new Error(),
  error: true
}
```

[slide]

# <font color=#0099ff>Action Creator</font>

创建Action的函数

``` JavaScript
// 太麻烦，不好维护
store.dispatch({
   type: constant.INCREMENT,
});

/*************/

// Action Creator
const incrementNum = () => ({
    type: constant.INCREMENT,
});

store.dispatch(incrementNum());
```
[slide]

目录结构

![reduxAction](../img/reduxAction2.jpg)

[例子 Action](http://0.0.0.0:9999/originreduxaction.html)

[slide]

# <font color=#0099ff>Part 1</font>

- <font color=#0099ff>概述</font>

- <font color=#0099ff>Action</font>

- <font color=#ff9933>Reducer</font>

- Store

- 结合React（用法）

[slide]

# <font color=#0099ff>什么是Reducer？</font>

Reducer是个<font color=#ff9933>纯函数</font>，执行计算，返回新的state

[slide]

# <font color=#0099ff>Reducer的作用</font>

- 返回计算后的新的state

- 参数：旧的state和Action

- 返回值：新的state

```JavaScript 
(state, action) => newState
```

[slide]

# <font color=#0099ff>两个注意点</font>


- 首次执行Redux时，需要给state一个初始值（初始化时，Redux会自动执行一次Reducer，此时state是undefined，我们应该初始化state）

- Reducer每次更新状态时需要一个新的state，因此不要直接修改旧的state参数，而是将旧state参数复制一份，在副本上修改值，返回这个副本

```JavaScript 
if (typeof state === 'undefined') {
    return initialState
}
  
...
return {
    ...state,
    // 更新state中的值
};
```

[slide]

目录结构

![reduxReducer](../img/reduxReducer1.jpg)

[例子 Reducer](http://0.0.0.0:9999/originreduxreducer.html)

[slide]

# <font color=#0099ff>Reducer Creator</font>

- 取代switch-case，将default封装在函数内

```JavaScript 
export const createReducer = (initialState, handlers) => {
    return (state = initialState, action) => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    }
};
```

[slide]

# <font color=#0099ff>如何切分业务数据？</font>

- 用combineReducers将多个Reducer合并成一个Reducer

```JavaScript 
combineReducers({
    myReducer1,
    myReducer2,
});
```

[slide]

# <font color=#0099ff>源代码</font>

```JavaScript 
export const combineReducers = (reducers) => {
    const finalReducerKeys = Object.keys(reducers);
    return (state = {}, action) => {
        let hasChanged = false;
        const nextState = {};
        for (let i = 0; i < finalReducerKeys.length; i++) {
            const key = finalReducerKeys[i];
            const reducer = reducers[key];
            const previousStateForKey = state[key];
            const nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        return hasChanged ? nextState : state;
    };
};
```

[slide]

目录结构

![reduxCombineReducer](../img/reduxReducer3.jpg)

[例子 CombineReducer](http://0.0.0.0:9999/originreduxcombinereducer.html)

[slide]

# <font color=#0099ff>Part 1</font>

- <font color=#0099ff>概述</font>

- <font color=#0099ff>Action</font>

- <font color=#0099ff>Reducer</font>

- <font color=#ff9933>Store</font>

- 结合React（用法）

[slide]

# <font color=#0099ff>什么是Store？</font>

由createStore创建，提供getState，dispatch，subscribe方法，内部存储数据state的仓库

[slide]

# <font color=#0099ff>创建Store</font>

``` JavaScript
createStore(reducer, [initialState], [enhancer])
```

- 可选参数initialState用于初始化state

- 可选参数enhancer是一个高阶函数，用于增强Store

``` JavaScript
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

const logger = createLogger();
const store = createStore(reducer, compose(
    applyMiddleware(logger),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f,
));
```

[slide]

# <font color=#0099ff>getState()</font>

- 获取Store里存储的state

``` JavaScript
store.getState().changeNumber.number
```

[slide]

# <font color=#0099ff>dispatch(action)</font>

- 派发Action，通知Reducer去更新state

``` JavaScript
store.dispatch(actions.number.incrementNum());
```

[slide]

# <font color=#0099ff>subscribe(listener)</font>

- 注册回调函数，当state发生变化时，会自动触发回调函数

``` JavaScript
const update = () => {
    // 更新 view
};

store.subscribe(update);
```

- 该方法的返回值也是一个函数对象，调用后可以取消注册的回调函数

``` JavaScript
const update = () => {
    // 更新 view
};

const cancelUpdate = store.subscribe(update);

<Button onClick={cancelUpdate}>unsubscribe</Button>
```

[slide]

# <font color=#0099ff>简易版createStore</font>

``` JavaScript
export const createStore = (reducer) => {
    let state = {};
    const listeners = [];
    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    };
    const subscribe = (listener) => listeners.push(listener);

    return {
        getState,
        dispatch,
        subscribe,
    };
};
```

[slide]

[例子 Store](http://0.0.0.0:9999/originreduxstore.html)

[slide]

# <font color=#0099ff>Part 1</font>

- <font color=#0099ff>概述</font>

- <font color=#0099ff>Action</font>

- <font color=#0099ff>Reducer</font>

- <font color=#0099ff>Store</font>

- <font color=#ff9933>结合React（用法）</font>

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
- 作用是将```dispatch(action)```绑定到组件的props上，这样组件就能派发Action，更新state了

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
- 这样就能在组件中通过```this.props.incrementNum()```方式来dispatch Action出去
- 但为何不是```dispatch(this.props.incrementNum())```？？

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

[slide]

# <font color=#0099ff>mergeProps</font>

- 经过conncet的组件的props有3个来源：
- 1.由mapStateToProps将state映射成的props
- 2.由mapDispatchToProps将Action creator映射成的props
- 3.组件自身的props。

mergeProps的参数分别对应了上面3个来源，作用是整合这些props

（例如过滤掉不需要的props，重新组织props，根据ownProps绑定不同的stateProps和dispatchProps等）

[slide]

例如过滤掉不需要的props：

``` JavaScript
const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...ownProps,
        ...stateProps,
        incrementNum: dispatchProps.incrementNum,	// 只输出incrementNum
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(Sample);
```

[slide]

例如重新组织props：

``` JavaScript
const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...ownProps,
        state: stateProps,
        actions: {
            ...dispatchProps,
            ...ownProps.actions,
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(Sample);
```

[slide]

# <font color=#0099ff>总结</font>

- react-redux一共就一个组件和一个API：

- ```<Provider store>```用于包裹React组件，被包裹的组件可以使用connect方法。

- conncet方法用于将组件绑定Redux。第一个参数负责输入，将state映射成组件props。第二个参数负责输出，将Action Creator映射成组件props。第三个参数用于整合props。第四个参数可以做一些优化，具体见官网。

[slide]

# THE END

### THANK YOU
