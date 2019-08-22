import React, { Component } from 'react'
import { BrowserRouter, Route,Link } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <div className="nav">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                    <Route exact path='/' component={Home} />
                    <Route path='/about' component={About} />
                    <Route path='/contact' component={Contact} />
                </div>
            </BrowserRouter>
        )
    }
}