import React, { Component } from 'react';
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import LiveNow from '../Components/LiveNow';
class Browse extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <LiveNow />
                <Footer />
            </div>
        )
    }
}

export default Browse