import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { hot } from 'react-hot-loader/root';


import history from "./history";
import NextScreen from './components/Screens/NextScreen';
import TodayR from './components/Screens/TodayR';
import TodayG from './components/Screens/TodayG';
import TodayH from './components/Screens/TodayH';
import Home from './components/Screens/Home';


import RaceDetailsPageWin from './components/Screens/PlaceBetScreen/RaceDetailsPageWin';
import RaceDetailsPageWinQuinella from './components/Screens/PlaceBetScreen/RaceDetailsPageQuinella';
import RaceDetailsPageWinTrifecta from './components/Screens/PlaceBetScreen/RaceDetailsPageTrifecta';
import RaceDetailsPageWinFirst4 from './components/Screens/PlaceBetScreen/RaceDetailsPageFirst4';
import RaceDetailsPageWinExacta from './components/Screens/PlaceBetScreen/RaceDetailsPageExacta';
import RaceDetailsPageWinDuet from './components/Screens/PlaceBetScreen/RaceDetailsPageDuet';
import MobileBetSlipScreen from './components/Screens/MobileBetSlipScreen';

function App() {
  return (
    <Router history={history} basename={process.env.PUBLIC_URL}>
      <div>
          <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/next-to-go" exact component={NextScreen}/>
              <Route path="/:date/R" exact component={TodayR}/> 
              <Route path="/:date/G" exact component={TodayG}/> 
              <Route path="/:date/H" exact component={TodayH}/> 
              <Route path="/:date/:place/:code/:type/:slot/Win" exact component={RaceDetailsPageWin}/>
              <Route path="/:date/betSlip" exact component={MobileBetSlipScreen}/>
              <Route path="/:date/:place/:code/:type/:slot/Quinella" exact component={RaceDetailsPageWinQuinella}/>
              <Route path="/:date/:place/:code/:type/:slot/Trifecta" exact component={RaceDetailsPageWinTrifecta}/>
              <Route path="/:date/:place/:code/:type/:slot/First4" exact component={RaceDetailsPageWinFirst4}/>
              <Route path="/:date/:place/:code/:type/:slot/Exacta" exact component={RaceDetailsPageWinExacta}/>
              <Route path="/:date/:place/:code/:type/:slot/Duet" exact component={RaceDetailsPageWinDuet}/>  
          </Switch>
      </div>
    </Router>
  );
};

export default hot(App);
