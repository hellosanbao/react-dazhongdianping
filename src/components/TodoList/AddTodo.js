import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setTodoText,addTodo } from '../../store/action/index'

class AddTodo extends Component {
    addTodo = ()=>{
        if(!this.input.value) return
        this.props.addTodo(this.input.value)
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

const mapStateToProps = (state) => ({
    text: state.text
})

const mapDispatchToProps = (dispatch) => ({
    setTodoText: (text) => dispatch(setTodoText(text)),
    addTodo:(text)=>dispatch(addTodo(text))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTodo)