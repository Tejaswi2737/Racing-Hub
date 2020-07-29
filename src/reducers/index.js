import {combineReducers} from 'redux';
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";

import nextReducer from './nextReducer';
import nextReducerHome from './nextReducerHome';

import todayRacing from './todayRacing';
import racingDetail from './racingDetail';
import meetingDetails from './meetingDetails';
import pathParams from './pathParamReducer';



import winPlaceBetreducer from "./winPlaceBetreducer";
import betSlipIndreducer from "./betSlipInd";
import countBetSlipReducer from  "./countBetSlipData"
import deleteBetSlipReducer from  "./deleteBetSlip";


import allBetSlipDatareducer from "./allBetSlipData";
import screenStatusReducers from "./screenStatusReducers";
import postWinPlaceReducer from "./postWinPlace";
import remainingBetSlipReducer from  "./remainingBetSlipData";
import deleteSingleBetReducer from "./deleteSingleBet";
import deleteAllBetsReducer from "./deleteAllBets";

import allBetSlipDataQuinellareducer from "./allBetSlipDataQuinella";
import screenStatusQuinellaReducers from "./screenStatusReducersquienlla";
import postWinPlaceQuinellaReducer from "./postWinPlacequinella";
import remainingBetSlipQuinellaReducer from  "./remainingBetSlipDataquinella";
import deleteSingleBetQuinellaReducer from "./deleteSingleBetquinella";
import deleteAllBetsQuinellaReducer from "./deleteAllBetsquinella";

export const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
});
export default combineReducers({
    next: nextReducer,
    nextHome:nextReducerHome,
    todayRacing: todayRacing,
    racingDetail: racingDetail,
    meetingDetails: meetingDetails,
    pathParams:pathParams,
    winPlaceBet: winPlaceBetreducer,
    betSlipInd: betSlipIndreducer,
    countBetSlip:countBetSlipReducer,
    deleteBetSlip:deleteBetSlipReducer,

    allBetSlip: allBetSlipDatareducer,
    screenStatus:screenStatusReducers,
    remainingBetSlip:remainingBetSlipReducer,
    postWinPlace:postWinPlaceReducer,
    deleteSingleBet:deleteSingleBetReducer,
    deleteAllBet:deleteAllBetsReducer,

    allBetSlipQuinella: allBetSlipDataQuinellareducer,
    screenStatusQuinella:screenStatusQuinellaReducers,
    remainingBetSlipQuinella:remainingBetSlipQuinellaReducer,
    postWinPlaceQuinella:postWinPlaceQuinellaReducer,
    deleteSingleBetQuinella:deleteSingleBetQuinellaReducer,
    deleteAllBetQuinella:deleteAllBetsQuinellaReducer
});