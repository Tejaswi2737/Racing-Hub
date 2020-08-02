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


import allBetSlipDataTrifectareducer from "./allBetSlipDataTrifecta";
import screenStatusTrifectaReducers from "./screenStatusReducersTrifecta";
import postWinPlaceTrifectaReducer from "./postWinPlaceTrifecta";
import remainingBetSlipTrifectaReducer from  "./remainingBetSlipDataTrifecta";
import deleteSingleBetTrifectaReducer from "./deleteSingleBetTrifecta";
import deleteAllBetsTrifectaReducer from "./deleteAllBetsTrifecta";


import allBetSlipDataFirst4reducer from "./allBetSlipDataFirst4";
import screenStatusFirst4Reducers from "./screenStatusReducersFirst4";
import postWinPlaceFirst4Reducer from "./postWinPlaceFirst4";
import remainingBetSlipFirst4Reducer from  "./remainingBetSlipDataFirst4";
import deleteSingleBetFirst4Reducer from "./deleteSingleBetFirst4";
import deleteAllBetsFirst4Reducer from "./deleteAllBetsFirst4";


import allBetSlipDataDuetreducer from "./allBetSlipDataDuet";
import screenStatusDuetReducers from "./screenStatusReducersDuet";
import postWinPlaceDuetReducer from "./postWinPlaceDuet";
import remainingBetSlipDuetReducer from  "./remainingBetSlipDataDuet";
import deleteSingleBetDuetReducer from "./deleteSingleBetDuet";
import deleteAllBetsDuetReducer from "./deleteAllBetsDuet";


import allBetSlipDataExactareducer from "./allBetSlipDataExacta";
import screenStatusExactaReducers from "./screenStatusReducersExacta";
import postWinPlaceExactaReducer from "./postWinPlaceExacta";
import remainingBetSlipExactaReducer from  "./remainingBetSlipDataExacta";
import deleteSingleBetExactaReducer from "./deleteSingleBetExacta";
import deleteAllBetsExactaReducer from "./deleteAllBetsExacta";

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
    deleteAllBetQuinella:deleteAllBetsQuinellaReducer,

    allBetSlipTrifecta: allBetSlipDataTrifectareducer,
    screenStatusTrifecta:screenStatusTrifectaReducers,
    remainingBetSlipTrifecta:remainingBetSlipTrifectaReducer,
    postWinPlaceTrifecta:postWinPlaceTrifectaReducer,
    deleteSingleBetTrifecta:deleteSingleBetTrifectaReducer,
    deleteAllBetTrifecta:deleteAllBetsTrifectaReducer,


    allBetSlipFirst4: allBetSlipDataFirst4reducer,
    screenStatusFirst4:screenStatusFirst4Reducers,
    remainingBetSlipFirst4:remainingBetSlipFirst4Reducer,
    postWinPlaceFirst4:postWinPlaceFirst4Reducer,
    deleteSingleBetFirst4:deleteSingleBetFirst4Reducer,
    deleteAllBetFirst4:deleteAllBetsFirst4Reducer,

    allBetSlipDuet: allBetSlipDataDuetreducer,
    screenStatusDuet:screenStatusDuetReducers,
    remainingBetSlipDuet:remainingBetSlipDuetReducer,
    postWinPlaceDuet:postWinPlaceDuetReducer,
    deleteSingleBetDuet:deleteSingleBetDuetReducer,
    deleteAllBetDuet:deleteAllBetsDuetReducer,

    allBetSlipExacta: allBetSlipDataExactareducer,
    screenStatusExacta:screenStatusExactaReducers,
    remainingBetSlipExacta:remainingBetSlipExactaReducer,
    postWinPlaceExacta:postWinPlaceExactaReducer,
    deleteSingleBetExacta:deleteSingleBetExactaReducer,
    deleteAllBetExacta:deleteAllBetsExactaReducer
});