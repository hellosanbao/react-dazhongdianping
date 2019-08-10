import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setFilter } from '../../store/action/index'

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

const mapStateToProps = (state) => ({
    filter: state.filter
})

const mapDispatchToProps = (dispatch) => ({
    setViblityFilter:(filter)=>dispatch(setFilter(filter))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer)