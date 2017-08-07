title: Redux (2)
speaker: JackZhang
theme: dark
transition: move

[slide]

# Redux介绍
JackZhang

[slide]

# <font color=#0099ff>Part 1</font>

- <font color=#0099ff>概述</font>

- <font color=#0099ff>Action</font>

- <font color=#0099ff>Reducer</font>

- <font color=#0099ff>Store</font>

- <font color=#0099ff>结合React（用法）</font>

# <font color=#0099ff>Part 2</font>

- 结合React（原理）

- 中间件

- 异步Action

[slide]

# <font color=#0099ff>Part 2</font>

- <font color=#ff9933>结合React（原理）</font>

- 中间件

- 异步Action

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

# <font color=#0099ff>总结（回顾）</font>

- react-redux一共就一个组件和一个API：

- ```<Provider store>```用于在入口处包裹需要用到React的组件。<font color=#ff9933>本质上是将store放入context里</font>

- conncet方法用于将组件绑定Redux。<font color=#ff9933>本质上是HOC，封装掉了每个组件都要写的板式代码，增加了功能。</font>

- <font color=#ff9933>react-redux的高封装性让开发者感知不到context的存在，甚至感知不到Store的getState，subscribe，dispatch的存在。只要connect一下，数据一变就自动刷新React组件，非常方便。</font>

[slide]

# <font color=#0099ff>Part 2</font>

- <font color=#0099ff>结合React</font>

- <font color=#ff9933>中间件</font>

- 异步Action

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

# <font color=#0099ff>Part 2</font>

- <font color=#0099ff>结合React</font>

- <font color=#0099ff>中间件</font>

- <font color=#ff9933>异步Action</font>

[slide]

# <font color=#0099ff>什么是异步Action</font>

- 需要异步操作时（ajax请求，读取文件等），你需要异步Action

- Action本质是plain object，不存在同步异步的概念。所谓异步Action，本质上是<font color=#ff9933>打包一系列Action动作</font>

[slide]

# <font color=#0099ff>redux-thunk中间件</font>

- 例如网络请求数据：

- （1）dispatch出请求服务器数据的Action

- （2）等待服务器响应

- （3）dispatch出结果Action（携带服务器返回了的数据或异常）去更新state

- <font color=#ff9933>redux-thunk中间件的作用：将这三步封装到Action Creator里，以实现打包一系列Action动作的目的</font>

[slide]

# <font color=#0099ff>redux-thunk实现方式</font>

- thunk在JS里是将多参的异步函数，转换成单参

- 常规的Action creator返回一个Action，但redux-thunk，允许你的Action creator还可以返回一个```function(dispatch, getState)```

``` JavaScript
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}
```

[slide]

# <font color=#0099ff>实现网络请求的异步Action</font>

- 第一步dispatch出请求服务器数据的Action

``` JavaScript
const requestData = () => ({
    type: constant.REQUEST_DATA,
});
```

[slide]

# <font color=#0099ff>实现网络请求的异步Action</font>

- 第二步dispatch出结果Action（携带服务器返回了的数据或异常）去更新state

``` JavaScript
const receiveData = (data) => ({
    type: constant.RECEIVE_DATA,
    data: data.msg,
});
```

[slide]

# <font color=#0099ff>实现网络请求的异步Action</font>

- 第三步用redux-thunk将这两步连起来

``` JavaScript
const doFetchData = () => (dispatch) => {
    dispatch(requestData());
    return fetch('./api/fetchSampleData.json')
        .then((response) => response.json())
        .then((json) => dispatch(receiveData(json)));
};

export default {
    fetchDataAction: () => (dispatch) => {
        return dispatch(doFetchData());
    },
};
```

[slide]

# <font color=#0099ff>实现网络请求的异步Action</font>

- 完整版（加上了请求未完成不允许连续请求，减少服务器开销的逻辑）

``` JavaScript
import fetch from 'isomorphic-fetch';
import * as constant from '../configs/action';
import { sleep } from '../lib/common';

const requestData = () => ({
    type: constant.REQUEST_DATA,
});

const receiveData = (data) => ({
    type: constant.RECEIVE_DATA,
    data: data.msg,
});

const doFetchData = () => async(dispatch) => {
    dispatch(requestData());
    await sleep(1000);      // Just 4 mock
    return fetch('./api/fetchSampleData.json')
        .then((response) => response.json())
        .then((json) => dispatch(receiveData(json)));
};

const canFetchData = (state) => {
    return !state.fetchData.fetching;
};

export default {
    fetchDataAction: () => (dispatch, getState) => {
        if (canFetchData(getState())) {
            return dispatch(doFetchData());
        }
        return Promise.resolve();
    },
};
```

[slide]

# <font color=#0099ff>Part 1</font>

- <font color=#0099ff>概述</font>（三大原则，初始态流转图，更新态流转图）

- <font color=#0099ff>Action</font>（Action，Action Creator）

- <font color=#0099ff>Reducer</font>（纯函数，Reducer Creator，combineReducers）

- <font color=#0099ff>Store</font>（createStore，getState，dispatch，subscribe）

# <font color=#0099ff>Part 2</font>

- <font color=#0099ff>结合React</font>（Provider，connect，用context实现原理，HOC）

- <font color=#0099ff>中间件</font>（洋葱圈式增强dispatch，实现链式调用）

- <font color=#0099ff>异步Action</font>（redux-thunk）

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
