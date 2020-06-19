import nextData from "../data/nextToGo.json";
import nextDataHome from "../data/nexttogoHome.json";

import todayRacing from "../data/todayRacing.json";
import todayRacingGrey from "../data/todayRacingGrey.json";
import todayRacingHarness from "../data/todayRacingHarness.json";


import raceDetailsResults1 from "../data/raceDetailsResults1.json";
import raceDetailsResults2 from "../data/raceDetailsResults2.json";
import raceDetailsResults3 from "../data/raceDetailsResults3.json";
import raceDetailsResults4 from "../data/raceDetailsResults4.json";
import raceDetailsResults5 from "../data/raceDetailsResults5.json";
import raceDetailsResults6 from "../data/raceDetailsResults6.json";
import raceDetailsResults7 from "../data/raceDetailsResults7.json";
import raceDetailsResults8 from "../data/raceDetailsResults8.json";
import raceDetailsResults9 from "../data/raceDetailsResults9.json";
import raceDetailsResults10 from "../data/raceDetailsResults10.json";
import raceDetailsResults11 from "../data/raceDetailsResults11.json";
import raceDetailsResults12 from "../data/raceDetailsResults12.json";
import meetingDetails from "../data/meetingDetails.json";


import winPlaceBet from "../data/win_place_bet.json";


export const fetchTodayRacing =  (props) => {
  var data={};
  switch(props) {
    case 'todayRacingHarness':
      data=todayRacingHarness;
      break;
    case 'todayRacingGrey':
      data=todayRacingGrey;
      break;
    case 'todayRacing':
      data=todayRacing
      break;
    default:
      data= null;
      break;
  };
  return function (dispatch) {
    dispatch({
      type: 'FETCH_TODAY_RACING',
      payload: data
    });
  }
};

export const fetchNextRace =  () => {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_NEXT_RACE',
      payload: nextData
    });
  }
};
export const fetchNextRaceHome =  () => {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_NEXT_RACE_HOME',
      payload: nextDataHome
    });
  }
};
export const fetchMeetingDetails =  () => {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_MEETING_DETAILS',
      payload: meetingDetails
    });
  }
};
export const fetchRaceDetails =  (props) => {
  var data={}
  switch(props) {
    case 1:
      data=raceDetailsResults1;
      break;
    case 2:
      data=raceDetailsResults2;
      break;
    case 3:
      data=raceDetailsResults3;
      break;
    case 4:
      data=raceDetailsResults4;
      break;
    case 5:
      data=raceDetailsResults5;
      break;
    case 6:
      data=raceDetailsResults6;
      break;   
    case 7:
      data=raceDetailsResults7;
      break;
    case 8:
        data=raceDetailsResults8;
        break;
    case 9:
        data=raceDetailsResults9;
        break;
    case 10:
        data=raceDetailsResults10;
        break;
    case 11:
        data=raceDetailsResults11;
        break;
    case 12:
        data=raceDetailsResults12;
        break;            
    default:
      data= null;
      break;
  };
  return function (dispatch) {
    dispatch({
      type: 'FETCH_RACE_DETAIL',
      payload: data
    })
  }
};


export const fetchWinPlaceBet =  () => {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_WIN_PLACE_BET',
      payload: winPlaceBet
    });
  }
};


// export const fetchTodayGrey =  () => {
//   return function (dispatch) {
//     dispatch({
//       type: 'FETCH_TODAY_GREY',
//       payload: todayRacingGrey
//     });
//   }
// };
// export const fetchTodayHarness =  () => {
//   return function (dispatch) {
//     dispatch({
//       type: 'FETCH_TODAY_HARNESS',
//       payload: todayRacingHarness
//     });
//   }
// };
// async dispatch => {
//   const response= await "../data/todayRacingHarness.json"
//   dispatch({
//       type:'FETCH_TODAY_HARNESS',
//       payload:response
//   })
// };