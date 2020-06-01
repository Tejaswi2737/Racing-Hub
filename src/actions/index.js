import nextData from "../data/nextToGo.json";
import todayRacing from "../data/todayRacing.json";
import todayRacingGrey from "../data/todayRacingGrey.json";
import todayRacingHarness from "../data/todayRacingHarness.json";

export const fetchTodayRacing =  () => {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_TODAY_RACING',
      payload: todayRacing
    });
  }
};
export const fetchTodayGrey =  () => {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_TODAY_GREY',
      payload: todayRacingGrey
    });
  }
};
export const fetchTodayHarness =  () => {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_TODAY_HARNESS',
      payload: todayRacingHarness
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

// async dispatch => {
//   const response= await "../data/todayRacingHarness.json"
//   dispatch({
//       type:'FETCH_TODAY_HARNESS',
//       payload:response
//   })
// };