import React, { Component } from 'react';
import './home.scss';

export default class extends Component {

    constructor(props) {
        super(props);
        let staticContext = props.staticContext;

        if (!staticContext) {
            staticContext = window.__ROUTE_DATA__;
        }

        const { text, data } = staticContext;

        this.state = {
            index: 0,
            text,
            data
        };
    }

    handleClick = () => {
        this.setState({
            index: this.state.index + 1
        });
    }

    handleJump = () => {
        this.props.history.push('/page/list');
    }

    componentDidMount() {
        console.log('home page didmount');
    }

    render() {
        return (
            <div className="home_container">
                <div>name: {this.state.data && this.state.data.name}</div>
                <button onClick={this.handleClick}>click me add one</button>
                <div>num: {this.state.index}</div>
                <div>text: {this.state.text}</div>
                <button onClick={this.handleJump}>click me jump to list page</button>
            </div>
        );
    }
}
