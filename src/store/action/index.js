import * as types from './actionTypes'

let nextTodo = 0

/**
 * 新增待办事项
 */

 export const addTodo = (text)=>{
     return {
         type:types.ADD_TODO,
         id:nextTodo++,
         text
     }
 }

 /** 
  * 更改待办事项
 */

 export const toggleTodo = (id)=>{
     return {
        type:types.TOGGLE_TODO,
        id
     }
 }

 /**
  * 设置过滤状态
  * @param {string} filter 状态值
  */
 export const setFilter = filter =>{
     return {
         type:types.SET_FILTER,
         filter
     }
 }

 /**
  * 新增todo时候的文本信息
  * @param {string} text 
  */
 export const setTodoText = text=>{
     return {
         type:types.SET_TODOTEXT,
         text
     }
 }