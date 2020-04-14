import React, { Component } from 'react';
import './list.scss';

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
    }

    handleClick = () => {
        this.setState({
            index: this.state.index + 1
        });
    }

    handleJump = () => {
        this.props.history.goBack();
    }

    componentDidMount() {
        console.log('list page didmount');
    }

    render() {
        return (
            <div className="list_container">
                <p>List Page</p>
                <div>name: {this.props.data && this.props.data.name}</div>
                <button onClick={this.handleClick}>click me add one</button>
                <div>num: {this.state.index}</div>
                <button onClick={this.handleJump}>click me back to home page</button>
            </div>
        );
    }
}
