import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import history from "./history";

import Home from './components/Home';
import TodayR from './components/TodayR';
import TodayG from './components/TodayG';
import TodayH from './components/TodayH';


function App() {
  return (
    <Router>
      <div>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/Today/R" exact component={TodayR}/> 
            <Route path="/Today/G" exact component={TodayG}/> 
            <Route path="/Today/H" exact component={TodayH}/> 

        </Switch>
      </div>
    </Router>
  );
};

export default App;
