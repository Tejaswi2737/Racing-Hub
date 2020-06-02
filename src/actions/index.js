import nextData from "../data/nextToGo.json";
import todayRacing from "../data/todayRacing.json";
import todayRacingGrey from "../data/todayRacingGrey.json";
import todayRacingHarness from "../data/todayRacingHarness.json";

export const fetchTodayRacing =  (props) => {
  switch(props) {
    case 'todayRacingHarness':
      Response=todayRacingHarness;
      break;
    case 'todayRacingGrey':
      Response=todayRacingGrey;
      break;
    case 'todayRacing':
      Response=todayRacing
      break;
    default:
      Response= null;
      break;
  };
  return function (dispatch) {
    dispatch({
      type: 'FETCH_TODAY_RACING',
      payload: Response
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