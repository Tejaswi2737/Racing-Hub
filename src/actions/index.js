// import axios from "axios"


// export const fetchTodayRacing =  () => {
//   return function(dispatch) {
//     return axios.get("https://firebasestorage.googleapis.com/v0/b/betdata123.appspot.com/o/meetingDetailsAll.json?alt=media&token=16ad09ff-6424-4166-8356-2c9a1d89b8ed")
//     .then(({ data }) => {
//       dispatch({
//         type: 'FETCH_TODAY_RACING',
//         payload: data
//       });
//         });
//       }
// };

// export const fetchNextRace =  () => {
//   return function(dispatch) {
//     return axios.get("https://firebasestorage.googleapis.com/v0/b/betdata123.appspot.com/o/nextToGo.json?alt=media&token=6ab5cab9-98f7-40b6-b815-5d2d4e2e8962")
//       .then(({ data }) => {
//         dispatch({
//           type: 'FETCH_NEXT_RACE',
//           payload: data
//         });
//           });
//   };
// };

// export const fetchMeetingDetails =  () => {
//   return function(dispatch) {
//     return axios.get("https://firebasestorage.googleapis.com/v0/b/betdata123.appspot.com/o/meetingDetails.json?alt=media&token=338c0769-ca58-4d86-87ad-f32229f2df76")
//     .then(({ data }) => {
//       dispatch({
//         type: 'FETCH_MEETING_DETAILS',
//         payload: data
//       });
//         });
//       }
// };

// export const fetchRaceDetails =  (props) => {
//   return function(dispatch) {
//     return axios.get(`https://firebasestorage.googleapis.com/v0/b/betdata123.appspot.com/o/raceDetailsResults${props}.json?alt=media&token=4cc631e9-84fc-4419-9560-68787ade170c`)
//     .then(({ data }) => {
//       dispatch({
//         type: 'FETCH_RACE_DETAIL',
//         payload: data
//       });
//         });
//       }
// };
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





export const addBetSlipData =  (betSlipind) => {
  return function (dispatch) {
    dispatch({
      type: 'ADD_BET_SLIP_DATA',
      payload: betSlipind
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


export const countBetSlipData =  (count) => {
  return function (dispatch) {
    dispatch({
      type: 'COUNT_BET_SLIP_DATA',
      payload: count
    });
  } 
};


//ACTIONS_PLACE_REPEATED_BLOCKS


export const remainingBetSlipData =  (remaining) => {
  return function (dispatch) {
    dispatch({
      type: 'REMAINING_BET_SLIP_DATA',
      payload: remaining
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
export const deleteSingleBet =  (deleteSingle) => {
  return function (dispatch) {
    dispatch({
      type: 'DELETE_SINGLE_BET',
      payload: deleteSingle
    });
  }
};
export const deleteAllBets =  (deleteAll) => {
  return function (dispatch) {
    dispatch({
      type: 'DELETE_All_BET',
      payload: deleteAll
    });
  }
};

//Quinella

export const remainingBetSlipDataQuinella =  (remaining) => {
  return function (dispatch) {
    dispatch({
      type: 'REMAINING_BET_SLIP_DATA_QUINELLA',
      payload: remaining
    });
  }
};

export const betSlipScreenQuinella =  (screen) => {
  return function (dispatch) {
    dispatch({
      type: 'BET_SLIP_SCREEN_QUINELLA',
      payload: screen
    });
  }
};


export const postWinPlaceBetsQuinella =  (betData) => {
  return function (dispatch) {
    dispatch({
      type: 'POST_WIN_PLACE_QUINELLA',
      payload: betData
    });
  }
};

export const allBetSlipDataQuinella =  (dataAll) => {
  return function (dispatch) {
    dispatch({
      type: 'ALL_BET_SLIP_DATA_QUINELLA',
      payload: dataAll
    });
  }
};
export const deleteSingleBetQuinella =  (deleteSingle) => {
  return function (dispatch) {
    dispatch({
      type: 'DELETE_SINGLE_BET_QUINELLA',
      payload: deleteSingle
    });
  }
};
export const deleteAllBetsQuinella =  (deleteAll) => {
  return function (dispatch) {
    dispatch({
      type: 'DELETE_All_BET_QUINELLA',
      payload: deleteAll
    });
  }
};

// Trifecta

export const remainingBetSlipDataTrifecta =  (remaining) => {
  return function (dispatch) {
    dispatch({
      type: 'REMAINING_BET_SLIP_DATA_TRIFECTA',
      payload: remaining
    });
  }
};

export const betSlipScreenTrifecta =  (screen) => {
  return function (dispatch) {
    dispatch({
      type: 'BET_SLIP_SCREEN_TRIFECTA',
      payload: screen
    });
  }
};


export const postWinPlaceBetsTrifecta =  (betData) => {
  return function (dispatch) {
    dispatch({
      type: 'POST_WIN_PLACE_TRIFECTA',
      payload: betData
    });
  }
};

export const allBetSlipDataTrifecta =  (dataAll) => {
  return function (dispatch) {
    dispatch({
      type: 'ALL_BET_SLIP_DATA_TRIFECTA',
      payload: dataAll
    });
  }
};
export const deleteSingleBetTrifecta =  (deleteSingle) => {
  return function (dispatch) {
    dispatch({
      type: 'DELETE_SINGLE_BET_TRIFECTA',
      payload: deleteSingle
    });
  }
};
export const deleteAllBetsTrifecta =  (deleteAll) => {
  return function (dispatch) {
    dispatch({
      type: 'DELETE_All_BET_TRIFECTA',
      payload: deleteAll
    });
  }
};

// FIRST4

export const remainingBetSlipDataFirst4 =  (remaining) => {
  return function (dispatch) {
    dispatch({
      type: 'REMAINING_BET_SLIP_DATA_FIRST4',
      payload: remaining
    });
  }
};

export const betSlipScreenFirst4 =  (screen) => {
  return function (dispatch) {
    dispatch({
      type: 'BET_SLIP_SCREEN_FIRST4',
      payload: screen
    });
  }
};


export const postWinPlaceBetsFirst4 =  (betData) => {
  return function (dispatch) {
    dispatch({
      type: 'POST_WIN_PLACE_FIRST4',
      payload: betData
    });
  }
};

export const allBetSlipDataFirst4 =  (dataAll) => {
  return function (dispatch) {
    dispatch({
      type: 'ALL_BET_SLIP_DATA_FIRST4',
      payload: dataAll
    });
  }
};
export const deleteSingleBetFirst4 =  (deleteSingle) => {
  return function (dispatch) {
    dispatch({
      type: 'DELETE_SINGLE_BET_FIRST4',
      payload: deleteSingle
    });
  }
};
export const deleteAllBetsFirst4 =  (deleteAll) => {
  return function (dispatch) {
    dispatch({
      type: 'DELETE_All_BET_FIRST4',
      payload: deleteAll
    });
  }
};

// EXACTA

export const remainingBetSlipDataExacta =  (remaining) => {
  return function (dispatch) {
    dispatch({
      type: 'REMAINING_BET_SLIP_DATA_EXACTA',
      payload: remaining
    });
  }
};

export const betSlipScreenExacta =  (screen) => {
  return function (dispatch) {
    dispatch({
      type: 'BET_SLIP_SCREEN_EXACTA',
      payload: screen
    });
  }
};


export const postWinPlaceBetsExacta =  (betData) => {
  return function (dispatch) {
    dispatch({
      type: 'POST_WIN_PLACE_EXACTA',
      payload: betData
    });
  }
};

export const allBetSlipDataExacta =  (dataAll) => {
  return function (dispatch) {
    dispatch({
      type: 'ALL_BET_SLIP_DATA_EXACTA',
      payload: dataAll
    });
  }
};
export const deleteSingleBetExacta =  (deleteSingle) => {
  return function (dispatch) {
    dispatch({
      type: 'DELETE_SINGLE_BET_EXACTA',
      payload: deleteSingle
    });
  }
};
export const deleteAllBetsExacta =  (deleteAll) => {
  return function (dispatch) {
    dispatch({
      type: 'DELETE_All_BET_EXACTA',
      payload: deleteAll
    });
  }
};

// DUET

export const remainingBetSlipDataDuet =  (remaining) => {
  return function (dispatch) {
    dispatch({
      type: 'REMAINING_BET_SLIP_DATA_DUET',
      payload: remaining
    });
  }
};

export const betSlipScreenDuet =  (screen) => {
  return function (dispatch) {
    dispatch({
      type: 'BET_SLIP_SCREEN_DUET',
      payload: screen
    });
  }
};


export const postWinPlaceBetsDuet =  (betData) => {
  return function (dispatch) {
    dispatch({
      type: 'POST_WIN_PLACE_DUET',
      payload: betData
    });
  }
};

export const allBetSlipDataDuet =  (dataAll) => {
  return function (dispatch) {
    dispatch({
      type: 'ALL_BET_SLIP_DATA_DUET',
      payload: dataAll
    });
  }
};
export const deleteSingleBetDuet =  (deleteSingle) => {
  return function (dispatch) {
    dispatch({
      type: 'DELETE_SINGLE_BET_DUET',
      payload: deleteSingle
    });
  }
};
export const deleteAllBetsDuet =  (deleteAll) => {
  return function (dispatch) {
    dispatch({
      type: 'DELETE_All_BET_DUET',
      payload: deleteAll
    });
  }
};
