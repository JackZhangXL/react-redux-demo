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

# <font color=#0099ff>Part 2</font>

- 结合React

- 中间件

- 异步Action

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

- ```<Provider store>```用于在入口处包裹需要用到Redux的组件。

- conncet方法用于将组件绑定Redux。第一个参数负责输入，将state映射成组件props。第二个参数负责输出，将Action Creator映射成组件props。第三个参数用于整合props。第四个参数有什么心得记得分享给我 :-)

[slide]

# <font color=#0099ff>react-redux的实现原理</font>

- React里有个全局变量context，可用将组件间共享的数据放到contex里

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
export class Provider extends Component {
    static propTypes = {
        store: PropTypes.object,
        children: PropTypes.any,
    }

    static childContextTypes = {
        store: PropTypes.object,
    }

    getChildContext () {
        return { store: this.props.store, }
    }

    render () {
        return <div>{this.props.children}</div>
    }
}
```




