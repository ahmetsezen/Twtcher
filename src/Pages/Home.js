import React, { Component } from 'react';
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import BrowseComponent from '../Components/BrowseComponent';
import '../App.scss';
class Home extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <BrowseComponent />
                <Footer />
            </div>
        )
    }
}

export default Home