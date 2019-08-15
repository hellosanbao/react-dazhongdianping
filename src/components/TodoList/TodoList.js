import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleTodo } from '../../store/action/index'

//components
import Todo from './Todo'

class TodoList extends Component {
    render() {
        const { todos, toggleCompleted } = this.props
        return (
            <div>
                <ul>
                    {
                        todos.map(todo=><Todo toggleCompleted={toggleCompleted} key={todo.id} {...todo}/>)
                    }
                </ul>
            </div>
        );
    }
}

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'All':
            return todos
        case 'Completed':
            return todos.filter(t => t.completed)
        case 'Active':
            return todos.filter(t => !t.completed)
        default:
            return todos;
    }
}

const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos,state.filter).toJS()
    }
}

const mapDispatchToProps = (dispatch) => ({
    toggleCompleted: (id) => dispatch(toggleTodo(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)