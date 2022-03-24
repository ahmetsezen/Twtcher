import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { Modal, ModalBody } from 'reactstrap';
import ReactTwitchEmbedVideo from "react-twitch-embed-video"
import { ApiConfig } from '../Api/ApiConfig';
import { URL } from '../Api/URL';
class ListedByGames extends Component {
    state = {
        topStreamers: [],
        gameName: '',
        open: false
    }

    onCloseModal = () => {
        this.setState({ open: false });
    };

    getStreamContent = (embedVideo) => {
        this.setState({ open: true });
        this.setState({ embedVideo: embedVideo });
    };

    componentDidMount() {
        axios.get(`${URL}/streams?game_id=${this.props.gameId}`, ApiConfig)
            .then(response => {
                let dataArray = response.data.data;
                dataArray.map(game => {
                    let newURL = game.thumbnail_url.replace('{width}', '300').replace('{height}', '300')
                    game.box_art_url = newURL
                    var usernameChanges = game.thumbnail_url.split(["live_user_"]);
                    var usernameChangesv2 = usernameChanges[1].split(["-"])
                    var usernameChangesv3 = usernameChangesv2[0]
                    game.user_name = usernameChangesv3
                    var titleChanges = game.title.slice(0, 35)
                    game.title = titleChanges
                })
                this.setState({ topStreamers: dataArray });
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get(`${URL}/games?id=${this.props.gameId}`, ApiConfig)
            .then(response => {
                this.setState({ gameName: response.data.data[0].name });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        var SliderSettings = {
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
                        dots: true
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
                <div className="jumbotron" style={{padding:50}}>
                    <h3 className="text-left"> Top Streamers for {this.state.gameName} </h3>
                    <h5 className="text-left"> Now, They are streaming for {this.state.gameName} </h5>
                    <Slider {...SliderSettings}>
                        {
                            Object.entries(this.state.topStreamers).map(([key, streamer]) => (
                                <div key={streamer.user_name} className="card" >
                                    <img style={{ padding: 5, position: 'relative' }} src={streamer.box_art_url} width="100%" height="200vm" alt={streamer.user_name} />
                                    <Link to='' onClick={() => this.getStreamContent(streamer.user_name)} style={{ textDecoration: 'none' }}>
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

export default ListedByGames