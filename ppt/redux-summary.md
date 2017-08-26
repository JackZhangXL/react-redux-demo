title: Redux Summary
speaker: JackZhang
theme: dark
transition: move

[slide]

# Redux介绍
JackZhang

[slide]

# <font color=#0099ff>目录</font>

- <font color=#ff9933>概述</font>

- Action

- Reducer

- Store

- 结合React

- 中间件

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

# <font color=#0099ff>目录</font>

- <font color=#0099ff>概述</font>

- <font color=#ff9933>Action</font>

- Reducer

- Store

- 结合React

- 中间件

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

# <font color=#0099ff>目录</font>

- <font color=#0099ff>概述</font>

- <font color=#0099ff>Action</font>

- <font color=#ff9933>Reducer</font>

- Store

- 结合React

- 中间件

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

目录结构

![reduxCombineReducer](../img/reduxReducer3.jpg)

[例子 CombineReducer](http://0.0.0.0:9999/originreduxcombinereducer.html)

[slide]

# <font color=#0099ff>目录</font>

- <font color=#0099ff>概述</font>

- <font color=#0099ff>Action</font>

- <font color=#0099ff>Reducer</font>

- <font color=#ff9933>Store</font>

- 结合React

- 中间件

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

# <font color=#0099ff>目录</font>

- <font color=#0099ff>概述</font>

- <font color=#0099ff>Action</font>

- <font color=#0099ff>Reducer</font>

- <font color=#0099ff>Store</font>

- <font color=#ff9933>结合React</font>

- 中间件

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

# <font color=#0099ff>react-redux的实现原理</font>

- React里有个全局变量context，可用将组件间共享的数据放到context里

- 优点是：所有组件都可以随时访问到context里共享的值，免去了数据层层传递的麻烦

- 缺点是：全局变量意味着所有人都可以随意修改它，导致不可控。而且和React组件化设计思想不符合

[slide]

# <font color=#0099ff>context能和react-redux完美结合</font>

- Redux设计思想就是单一数据源，集中维护state。（context天生就是唯一数据源）

- Redux设计思想就是不允许随意修改state，这样数据存到context里，也无法随意修改数据

- context成了一个可控的唯一的全局变量，完美！

[slide]

# <font color=#0099ff>Provider组件的实现原理</font>

- 将store保存进context，让子组件可以访问到context里的Store

``` JavaScript
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Provider extends Component {
    static contextTypes = {
        store: PropTypes.object,
        children: PropTypes.any,
    };

    static childContextTypes = {
        store: PropTypes.object,
    };

    getChildContext = () => {
        return { store: this.props.store, };
    };

    render() {
        return (<div>{this.props.children}</div>);
    }
}
```

[slide]

# <font color=#0099ff>connect高阶组件目的</font>

- 被```<Provider store>```包裹的子组件能访问到context里的store

``` JavaScript
export class myComponent extends Component {
    ...
    static contextTypes = {
        store: PropTypes.object
    }
    ...
}
```

- 但这样每个组件里都要写上述代码太麻烦了，用HOC高阶组件来消除重复代码

[slide]

# <font color=#0099ff>connect高阶组件示意图</font>

<div margin="auto">
    <img src="../img/reactredux2.jpg" width="750px" height="435px" />
</div>

[slide]

# <font color=#0099ff>connect高阶组件实现一</font>

- 第一步：内部封装掉了每个组件都要写的访问context的代码

``` JavaScript
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const connect = (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object,
        };

        render() {
            return (<WrappedComponent />);
        }
    }

    return Connect;
};

export default connect;
```

[slide]

# <font color=#0099ff>connect高阶组件实现二</font>

- 第二步：封装掉subscribe，当store变化，刷新组件的props，触发组件的render方法

``` JavaScript
const connect = (WrappedComponent) => {
    class Connect extends Component {
        ...
        constructor() {
            super();
            this.state = { allProps: {} }
        }

        componentWillMount() {
            const { store } = this.context;
            this._updateProps();
            store.subscribe(this._updateProps);
        }

        _updateProps = () => {
            this.setState({
                allProps: {
                    // TBD
                    ...this.props,
                }
            });
        };

        render() {
            return (<WrappedComponent {...this.state.allProps} />);
        }
    }

    return Connect;
};
```

[slide]

# <font color=#0099ff>connect高阶组件实现三</font>

- 第三步：参数mapStateToProps封装掉组件从context中取Store的代码

``` JavaScript
export const connect = (mapStateToProps) => (WrappedComponent) => {
    class Connect extends Component {
        ...
        _updateProps () {
            const { store } = this.context
            let stateProps = mapStateToProps(store.getState());
            this.setState({
                allProps: {
                    ...stateProps,
                    ...this.props
                }
            })  
        }
        ...
    }
    
    return Connect
}
```

[slide]

# <font color=#0099ff>connect高阶组件实现四</font>

- 第四步：参数mapDispatchToProps封装掉组件往context里更新Store的代码

``` JavaScript
export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends Component {
        ...
        _updateProps () {
            const { store } = this.context
            let stateProps = mapStateToProps(store.getState());
            let dispatchProps = mapDispatchToProps(store.dispatch);
            this.setState({
                allProps: {
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props
                }
            })  
        }
        ...
    }
    
    return Connect
}
```

[slide]

# <font color=#0099ff>connect高阶组件实现完整版</font>

``` JavaScript
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object,
        };

        constructor() {
            super();
            this.state = { allProps: {} }
        }

        componentWillMount() {
            const { store } = this.context;
            this._updateProps();
            store.subscribe(this._updateProps);
        }

        _updateProps = () => {
            const { store } = this.context;
            let stateProps = mapStateToProps(store.getState());
            let dispatchProps = mapDispatchToProps(store.dispatch);
            this.setState({
                allProps: {
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props,
                }
            });
        };

        render() {
            return (<WrappedComponent {...this.state.allProps} />);
        }
    }

    return Connect;
};

export default connect;
```

[slide]

# <font color=#0099ff>connect高阶组件示意图（回顾）</font>

<div margin="auto">
    <img src="../img/reactredux2.jpg" width="750px" height="435px" />
</div>

[slide]

# <font color=#0099ff>总结</font>

- react-redux一共就一个组件和一个API：

- ```<Provider store>```用于在入口处包裹需要用到React的组件。<font color=#ff9933>本质上是将store放入context里</font>

- conncet方法用于将组件绑定Redux。<font color=#ff9933>本质上是HOC，封装掉了每个组件都要写的板式代码，增加了功能。</font>

- <font color=#ff9933>react-redux的高封装性让开发者感知不到context的存在，甚至感知不到Store的getState，subscribe，dispatch的存在。只要connect一下，数据一变就自动刷新React组件，非常方便。</font>

[slide]

# <font color=#0099ff>目录</font>

- <font color=#0099ff>概述</font>

- <font color=#0099ff>Action</font>

- <font color=#0099ff>Reducer</font>

- <font color=#0099ff>Store</font>

- <font color=#0099ff>结合React</font>

- <font color=#ff9933>中间件</font>

[slide]

# <font color=#0099ff>中间件的作用</font>

- 在流程中插入功能

- 要满足两个特性：一是扩展功能，二是可以被链式组合。

[slide]

# <font color=#0099ff>例子</font>

- redux-logger中间件

![redux-logger](../img/redux-logger.jpeg)

[slide]

# <font color=#0099ff>需求：打印log</font>

- 需求：自动打印出Action对象和更新前后的state，便于调试和追踪数据变化流

``` JavaScript
console.log('current state: ', store.getState());
console.log('dispatching', action);
store.dispatch(action);
console.log('next state', store.getState());
```

- 我们需要封装打印log的代码，否则让程序员在每个dispatch的地方写log是不可接受的

[slide]

# <font color=#0099ff>打印log的中间件</font>

``` JavaScript
const preDispatch = store.dispatch;

store.dispatch = (action) => {
    console.log('current state: ', store.getState());
    console.log('action: ', action);
    preDispatch(action);
    console.log('next state: ', store.getState());
};
```

- 上述就是增强版store.dispatch，这就是Redux的中间件

[slide]

# <font color=#0099ff>log中间件为何只能封装到dispatch里？</font>

- ~~Action~~ （HOW？plain object）
- ~~Action Creator~~ （WHERE？not updated）
- ~~Reducer~~ （OK...But not pure）
- dispatch

- <font color=#ff9933>Redux的中间件本质上就是增强dispatch</font>

[slide]

# <font color=#0099ff>多个中间件</font>

- 例如将上述打印logger的中间件拆成两个

``` JavaScript
// 只打印出 Action
const loggerAction = (store) => {
    const preDispatch = store.dispatch;
    store.dispatch = (action) => {
        console.log('action: ', action);
        preDispatch(action);
    };
};

// 只打印出 更新后的state
const loggerState = (store) => {
    const preDispatch = store.dispatch;
    store.dispatch = (action) => {
        console.log('current state: ', store.getState());
        preDispatch(action);
        console.log('next state', store.getState());
    };
};

const store = createStore(reducer);
loggerAction(store);
loggerState(store);
```

[slide]

# <font color=#0099ff>多个中间件就像洋葱圈</font>

![reduxmiddleware](../img/reduxmiddleware2.jpg)

[slide]

# <font color=#0099ff>更优雅的链式调用</font>

- 前面的例子里中间件已经实现了链式调用，前一个中间件增强过的store作为参数传递给下一个中间件。但用起来不够优雅

- Redux提供applyMiddleware方法，允许将所有中间件作为参数传递进去。我们来自己实现这个方法

[slide]

# <font color=#0099ff>applyMiddleware</font>

- 将每个中间件设计成接受一个dispatch参数，并返回加工过的dispatch作为下一个中间件的参数，以方便链式调用

``` JavaScript
// 只打印出 Action
export const loggerAction = (store) => (dispatch) => (action) => {
    console.log('action: ', action);
    dispatch(action);
};

// 只打印出 更新后的state
export const loggerState = (store) => (dispatch) => (action) => {
    console.log('current state: ', store.getState());
    dispatch(action);
    console.log('next state', store.getState());
};

export const applyMiddleware = (store, middlewares) => {
    let dispatch = store.dispatch;
    middlewares.forEach((middleware) => {
        dispatch = middleware(store)(dispatch);
    });

    return {
        ...store,
        dispatch,
    };
};

let store = createStore(reducer);
store = applyMiddleware(store, [loggerAction, loggerState]);
```

[slide]

# <font color=#0099ff>applyMiddleware官方版</font>

- 官方版的applyMiddleware将第一个参数store也被精简掉了

``` JavaScript
export const applyMiddleware = (...middlewares) => {
    return (createStore) => (reducer, preloadedState, enhancer) => {
        const store = createStore(reducer, preloadedState, enhancer);

        let dispatch = store.dispatch;
        middlewares.forEach((middleware) => {
            dispatch = middleware(store)(dispatch);
        });

        return {
            ...store,
            dispatch,
        };
    };
};
```

[slide]

# <font color=#0099ff>总结</font>

- Redux里的中间件就是增强Store.dispatch功能

- 开发中间件，需要支持链式调用

[slide]

# <font color=#0099ff>目录</font>

- <font color=#0099ff>概述</font>（三大原则，初始态流转图，更新态流转图）

- <font color=#0099ff>Action</font>（Action，Action Creator）

- <font color=#0099ff>Reducer</font>（纯函数，Reducer Creator，combineReducers）

- <font color=#0099ff>Store</font>（createStore，getState，dispatch，subscribe）

- <font color=#0099ff>结合React</font>（Provider，connect，用context实现原理，HOC）

- <font color=#0099ff>中间件</font>（洋葱圈式增强dispatch，实现链式调用）

[slide]

# <font color=#0099ff>脚手架目录结构</font>

<div margin="auto">
    <img src="../img/category.jpeg" width="328px" height="456px" />
</div>

[slide]

<div margin="auto">
    <img src="../img/react-redux.jpg" width="750px" height="422px" />
</div>

# THE END

### THANK YOU
