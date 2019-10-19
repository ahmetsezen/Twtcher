import React, { Component } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import { Modal, ModalBody } from 'reactstrap';
import { URL } from '../Api/URL';
import { ApiConfig } from '../Api/ApiConfig';
import Loader from 'react-loader-spinner';
class LiveNow extends Component {
    state = {
        topStreamers: [],
        topGames: [],
        embedVideo: "",
        open: false,
        gameName: '',
        loading: false
    }

    onCloseModal = () => {
        this.setState({ open: false });
    };

    getStreamsByGame = (gameId) => {
        this.setState({ loading: true })
        axios.get(`${URL}/streams?game_id=${gameId}`, ApiConfig)
            .then(response => {
                let dataArray = response.data.data;
                let finalArray = dataArray.map(game => {
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
                console.log(dataArray)
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get(`${URL}/games?id=${gameId}`, ApiConfig)
            .then(response => {
                this.setState({ gameName: response.data.data[0].name });
                this.setState({ loading: false })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getStreamContent = (embedVideo) => {
        this.setState({ open: true });
        this.setState({ embedVideo: embedVideo });
    }


    componentDidMount() {
        axios.get(`${URL}/games/top`, ApiConfig)
            .then(response => {
                let dataArray = response.data.data;
                let finalArray = dataArray.map(game => {
                    let sizing = game.box_art_url.replace('{width}', '300').replace('{height}', '300')
                    game.box_art_url = sizing
                })
                this.setState({ topGames: dataArray });
   
            })
            .catch(function (error) {
                console.log(error);
            });


    }
    render() {
        let SliderSettings = {
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

                    <Modal toggle={this.onCloseModal} fade={true} size={"lg"} isOpen={this.state.open} >
                        <ModalBody>
                            <p onClick={this.onCloseModal} className="text-right" style={{ cursor: 'pointer', fontSize: 20 }}>X</p>
                            <ReactTwitchEmbedVideo theme={"dark"} layout="video" width="100%" channel={this.state.embedVideo} />
                        </ModalBody>
                    </Modal>
                </div>
                <div className="jumbotron" style={{padding:50}}>
                    <h3 className="text-left"> Top 20 Games </h3>
                    <h5 className="text-left"> Click the game name and reach all popular live streams which is related game </h5>
                    <Slider {...SliderSettings}>
                        {
                            Object.entries(this.state.topGames).map(([key, game]) => (
                                <div key={key} className="card">
                                    <img data-toggle="tooltip" title="Click the text" data-placement="top" style={{ padding: 5 }} src={game.box_art_url} width="100%" height="250vm" alt={game.name} />
                                    <Link onClick={() => this.getStreamsByGame(game.id)} style={{ textDecoration: 'none' }}>
                                        <h5 className="card-title" >{game.name}</h5>
                                    </Link>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
                {
                    this.state.loading === true ?
                        <div className="text-center">
                            <Loader
                                type="Puff"
                                color="#9147ff"
                                height={100}
                                width={100}
                            />
                        </div>
                        :
                        <div className="jumbotron" style={{padding:50}}>
                            {this.state.gameName !== '' && <h3 className="text-left">They are streaming for {this.state.gameName} </h3>}
                            {this.state.gameName !== '' && <h5 className="text-left">Just click on the stream name which is you want to watch </h5>}
                            <Slider {...SliderSettings}>
                                {
                                    Object.entries(this.state.topStreamers).map(([key, streamer]) => (
                                        <div key={key} className="card">
                                            <img style={{ padding: 5, position: 'relative', display: "block" }} src={streamer.box_art_url} width="100%" height="250vm" alt={streamer.user_name} />
                                            <Link onClick={() => this.getStreamContent(streamer.user_name)} style={{ textDecoration: 'none' }}>
                                                <h5 className="card-title">{streamer.title}</h5>
                                            </Link>
                                        </div>
                                    ))
                                }
                            </Slider>
                        </div>
                }
            </div>
        )
    }
}

export default LiveNow