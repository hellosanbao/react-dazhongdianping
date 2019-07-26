import React, { Component } from 'react';

//components
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import Footer from './Footer'



class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos:[],
            filter:'All'
        }
        this.nextTodoId = 0
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
            id:++this.nextTodoId,
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

    setViblityFilter = filter =>{
        this.setState({filter})
    }
    render() {
        const { filter } = this.state
        const todos = this.getVisibleTodos()
        return (
            <div>
                <AddTodo addTodoFn={this.addTodo}/>
                <TodoList todos={todos} toggleCompleted={this.toggleCompleted}/>
                <Footer setViblityFilter={this.setViblityFilter} filter={filter} />
            </div>
        );
    }
}

export default App;