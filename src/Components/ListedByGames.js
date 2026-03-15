import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import { ApiConfig } from '../api/ApiConfig';
import { URL } from '../api/URL';

const SliderSettings = {
    touchMove: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    margin: 10,
    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
        { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
};

const ListedByGames = ({ gameId }) => {
    const [topStreamers, setTopStreamers] = useState([]);
    const [gameName, setGameName] = useState('');
    const [embedVideo, setEmbedVideo] = useState('');
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        axios.get(`${URL}/streams?game_id=${gameId}`, ApiConfig)
            .then(response => {
                let dataArray = response.data.data.map(stream => {
                    let newURL = stream.thumbnail_url.replace('{width}', '300').replace('{height}', '300');
                    let usernameChanges = stream.thumbnail_url.split("live_user_");
                    let user_name = stream.user_name;
                    if (usernameChanges.length > 1) {
                         user_name = usernameChanges[1].split("-")[0];
                    }
                    return {
                        ...stream,
                        box_art_url: newURL,
                        user_name: user_name,
                        title: stream.title.slice(0, 45) + (stream.title.length > 45 ? '...' : '')
                    };
                });
                setTopStreamers(dataArray);
            })
            .catch(error => console.log(error));

        axios.get(`${URL}/games?id=${gameId}`, ApiConfig)
            .then(response => {
                if(response.data.data.length > 0) {
                   setGameName(response.data.data[0].name);
                }
            })
            .catch(error => console.log(error));
    }, [gameId]);

    const openStream = (videoId) => {
        setEmbedVideo(videoId);
        setOpenModal(true);
    };

    return (
        <div className="component-container">
            {openModal && (
                <div className="modern-modal-overlay" onClick={() => setOpenModal(false)}>
                    <div className="modern-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setOpenModal(false)}>✕</button>
                        <ReactTwitchEmbedVideo theme="dark" layout="video" width="100%" height="600px" channel={embedVideo} />
                    </div>
                </div>
            )}

            <div className="section-container">
                <h2 className="section-title">Top Streamers for {gameName}</h2>
                <p className="section-subtitle">Now streaming for {gameName}</p>
                <div className="slider-container">
                    {topStreamers.length > 0 ? (
                        <Slider {...SliderSettings}>
                            {topStreamers.map((streamer, i) => (
                                <div key={i} className="slider-item">
                                    <div className="modern-card">
                                        <div className="img-wrapper" onClick={() => openStream(streamer.user_name)}>
                                            <img src={streamer.box_art_url} alt={streamer.user_name} />
                                            <div className="play-overlay">
                                               <span>▶ Play</span>
                                            </div>
                                        </div>
                                        <div className="card-info" onClick={() => openStream(streamer.user_name)}>
                                            <h5 className="card-title">{streamer.title}</h5>
                                            <p className="card-subtitle">{streamer.user_name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <p className="loading-text">Loading top streamers...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListedByGames;