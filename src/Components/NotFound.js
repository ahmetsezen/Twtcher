import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    render() {
        return (
            <div class="container d-flex justify-content-center"  >
                <div class="jumbotron my-auto">
                    <h2>Sorry,</h2>
                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                    <h3><Link to='' style={{ color: '#9147ff' }} to="/">Back to Home</Link></h3>
                </div>
            </div>
        )
    }
}

export default NotFound