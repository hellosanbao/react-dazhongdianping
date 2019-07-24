import React, { Component } from 'react';

//components
import AddTodo from './TodoList/AddTodo'
import TodoList from './TodoList/TodoList'
import Footer from './TodoList/Footer'



class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos:[],
            filter:'All'
        }
    }
    getVisibleTodos = ()=>{
        const {filter,todos} = this.state
        return todos.filter(item=>{
            if(filter === 'All'){
                return true
            }else if(filter === 'Completed'){
                return item.completed
            }else{
                return !item.completed
            }
        })
    }
    addTodo=(todoText)=>{
        const {todos} = this.state
        todos.push({
            id:todos.length,
            text:todoText,
            completed:false
        })
        this.setState({
            todos
        })
    }
    toggleCompleted= (id)=>{
        let todos = this.state.todos.map(item=>{
            return id === item.id?{...item,completed:!item.completed}:item
        })
        this.setState({
            todos
        })
    }
    render() {
        const { filter } = this.state
        const todos = this.getVisibleTodos()
        return (
            <div>
                <AddTodo addTodoFn={this.addTodo}/>
                <TodoList todos={todos} toggleCompleted={this.toggleCompleted}/>
                <Footer filter={filter} />
            </div>
        );
    }
}

export default App;