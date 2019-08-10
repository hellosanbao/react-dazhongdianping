import * as types from '../action/actionTypes'

const text = (state = '',action)=>{
    switch (action.type) {
        case types.SET_TODOTEXT:
            return action.text
        default:
            return state
    }
}

export default text