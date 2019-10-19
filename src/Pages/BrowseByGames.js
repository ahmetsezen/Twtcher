import React, { Component } from 'react';
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import ListedByGames from '../Components/ListedByGames'
class BrowseByGames extends Component {
    render() {
        const gameId  = this.props.match.params.id
        return (
            <div className="container">
                <Header />
                <ListedByGames gameId={gameId}/>
                <Footer />
            </div>
        )
    }
}

export default BrowseByGames