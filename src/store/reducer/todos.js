import * as types from '../action/actionTypes'
import Immutable from 'immutable'

const todos = (state = Immutable.fromJS([]), action) => {
    switch (action.type) {
        case types.ADD_TODO:
            return state.push(Immutable.fromJS(
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ))
        case types.TOGGLE_TODO:
            return state.map(todo => {
                return todo.get('id') === action.id ?
                    todo.set('completed', !todo.get('completed')) :
                    todo
            })
        default:
            return state
    }
}

export default todos