import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.scss';
import Home from './Pages/Home'
import Clips from './Pages/Clips'
import Browse from './Pages/Browse'
import BrowseByGames from './Pages/BrowseByGames'
import NotFound from './Components/NotFound'
class App extends Component{
  render() {
  return (
    <Router>
      <div>
        <Switch>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/browse"} component={Browse}/>
            <Route path={"/browse/games/:id"} component={BrowseByGames}/> 
            <Route exact path={"/clips"} component={Clips}/>
            <Route component={NotFound} />
          </Switch>
       </div>
    </Router>
  );
}
}

export default App;
