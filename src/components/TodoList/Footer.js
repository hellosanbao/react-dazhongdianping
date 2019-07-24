import React, { Component } from 'react';

class Footer extends Component {
    render() {
        const { filter } = this.props
        return (
            <div>
                <span>Show:</span>
                <button disabled={filter==='All'}>All</button> 
                <button disabled={filter==='Active'}>Active</button> 
                <button disabled={filter==='Completed'}>Completed</button> 
            </div>
        );
    }
}

export default Footer;