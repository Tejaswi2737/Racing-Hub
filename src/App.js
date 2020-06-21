import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { hot } from 'react-hot-loader/root';


import {BetSlipStore } from "./context/BetSlipContext"
import history from "./history";
import NextScreen from './components/Screens/NextScreen';
import TodayR from './components/Screens/TodayR';
import TodayG from './components/Screens/TodayG';
import TodayH from './components/Screens/TodayH';
import RaceDetailsPage from './components/Screens/RaceDetailsPage';
import Home from './components/Screens/Home';


import RaceDetailsPageWin from './components/Screens/PlaceBetScreen/RaceDetailsPageWin';
import RaceDetailsPageWinQuinella from './components/Screens/PlaceBetScreen/RaceDetailsPageQuinella';
import RaceDetailsPageWinTrifecta from './components/Screens/PlaceBetScreen/RaceDetailsPageTrifecta';
import RaceDetailsPageWinFirst4 from './components/Screens/PlaceBetScreen/RaceDetailsPageFirst4';
import RaceDetailsPageWinExacta from './components/Screens/PlaceBetScreen/RaceDetailsPageExacta';
import RaceDetailsPageWinDuet from './components/Screens/PlaceBetScreen/RaceDetailsPageDuet';

function App() {
  return (
    <Router history={history}>
      <div>
        <BetSlipStore>
          <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/next-to-go" exact component={NextScreen}/>
              <Route path="/Today/R" exact component={TodayR}/> 
              <Route path="/Today/G" exact component={TodayG}/> 
              <Route path="/Today/H" exact component={TodayH}/> 
              <Route path="/RaceDetail" exact component={RaceDetailsPage}/>
              <Route path="/RaceDetail/Win" exact component={RaceDetailsPageWin}/>
              <Route path="/RaceDetail/Quinella" exact component={RaceDetailsPageWinQuinella}/>
              <Route path="/RaceDetail/Trifecta" exact component={RaceDetailsPageWinTrifecta}/>
              <Route path="/RaceDetail/First4" exact component={RaceDetailsPageWinFirst4}/>
              <Route path="/RaceDetail/Exacta" exact component={RaceDetailsPageWinExacta}/>
              <Route path="/RaceDetail/Duet" exact component={RaceDetailsPageWinDuet}/>  
          </Switch>
        </BetSlipStore>
      </div>
    </Router>
  );
};

export default hot(App);
