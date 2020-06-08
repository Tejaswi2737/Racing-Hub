import React from 'react';
import Header from '../Nav/Header';
import TodayDetails from '../Today/TodayDetails';
import NextList from '../Next/NextList'

const TodayR=()=> {
    return (
        <div>
            <Header/>
            <NextList/>
            <TodayDetails detail='todayRacing'/>
        </div>
    )
}
export default TodayR;
