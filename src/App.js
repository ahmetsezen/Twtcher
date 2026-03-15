import React, {Component} from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.scss';
import Header from './components/Header'
import Home from './pages/Home'
import Clips from './pages/Clips'
import Browse from './pages/Browse'
import BrowseByGames from './pages/BrowseByGames'
import NotFound from './components/NotFound'
import Footer from './components/Footer'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="page-content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/browse" element={<Browse />} />
            <Route path="/browse/games/:id" element={<BrowseByGames />} />
            <Route exact path="/clips" element={<Clips />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
