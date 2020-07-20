import nextData from "../data/nextToGo.json";
import nextDataHome from "../data/nexttogoHome.json";
import meetingDetailsAll from "../data/meetingDetailsAll.json";
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


export const fetchTodayRacing =  () => {
  return function (dispatch) {
    
    dispatch({
      type: 'FETCH_TODAY_RACING',
      payload: meetingDetailsAll
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

export const fetchPathParams =  (pathParam) => {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_PATH_PARAMS',
      payload: pathParam
    });
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



export const addBetSlipData =  (betSlipind) => {
  return function (dispatch) {
    dispatch({
      type: 'ADD_BET_SLIP_DATA',
      payload: betSlipind
    });
  }
};

export const remainingBetSlipData =  (remaining) => {
  return function (dispatch) {
    dispatch({
      type: 'REMAINING_BET_SLIP_DATA',
      payload: remaining
    });
  }
};

export const deleteBetSlipData =  (betSlipDelete) => {
  return function (dispatch) {
    dispatch({
      type: 'DELETE_BET_SLIP_DATA',
      payload: betSlipDelete
    });
  }
};

export const betSlipScreen =  (screen) => {
  return function (dispatch) {
    dispatch({
      type: 'BET_SLIP_SCREEN',
      payload: screen
    });
  }
};

export const countBetSlipData =  (count) => {
  return function (dispatch) {
    dispatch({
      type: 'COUNT_BET_SLIP_DATA',
      payload: count
    });
  } 
};
export const postWinPlaceBets =  (betData) => {
  return function (dispatch) {
    dispatch({
      type: 'POST_WIN_PLACE',
      payload: betData
    });
  }
};

export const allBetSlipData =  (dataAll) => {
  return function (dispatch) {
    dispatch({
      type: 'ALL_BET_SLIP_DATA',
      payload: dataAll
    });
  }
};

// export const deleteBetSlipData =  (betSlipind) => {
//   return function (dispatch) {
//     dispatch({
//       type: 'DELETE_BET_SLIP_DATA',
//       payload: betSlipind
//     });
//   }
// };
// export const deleteAllBetSlipData =  (betSlipind) => {
//   return function (dispatch) {
//     dispatch({
//       type: 'DELETE_ALL_BET_SLIP_DATA',
//       payload: betSlipind
//     });
//   }
// };
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