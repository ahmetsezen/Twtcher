import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
class Header extends Component {
    render() {
        return (
                <header style={{marginBottom:25}}>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <Link to='' className="navbar-brand" style={{color:'#9147FF'}} to="/">Twitcher</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarcollapse" aria-controls="navbarcollapse" aria-expanded="false" aria-label="toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarcollapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item" >
                                <NavLink exact className="nav-link" to="/">
                                    Home
                                </NavLink>
                                </li>
                                <li className="nav-item" >
                                <NavLink className="nav-link" to="/browse">
                                    Browse
                                </NavLink>
                                </li>
                                <li className="nav-item">
                                <NavLink className="nav-link" to="/clips">
                                    Clips
                                </NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
        )
    }
}

export default Header