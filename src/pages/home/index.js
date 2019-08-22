import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as action from '../../store/action/home'
import './index.scss'

class Home extends Component {
    render() {
        const { fetchMhData } = this.props
        return (
            <div className="Home">
                <div className="bg"></div>
                <div className="title">超牛逼的网站</div>
                <p onClick={()=>{fetchMhData('海贼王')}}>add test</p>
                <p>{this.props.home}</p>
            </div>
        );
    }
}

function mapStateToProps(state){
    return state
}
function mapActionToProps(dispatch){
    return bindActionCreators(action,dispatch)
}

export default connect(mapStateToProps,mapActionToProps)(Home);