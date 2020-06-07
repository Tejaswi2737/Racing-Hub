import nextData from "../data/nextToGo.json";
import todayRacing from "../data/todayRacing.json";
import todayRacingGrey from "../data/todayRacingGrey.json";
import todayRacingHarness from "../data/todayRacingHarness.json";
import raceDetailsResults1 from "../data/raceDetailsResults1.json";
import raceDetailsResults2 from "../data/raceDetailsResults2.json";
import raceDetailsResults3 from "../data/raceDetailsResults3.json";
import raceDetailsResults4 from "../data/raceDetailsResults4.json";
import raceDetailsResults5 from "../data/raceDetailsResults5.json";
import raceDetailsResults6 from "../data/raceDetailsResults6.json";
import meetingDetails from "../data/meetingDetails.json";
import RaceResults_Format from "../data/RaceResults_Format.json";

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
      data=RaceResults_Format;
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
    default:
      data= RaceResults_Format;
      break;
  };
  return function (dispatch) {
    dispatch({
      type: 'FETCH_RACE_DETAIL',
      payload: data
    })
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