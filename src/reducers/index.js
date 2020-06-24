import {combineReducers} from 'redux';
import nextReducer from './nextReducer';
import nextReducerHome from './nextReducerHome';

import todayRacing from './todayRacing';
import racingDetail from './racingDetail';
import meetingDetails from './meetingDetails';

import winPlaceBetreducer from "./winPlaceBetreducer";
import betSlipInd from "./betSlipInd";

export default combineReducers({
    next: nextReducer,
    nextHome:nextReducerHome,
    todayRacing: todayRacing,
    racingDetail: racingDetail,
    meetingDetails: meetingDetails,
    winPlaceBet: winPlaceBetreducer,
    betSlipInd: betSlipInd
});