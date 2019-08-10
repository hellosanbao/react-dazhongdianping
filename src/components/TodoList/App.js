import React, { Component } from 'react';

//components
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import Footer from './Footer'


class App extends Component {
    render() {
        return (
            <div>
                <AddTodo/>
                <TodoList/>
                <Footer/>
            </div>
        );
    }
}

export default App;