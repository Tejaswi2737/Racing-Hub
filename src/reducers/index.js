import {combineReducers} from 'redux';
import nextReducer from './nextReducer';
import todayRacing from './todayRacing';
import todayRacingGrey from './todayRacingGrey';
import todayRacingHarness from './todayRacingHarness';

export default combineReducers({
    next: nextReducer,
    todayRacing: todayRacing,
    todayRacingGrey:todayRacingGrey,
    todayRacingHarness:todayRacingHarness
});