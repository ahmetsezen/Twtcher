import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Slider from "react-slick";
import { Modal, ModalBody } from 'reactstrap';
import Select from 'react-select'
import Loader from 'react-loader-spinner'
import { ApiConfig } from '../Api/ApiConfig';
import { URL } from '../Api/URL';
class ClipsComponent extends Component {

    state = {
        topStreamers: [],
        gameName: '',
        open: false,
        games: [],
        selectedOption: null,
        clipView: '',
        loading: false,
    }

    embedVideo = (deneme) => {
        this.setState({ open: true });
        this.setState({ clipView: deneme });
    };
    handleChange = selectedOption => {
        this.setState({ selectedOption: selectedOption });
        this.getClips(selectedOption.value, selectedOption.value);

    };
    onCloseModal = () => {
        this.setState({ open: false });
    };


    getClips = (selectedGameId, iki) => {
        this.setState({ loading: true });
        axios.get(`${URL}/clips?game_id=${selectedGameId}`, ApiConfig)
            .then(response => {
                let dataArray = response.data.data;
                let finalArray = dataArray.map(game => {
                    let newURL = game.thumbnail_url.replace('{width}', '300').replace('{height}', '300')
                    game.box_art_url = newURL
                })
                this.setState({ topStreamers: dataArray });
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get(`${URL}/games?id=${iki}`, ApiConfig)
            .then(response => {
                this.setState({ gameName: response.data.data[0].name })
                this.setState({ loading: false });
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    componentDidMount() {
        axios.get(`${URL}/games/top`, ApiConfig)
            .then(response => {
                this.setState({ games: response.data.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    render() {
        const options = this.state.games.map(game => ({
            label: game.name,
            value: game.id
        }));
        const customStyles = {
            option: (provided, state) => ({
                ...provided,
                borderBottom: '5px solid pink',
                color: state.isSelected ? 'white' : 'black',
                ':active': {
                    backgroundColor: !state.isSelected && (state.isSelected ? '#9147ff' : '#9147ff'),
                },
                backgroundColor: state.isSelected ? '#9147ff' : 'white',
            }),

            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';

                return { ...provided, opacity, transition };
            }
        }
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
            <div >
                <div>
                    <Modal toggle={this.onCloseModal}returnFocusAfterClose={false} fade={true} size={"lg"} isOpen={this.state.open} >
                        <ModalBody>
                            <p onClick={this.onCloseModal} className="text-right" style={{ cursor: 'pointer', fontSize: 20 }}>X</p>
                            <iframe title={this.state.gameName} key={this.state.clipView} className="resp-iframe" src={this.state.clipView} allowFullScreen={true} width="100%" height="400" />
                        </ModalBody>
                    </Modal>
                </div>
                <div className="jumbotron" style={{padding:50}}>
                    <h3 className="text-left"> Select the game</h3>
                    <Select
                        value={this.state.selectedOption}
                        onChange={this.handleChange}
                        options={options}
                        styles={customStyles}

                    />
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
                            {this.state.gameName !== '' && <h3 className="text-left"> Most Popular Clips for {this.state.gameName} </h3>}
                            {this.state.gameName !== '' && <h5 className="text-left"> Just click on the clip name which clip you want to watch </h5>}
                            <Slider {...SliderSettings}>
                                {
                                    Object.entries(this.state.topStreamers).map(([key, streamer]) => (
                                        <div key={key} className="card" >
                                            <img style={{ padding: 5, position: 'relative' }} src={streamer.box_art_url} width="100%" height="200vm" alt={streamer.user_name} />
                                            <Link onClick={() => this.embedVideo(streamer.embed_url)}  style={{ textDecoration: 'none' }}>
                                                <h5 className="card-title" >{streamer.title}</h5>
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

export default ClipsComponent