import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import Select from 'react-select';
import { Rings } from 'react-loader-spinner';
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

const customStyles = {
    control: (base) => ({
        ...base,
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#f8fafc',
        borderRadius: '16px',
        padding: '5px',
        boxShadow: 'none',
        '&:hover': {
            border: '1px solid rgba(139, 92, 246, 0.5)'
        }
    }),
    singleValue: (base) => ({ ...base, color: '#f8fafc' }),
    menu: (base) => ({
        ...base,
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(16px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden'
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? '#8b5cf6' : (state.isFocused ? 'rgba(139, 92, 246, 0.2)' : 'transparent'),
        color: '#f8fafc',
        cursor: 'pointer',
        padding: '10px 15px',
    }),
};

const ClipsComponent = () => {
    const [topStreamers, setTopStreamers] = useState([]);
    const [gameName, setGameName] = useState('');
    const [games, setGames] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [clipView, setClipView] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`${URL}/games/top`, ApiConfig)
            .then(response => {
                setGames(response.data.data);
            })
            .catch(error => console.log(error));
    }, []);

    const handleChange = option => {
        setSelectedOption(option);
        getClips(option.value, option.value);
    };

    const getClips = (selectedGameId, iki) => {
        setLoading(true);
        axios.get(`${URL}/clips?game_id=${selectedGameId}`, ApiConfig)
            .then(response => {
                let dataArray = response.data.data.map(game => ({
                    ...game,
                    box_art_url: game.thumbnail_url.replace('{width}', '300').replace('{height}', '300')
                }));
                setTopStreamers(dataArray);
            })
            .catch(error => console.log(error));

        axios.get(`${URL}/games?id=${iki}`, ApiConfig)
            .then(response => {
                if(response.data.data.length > 0) {
                    setGameName(response.data.data[0].name);
                }
                setLoading(false);
            })
            .catch(error => console.log(error));
    };

    const openStream = (embedUrl) => {
        setClipView(embedUrl);
        setOpenModal(true);
    };

    return (
        <div className="component-container">
            {openModal && (
                <div className="modern-modal-overlay" onClick={() => setOpenModal(false)}>
                    <div className="modern-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setOpenModal(false)}>✕</button>
                        <iframe title={gameName} className="resp-iframe" src={clipView} allowFullScreen={true} width="100%" height="600" style={{border: 'none'}} />
                    </div>
                </div>
            )}

            <div className="section-container">
                <h2 className="section-title">Select a Game</h2>
                <div style={{ marginBottom: '2rem' }}>
                    <Select
                        value={selectedOption}
                        onChange={handleChange}
                        options={games.map(game => ({ label: game.name, value: game.id }))}
                        styles={customStyles}
                        placeholder="Search for a game..."
                    />
                </div>
                
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '4rem 0' }}>
                        <Rings height="100" width="100" color="#8b5cf6" ariaLabel="loading" />
                    </div>
                ) : (
                    gameName && (
                        <div className="section-container">
                            <h3 className="section-title">Most Popular Clips for {gameName}</h3>
                            <p className="section-subtitle">Click to watch the clip</p>
                            <div className="slider-container">
                                {topStreamers.length > 0 ? (
                                    <Slider {...SliderSettings}>
                                        {topStreamers.map((streamer, i) => (
                                            <div key={i} className="slider-item">
                                                <div className="modern-card">
                                                    <div className="img-wrapper" onClick={() => openStream(streamer.embed_url)}>
                                                        <img src={streamer.box_art_url} alt={streamer.user_name} />
                                                        <div className="play-overlay">
                                                           <span>▶ Play</span>
                                                        </div>
                                                    </div>
                                                    <div className="card-info" onClick={() => openStream(streamer.embed_url)}>
                                                        <h5 className="card-title">{streamer.title}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>
                                ) : (
                                    <p className="loading-text">No clips found.</p>
                                )}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ClipsComponent;