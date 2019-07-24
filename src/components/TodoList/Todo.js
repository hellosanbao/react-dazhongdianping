import React, { Component } from 'react';

class Todo extends Component {
    handleClick = (id)=>{
        this.props.toggleCompleted(id)
    }
    render() {
        const {text,completed,id} = this.props
        return (
            <li onClick={()=>{this.handleClick(id)}} style={{
                textDecoration:completed?"line-through":"none",
                color:completed?'green':'red'
            }}>
                {text}
            </li>
        );
    }
}

export default Todo;