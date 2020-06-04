import React from 'react';
import Header from '../Nav/Header';
import TodayDetails from '../Today/TodayDetails';

const TodayR=()=> {
    return (
        <div>
            <Header/>
            <TodayDetails detail='todayRacing'/>
        </div>
    )
}
export default TodayR;
