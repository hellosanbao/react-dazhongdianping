import React, { Component } from 'react';

class AddTodo extends Component {
    addTodo = ()=>{
        const { addTodoFn } = this.props
        if(!this.input.value) return
        addTodoFn(this.input.value)
        this.input.value = ''
    }
    render() {
        return (
            <div>
                <input ref={(input)=>this.input=input}/>
                <button onClick={this.addTodo}>增加</button>
            </div>
        );
    }
}

export default AddTodo;