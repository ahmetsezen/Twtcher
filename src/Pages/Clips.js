import React, { Component } from 'react';
import Header from '../Components/Header'
import ClipsComponent from '../Components/ClipsComponent'
import Footer from '../Components/Footer'
class Home extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <ClipsComponent />
                <Footer />
            </div>
        )
    }
}

export default Home