import React from 'react'
import Header from '../Nav/Header';
import NextList from '../Next/NextList';
import RaceDetails from '../RaceDetail/RaceDetails';
import "./RaceDetails.css"
const RaceDetailsPage=()=> {
    return (
        <div>
            <Header/>
            <NextList/>
            <RaceDetails/>
        </div>
    )
}

export default RaceDetailsPage
