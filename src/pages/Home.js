import React, { Component } from 'react';
import BrowseComponent from '../components/BrowseComponent';
import '../App.scss';
class Home extends Component {
    render() {
        return (
            <div className="container">
                
                <BrowseComponent />
                
            </div>
        )
    }
}

export default Home