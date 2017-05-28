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

# <font color=#0099ff>Part 2</font>

- 结合React

- 中间件

- 异步Action

[slide]

# <font color=#0099ff>Part 1</font>

- <font color=#ff9933>概述</font>

- Action

- Reducer

- Store

[slide]

# <font color=#0099ff>Why Redux？</font>

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


- 首次执行Redux时，需要给state一个初始值

- Reducer每次更新状态时需要一个新的state，因此不要直接修改旧的state参数，而是将旧state参数复制一份，在副本上修改值，返回这个副本

```JavaScript 
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

目录结构

![reduxCombineReducer](../img/reduxReducer3.jpg)

[例子 CombineReducer](http://0.0.0.0:9999/originreduxcombinereducer.html)

[slide]

# <font color=#0099ff>Part 1</font>

- <font color=#0099ff>概述</font>

- <font color=#0099ff>Action</font>

- <font color=#0099ff>Reducer</font>

- <font color=#ff9933>Store</font>

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

# THE END

### THANK YOU
