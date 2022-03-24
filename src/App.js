import React, {Component} from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.scss';
import Home from './Pages/Home'
import Clips from './Pages/Clips'
import Browse from './Pages/Browse'
import BrowseByGames from './Pages/BrowseByGames'
import NotFound from './Components/NotFound'
export default function App() {
  return (



    <BrowserRouter>
  
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/browse" element={<Browse />}/>
            <Route path="/browse/games/:id" element={<BrowseByGames />}/> 
            <Route exact path="/clips" element={<Clips />}/>
            <Route element={<NotFound />} />
          </Routes>
   
    </BrowserRouter>
  
  );

  }


