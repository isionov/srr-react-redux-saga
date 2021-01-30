import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { matchRoutes } from "react-router-config";

export const RouteDataLoader = withRouter(class extends Component {
    static getDerivedStateFromProps(props, state) {
        console.log('in static', props, state);

        return null;
    }

    componentDidMount() {
        console.log('in mount', this.props, this.state);
    }

    componentDidUpdate() {
        console.log('in update', this.props, this.state);
    }

    render() {
        return this.props.children;
    }
})