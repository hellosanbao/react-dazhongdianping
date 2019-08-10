import * as types from '../action/actionTypes'

const filter = (state = 'All',action)=>{
    switch (action.type) {
        case types.SET_FILTER:
            return action.filter
        default:
            return state
    }
}

export default filter