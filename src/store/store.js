import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducer/index'
import reduxThunk from 'redux-thunk'
import loggerMiddleware from './middleware/logger'
// import loggerEnhancer from './enHancers/logger'
// import * as actions from './action/index'

//不使用redux-devtools的时候
// const store = createStore(reducers,applyMiddleware(reduxThunk))

//composeEnhancers用于接入谷歌差劲redux-devTools的使用
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    //通过applyMiddleware来加载redux-thunk中间件实现异步action
    applyMiddleware(reduxThunk,loggerMiddleware),
    // loggerEnhancer
));

export default store
// console.log(store.getState())

// //订阅state变化
// const unsubscribe = store.subscribe(()=>{
//     console.log(store.getState())
// })

// //发送action
// store.dispatch(actions.addTodo('hello'))
// store.dispatch(actions.toggleTodo(0))
// store.dispatch(actions.setFilter('all'))
// store.dispatch(actions.setTodoText('hello world'))

// //取消订阅
// unsubscribe()

