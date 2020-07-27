import axios from "axios"


export const fetchTodayRacing =  () => {
  return function(dispatch) {
    return axios.get("o/meetingDetailsAll.json?alt=media&token=16ad09ff-6424-4166-8356-2c9a1d89b8ed")
    .then(({ data }) => {
      dispatch({
        type: 'FETCH_TODAY_RACING',
        payload: data
      });
        });
      }
};

export const fetchNextRace =  () => {
  return function(dispatch) {
    return axios.get("/o/nextToGo.json?alt=media&token=6ab5cab9-98f7-40b6-b815-5d2d4e2e8962")
      .then(({ data }) => {
        dispatch({
          type: 'FETCH_NEXT_RACE',
          payload: data
        });
          });
  };
};

export const fetchMeetingDetails =  () => {
  return function(dispatch) {
    return axios.get("/o/meetingDetails.json?alt=media&token=338c0769-ca58-4d86-87ad-f32229f2df76")
    .then(({ data }) => {
      dispatch({
        type: 'FETCH_MEETING_DETAILS',
        payload: data
      });
        });
      }
};

export const fetchRaceDetails =  (props) => {
  return function(dispatch) {
    return axios.get(`/o/raceDetailsResults${props}.json?alt=media&token=4cc631e9-84fc-4419-9560-68787ade170c`)
    .then(({ data }) => {
      dispatch({
        type: 'FETCH_RACE_DETAIL',
        payload: data
      });
        });
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