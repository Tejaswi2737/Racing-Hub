import {combineReducers} from 'redux';
import nextReducer from './nextReducer';
import nextReducerHome from './nextReducerHome';

import todayRacing from './todayRacing';
import racingDetail from './racingDetail';
import meetingDetails from './meetingDetails';
import pathParams from './pathParamReducer';



import winPlaceBetreducer from "./winPlaceBetreducer";
import betSlipIndreducer from "./betSlipInd";
import allBetSlipDatareducer from "./allBetSlipData";
import screenStatusReducers from "./screenStatusReducers";
import postWinPlaceReducer from "./postWinPlace";

import deleteBetSlipReducer from  "./deleteBetSlip";
import remainingBetSlipReducer from  "./remainingBetSlipData";

import countBetSlipReducer from  "./countBetSlipData"


export default combineReducers({
    next: nextReducer,
    nextHome:nextReducerHome,
    todayRacing: todayRacing,
    racingDetail: racingDetail,
    meetingDetails: meetingDetails,
    pathParams:pathParams,
    winPlaceBet: winPlaceBetreducer,
    betSlipInd: betSlipIndreducer,
    allBetSlip: allBetSlipDatareducer,
    deleteBetSlip:deleteBetSlipReducer,
    screenStatus:screenStatusReducers,
    remainingBetSlip:remainingBetSlipReducer,
    countBetSlip:countBetSlipReducer,
    postWinPlace:postWinPlaceReducer
});