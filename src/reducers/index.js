import {combineReducers} from 'redux';
import nextReducer from './nextReducer';
import nextReducerHome from './nextReducerHome';

import todayRacing from './todayRacing';
import racingDetail from './racingDetail';
import meetingDetails from './meetingDetails';

import winPlaceBetreducer from "./winPlaceBetreducer";
import betSlipIndreducer from "./betSlipInd";
import allBetSlipDatareducer from "./allBetSlipData";
import deleteBetSlipReducer from  "./deleteBetSlip";
import countBetSlipReducer from  "./countBetSlipData"


export default combineReducers({
    next: nextReducer,
    nextHome:nextReducerHome,
    todayRacing: todayRacing,
    racingDetail: racingDetail,
    meetingDetails: meetingDetails,
    winPlaceBet: winPlaceBetreducer,
    betSlipInd: betSlipIndreducer,
    allBetSlip: allBetSlipDatareducer,
    deleteBetSlip:deleteBetSlipReducer,
    countBetSlip:countBetSlipReducer
});