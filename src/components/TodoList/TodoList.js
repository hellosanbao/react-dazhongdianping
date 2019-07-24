import React, { Component } from 'react';


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

export default TodoList;