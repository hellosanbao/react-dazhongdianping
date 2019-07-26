import React, { Component } from 'react';

class Footer extends Component {
    render() {
        const { filter } = this.props
        return (
            <div>
                <span>Show:</span>
                <button
                    onClick={() => { this.props.setViblityFilter('All') }}
                    disabled={filter === 'All'}>All
                </button>
                <button
                    onClick={() => { this.props.setViblityFilter('Active') }}
                    disabled={filter === 'Active'}>Active
                </button>
                <button
                    onClick={() => { this.props.setViblityFilter('Completed') }}
                    disabled={filter === 'Completed'}>Completed
                </button>
            </div>
        );
    }
}

export default Footer;