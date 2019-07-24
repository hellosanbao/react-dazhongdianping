import React, { Component } from 'react';

class AddTodo extends Component {
    // constructor(props){
    //     super(props)
    //     this.state = 
    // }
    addTodo = ()=>{
        const { addTodoFn } = this.props
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