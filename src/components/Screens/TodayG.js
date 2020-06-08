import React from 'react'
import Header from '../Nav/Header'
import TodayDetails from '../Today/TodayDetails'
import NextList from '../Next/NextList'

const TodayG=()=> {
    return (
        <div>
            <Header/>
            <NextList/>
            <TodayDetails detail='todayRacingGrey'/>
        </div>
    )
}
export default TodayG;
