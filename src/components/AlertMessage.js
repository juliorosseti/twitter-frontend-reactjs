import React, { Component } from 'react';
import './AlertMessage.css';

export default class Register extends Component {

    render() {
        return (<div className={'alert-message alert-' + this.props.type}>
            {this.props.text}
        </div>)
    }
};