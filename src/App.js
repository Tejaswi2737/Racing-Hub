import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import history from "./history";
import NextScreen from './components/Screens/NextScreen';
import TodayR from './components/Screens/TodayR';
import TodayG from './components/Screens/TodayG';
import TodayH from './components/Screens/TodayH';
import RaceDetailsPage from './components/Screens/RaceDetailsPage';
import Home from './components/Screens/Home';

function App() {
  return (
    <Router history={history}>
      <div>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/next-to-go" exact component={NextScreen}/>
            <Route path="/Today/R" exact component={TodayR}/> 
            <Route path="/Today/G" exact component={TodayG}/> 
            <Route path="/Today/H" exact component={TodayH}/> 
            <Route path="/RaceDetail" exact component={RaceDetailsPage}/>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
