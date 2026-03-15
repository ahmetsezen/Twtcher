import React, { Component } from 'react';
import ListedByGames from '../components/ListedByGames'
import {useParams} from 'react-router-dom'

class BrowseByGames extends Component {
    render() {
        const gameId  = this.props.id
        return (
            <div className="container">
                
                <ListedByGames gameId={gameId}/>
                
            </div>
        )
    }
}

export default (props) => <BrowseByGames {...useParams()} {...props} />
