import nextData from "../data/nextToGo.json";
import todayRacing from "../data/todayRacing.json";
import todayRacingGrey from "../data/todayRacingGrey.json";
import todayRacingHarness from "../data/todayRacingHarness.json";
import raceDetailsResults from "../data/RaceDetailsResults.json";

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
export const fetchRaceDetails =  (dispatch) => {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_RACE_DETAIL',
      payload: raceDetailsResults
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