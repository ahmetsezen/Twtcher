import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTwitchEmbedVideo from "react-twitch-embed-video"
import { Modal, ModalBody } from 'reactstrap';
import axios from 'axios';
import Slider from "react-slick";
import { URL } from '../Api/URL';
import { ApiConfig } from '../Api/ApiConfig';
class BrowseComponent extends Component {
    state = {
        topStreamers: [],
        topGames: [],
        embedVideo: "",
        open: false,
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    getStreamContent = (embedVideo) => {
        this.setState({ open: true });
        this.setState({ embedVideo: embedVideo });
    }

    componentDidMount() {
        axios.get(`${URL}/games/top`, ApiConfig)
            .then(response => {

                let dataArray = response.data.data;
                let finalArray = dataArray.map(game => {
                    let newURL = game.box_art_url.replace('{width}', '300').replace('{height}', '300')
                    game.box_art_url = newURL
                })
                this.setState({ topGames: dataArray });
              
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get(`${URL}/streams`, ApiConfig)
            .then(response => {

                let dataArray = response.data.data;
                let finalArray = dataArray.map(game => {
                    let newURL = game.thumbnail_url.replace('{width}', '300').replace('{height}', '300')
                    game.box_art_url = newURL
                    var usernameChanges = game.thumbnail_url.split(["live_user_"]);
                    var usernameChangesv1 = usernameChanges[1].split(["-"])
                    var usernameChangesv2 = usernameChangesv1[0]
                    game.user_id = usernameChangesv2
                    var titleChanges = game.title.slice(0, 35)
                    game.title = titleChanges
                })
                this.setState({ topStreamers: dataArray });
              
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    render() {
        var SliderSettings = {
            touchMove: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            margin: 2,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return (
            <div>
                <div>
                    <Modal toggle={this.onCloseModal}returnFocusAfterClose={false} fade={true} size={"lg"} isOpen={this.state.open} >
                        <ModalBody>
                            <p onClick={this.onCloseModal} className="text-right" style={{ cursor: 'pointer', fontSize: 20 }}>X</p>
                            <ReactTwitchEmbedVideo theme={"dark"} layout="video" width="100%" channel={this.state.embedVideo} />
                        </ModalBody>
                    </Modal>
                </div>
                <div className="jumbotron">
                    <h3 className="text-left"> Most Popular Games </h3>
                    <h5 className="text-left"> Click the game name and reach all popular live streams which is related game </h5>
                    <Slider {...SliderSettings}>
                        {
                            Object.entries(this.state.topGames).map(([key, game]) => (
                                <div className="card">
                                    <img data-toggle="tooltip" title="Click the text" data-placement="top" style={{ padding: 5 }} src={game.box_art_url} width="100%" height="250vm" alt={game.name} />
                                    <Link to={`/browse/games/${game.id}`} style={{ textDecoration: 'none' }}>
                                        <h5 className="card-title" >{game.name}</h5>
                                    </Link>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
                <div className="jumbotron">
                    <h3 className="text-left">Most Popular Streamers </h3>
                    <h5 className="text-left">Just click on the stream name which is you want to watch </h5>
                    <Slider {...SliderSettings}>
                        {
                            Object.entries(this.state.topStreamers).map(([key, streamer]) => (
                                <div className="card">
                                    <img style={{ padding: 5, position: 'relative', display: "block" }} src={streamer.box_art_url} width="100%" height="250vm" alt={streamer.user_name} />

                                    <Link onClick={() => this.getStreamContent(streamer.user_id)} style={{ textDecoration: 'none' }}>
                                        <h5 className="card-title" >{streamer.title}</h5>
                                    </Link>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
            </div>
        )
    }
}

export default BrowseComponent