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

// import React,{useState,useEffect}  from 'react';
// import Moment from 'react-moment';
// import 'moment-timezone';

// useInterval(()=>{

// const  App= ()=> {
//     const [time, settime] = useState('')
//         return (
// //             <div>

// //             </div>
// //         );
// // }
// // export default App
// import React, { useState, useEffect, useRef } from "react";
// import ReactDOM from "react-dom";
// import Moment from 'react-moment';
// import 'moment-timezone';
// function App() {
//   const [times, settime] = useState("");
//   var val=1000
//   useInterval(() => {
//     settime(
//     <Moment date="2020-06-09T02:45:00.000Z"
//     durationFromNow/>)
//     if (times.length>5) {
//       val=1000
//     } else{
//       val=1000*60
//     }
//   },val);

//   return (
//     <>
//   <h1>{times}</h1>
//   <h1>{times}</h1>
//   </>
//   )
//   ;
// }

// function useInterval(callback, delay) {
//   const savedCallback = useRef();

//   // Remember the latest function.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }

// export default App;
