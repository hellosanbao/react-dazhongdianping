
## create-react-app使用

全局安装create-react-app

```
npm i create-react-app
```

执行create-react-app初始化命令

```
npx create-react-app my-project
```

默认情况下，create-react-app会将webpack的一些配置放在`react-scripts`这个npm包中,如果想要修改默认配置，执行如下命令即可暴露出配置文件

```
npm run eject
```


## webpackDevServer服务器代理
老版本的create-react-app代理起来比较容易，只需要在`package.json`中增加一个代理字段即可，如下

`package.json`
```js
{
    //...
    //..
    //.
    "proxy":{
        "/api":{
            "target":"http://localhost:8000/"
        }
    }
}
```

而新版本的create-react-app这样写就会报错

```shell
When specified, "proxy" in package.json must be a string.
Instead, the type of "proxy" was "object".
Either remove "proxy" from package.json, or make it a string.
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! r-d-m@0.1.0 start: `react-scripts start`
npm ERR! Exit status 1
```

意思很明确，proxy字段需要的是字符串，而不是对象，而proxy如果只能穿简单的字符串，如下

```js
{
    //...
    //..
    //.
    "proxy":"http://localhost:8000/"
}
```

那么我们就只能代理一个域名,那么如果想代理多个域名怎么办呢？

可以借助`http-proxy-middleware`以及devScrver提供的一些钩子来实现代理

在露出create-react-app的devServer配置文件`config/webpackDevServer.config.js`可以看到

在devServer的before钩子函数中有这么一段

```js
    if (fs.existsSync(paths.proxySetup)) {
    // This registers user provided middleware for proxy reasons
    require(paths.proxySetup)(app);
    }
```
那么这里就是进行代理中间件注册的地方，根据配置代码可以查找到`paths.proxySetup`映射的就是`src/setupProxy.js`而且该文件导出的是一个function，接受的是express的app对象。

所以`src/setupProxy.js`中这样写即可添加代理中间件,devserver会自己加载这个文件并use你配置的代理中间件

```js
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(proxy('/api', { target: 'http://localhost:8000/' }))
    app.use(proxy('/api2', { target: 'http://localhost:9090/' }))
}


```


## 本地数据mock

两种方式(推荐第二种，简单)：

第一种，本地起一台node服务器，将mock的数据以json文件的形式放在本地server中，然后通过代理到react项目上进行请求，本地起服务器可以借助`http-server`或者`anywhere`来实现，代理方法上面已讲

第二种，利用create-react-app自身的特性，将mock数据已json文件的形式放在项目根目录的publick目录下，例如：`publick/mock/data.json`
那么请求的时候直接`fetch('/mock.data.json')`即可


##Redux

![WX20190725-222401@2x.png](https://upload-images.jianshu.io/upload_images/13890429-eb937141cf2cf971.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 1、state

redux中的state是将组件的state状态进行集中管理，复杂的组件通讯中不需要频繁的传递props，state只需要在redux中进行定义和管理即可

### 2、action

action用来描述如何修改状态，实际上action是一个包含`type`字段的json对象，而`type`这是action的描述，可以通过`store.dispatch`发送`action`

例如下面的例子，就是一个简单的action：

```js
let todoAction = {
    type: 'ADD_TODO',
    id:1,
    text:'学习react'
}
```

但是在实际项目中，我们通常不会这样去定义，更多的情况下我们会通过action create来定义action，也就会通过定义一个函数来返回这个action的json对象:

```js
let todoAction = (data)=>{
    return {
        type: 'ADD_TODO',
        id:1,
        text:'学习react',
        data
    }
}   
```

#### 异步action

以上的方法都只能支持同步操作，如果在action中耀实现异步操作怎么办呢？
我们将action的返回值设定成一个函数，接受一个参数`dispatch`,然后通过dispatch去调用其他的action，如下：

```js
let todoAction = (data)=>{
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(someOtherAction1)
            dispatch(someOtherAction2)
            //...
        },1000)
    }
}   
```

redux自身是无法处理返回值是函数的action的，这里需要借助一个redux中间件`redux-thunk`来处理返回函数的action,使用`redux-thunk`的方法也比较简单，在创建store的方法中传入第二个参数applyMiddleware方法，并把redux-thunk传入到applyMiddleware即可：

```js
import { createStore,applyMiddleware } from 'redux'
import reducers from './reducer/index'
import reduxThunk from 'redux-thunk'

//通过applyMiddleware来加载redux-thunk中间件实现异步action
const store = createStore(reducers,applyMiddleware(reduxThunk))

export default store
```






## Reducer

![QQ20190727-110832.png](https://upload-images.jianshu.io/upload_images/13890429-a7ea785963e0a17b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

reducer是action的解析器，简单来说，action是描述干什么，而reducer则是来描述具体怎么做的


### reducer的拆分

在我们做项目的时候需要统一管理的状态实际上是非常多的，如果把这些状态统统放到一个reducer里面处理的话，会导致这个reducer异常的庞大和不好维护，所以在拆分reducer就变得很有必要
例如：项目中有三个主要模块，home、list、detail，那么我们可以对应的吧reducer拆分成3个

> #### home reducer

```js
import * as types from '../action/actionTypes'

const homeInitialState ={}

export default homeReducer = (state=homeInitialState,action)=>{
    switch(action.type){
        case types.HOME_ACTION_TEST:
            return {
                ...state,
                action.data
            }
        default:
            return {...state}
    }
}

```

> #### list reducer

```js
import * as types from '../action/actionTypes'

const listInitialState ={}

export default listReducer = (state=homeInitialState,action)=>{
    switch(action.type){
        case types.LIST_ACTION_TEST:
            return {
                ...state,
                action.data
            }
        default:
            return {...state}
    }
}

```

> #### detail reducer

```js
import * as types from '../action/actionTypes'

const detailInitialState ={}

export default detailReducer = (state=homeInitialState,action)=>{
    switch(action.type){
        case types.DETAIL_ACTION_TEST:
            return {
                ...state,
                action.data
            }
        default:
            return {...state}
    }
}

```

拆分完毕后，我们再在reducer的入口文件中奖这个三个reducer合并后再导出即可

`/reducer/index.js`

```js
import { combineReducers } from 'redux'
import homeReducer from './home'
import listReducer from './list'
import detailReducer from './detail'

export default combineReducers({
    homeReducer,
    listReducer,
    detailReducer
})
```


## Store

![QQ20190728-152511@2x.png](https://upload-images.jianshu.io/upload_images/13890429-0aceea00fcaa211b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


store就是将actions、state、reducer整合到一起的粘合剂
具体如何使用呢？

1、首先，我们要借助redux的createStore来将合并后的reducer集合创建成一个store对象

2、然后，我们通过store.subscribe来监听state的变化，该方法返回的是一个unsubscribe的取消订阅的方法，再次调用则是取消监听

3、最后通过store.dispatch来触发action从而改变state

那么store的工作流主要就是这3步，下面是一个简单的示例帮助理解：

```js
import { createStore } from 'redux'
import reducers from './reducer/index'
import * as actions from './action/index'

//创建store
const store = createStore(reducers)

//获取初始化时的state
console.log(store.getState())

//订阅state变化
const unsubscribe = store.subscribe(()=>{
    console.log(store.getState())
})

//发送action
store.dispatch(actions.addTodo('hello'))
store.dispatch(actions.toggleTodo(0))
store.dispatch(actions.setFilter('all'))
store.dispatch(actions.setTodoText('hello world'))

//取消订阅
unsubscribe()
```

## react-redux

redux可以帮助我们对状态进行集中管理，那么我们如何将redux的store与react联系起来呢，react-redux可以很好的帮助我们做这件事

#### 1、将store注入到App组件(根组件)

首先我们通过react-redux提供的高阶组件`Provider`将`App`组件包裹，并将创建好的store作为props传入到Provider组件中：

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/TodoList/App';
import * as serviceWorker from './serviceWorker';
import store from './store/store'
import { Provider } from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

```

#### 2、将项目中的容器组件通过connect来进行与redux的连接
connect方法接受两个map func作为参数，第一个是`mapStateToProps`,接受`state`参数，作用是你将redux的state绑定到组件的props上，第二个是`mapDispatchToProps`接受`dispatch`参数，作用是将action绑定到组件的props上，最后将组件作为参数传入到connect返回的方法中并导出

```jsx
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setFilter } from '../../store/action/index'

class Footer extends Component {
    render() {
        const { filter } = this.props
        return (
            <div>
                <span>Show:</span>
                <button
                    onClick={() => { this.props.setViblityFilter('All') }}
                    disabled={filter === 'All'}>All
                </button>
                <button
                    onClick={() => { this.props.setViblityFilter('Active') }}
                    disabled={filter === 'Active'}>Active
                </button>
                <button
                    onClick={() => { this.props.setViblityFilter('Completed') }}
                    disabled={filter === 'Completed'}>Completed
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    filter: state.filter
})

const mapDispatchToProps = (dispatch) => ({
    setViblityFilter:(filter)=>dispatch(setFilter(filter))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer)
```

### redux调试工具 redux-devTools

#### 接入redux-devTools就两步

1、在谷歌插件市场安装redux-devTools

2、修改store的创建函数,主要用到redux提供的compose来连接

```js
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducer/index'
import reduxThunk from 'redux-thunk'

//composeEnhancers用于接入谷歌差劲redux-devTools的使用
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    //通过applyMiddleware来加载redux-thunk中间件实现异步action
    applyMiddleware(reduxThunk)
));

export default store
```


### redux中间件

中间件目的就是增强store的dispatch的能力，如下图，view发出的dispatch会经过中间件的后返回一个`next`函数，接受action，如果是多个中间件，就重复这个动作，而action会依次的传给下一个中间件

 ![WX20190810-202720@2x.png](https://upload-images.jianshu.io/upload_images/13890429-0d33ec2d070f0715.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们可以简单的写一个redux的中间件`logger`来测试一下

```js
const logger = ({getState,dispatch})=>(next)=>{
    return (action)=>{
        console.group(action.type);
        console.log('dispatch:',action);
        const result = next(action);
        console.log('next state:',getState());
        console.groupEnd();
        return result;
    }
}
export default logger;
```

如上面代码所示，logger中间件实际上就是一个函数，接受`getState`,`dispatch`参数，该函数会返回一个函数，接受`action`作为参数，打印出type和action之后，再执行下一个中间件，执行完后再打印新的state，注意next方法是执行下一个中间件的意思

### storeEnhancer

storeEnhancer是redux中间件更底层的一个封装，redux提供的applyMiddleware就是将
storeEnhancer进行了进一步的封装，同样我们写一个简单的enhancer来实现logger功能：

```js
const logger = (createStore) => {
    return (...args) => {
        const store = createStore(...args);
        const dispatch = (action) => {
            console.group(action.type);
            console.log('dispatch:', action);
            const result = store.dispatch(action);
            console.log('next state:', store.getState());
            console.groupEnd();
            return result;
        }
        return { ...store, dispatch }
    }
}
export default logger;
```

可以看出，enhancer也是一个函数，接受createStore，返回一个函数，
在返回的函数中创建store，然后合一给store上的一系列api进行修改甚至重写，最后再讲store返回。用起来middleware更加灵活，因为它更底层，那么实际项目中我们如何选择呢？

实际项目中我们尽量使用middleware，因为enhancer使我们能随意修改store上的api，这样在开发时尤其是多人协作的时候回遇到意想不到的错误，middleware可以说是给我们一个规范，不能随意的修改store，更加安全


## React-router

react-router是react操作路由系统的核心库，基于该库实现的web端路由库react-router-dom可以帮我们实现web单页面的路由操作（native端的路由库是react-router-native）

### Router

react-router 使用方式就是在跟组件外包一层Router组件，react-router4的Router组件有两种，`HashRouter`和`BrowserRouter`,

- HashRouter不会改变路由的path而是通过改变路由中的hash串来识别当前路由，主要是为了老版本的浏览器不支持新的h5路由api而存在
- BrowserRouter则是利用h5的路由api来进行路由拦截，从而实现路由的控制，之中方式的路由更直观，性能更好，推荐使用（使用该路由方式需要在服务器端做配置，任何路由都返回首页的路由，防止手动输入非首页路由404）


