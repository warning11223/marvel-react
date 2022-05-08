import React, {Component} from 'react';
import Error from "../error/Error";

class ErrorBoundary extends Component{
    state = {
        error: false
    }

    onError = () => {
        this.setState({
            error: true,
        })
    }

    componentDidCatch(error, errorInfo) {
        this.setState({error: true})
    }

    render() {

        if(this.state.error) {
            return <Error />
        } else {
            return this.props.children
        }

    }
};

export default ErrorBoundary;
