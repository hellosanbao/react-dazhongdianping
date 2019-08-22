import React, { Component } from 'react';
import { BrowserRouter, Route,Switch } from 'react-router-dom'
import './static/scss/reset.scss'

//components
import Home from './pages/home/index'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/home" component={Home} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;