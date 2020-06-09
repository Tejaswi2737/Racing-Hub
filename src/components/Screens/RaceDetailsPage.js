import React from 'react'
import Header from '../Nav/Header';
import NextList from '../Next/NextList';
import RaceDetails from '../RaceDetail/RaceDetails';
import "./RaceDetails.css"
const RaceDetailsPage=(props)=> {
    return (
        <div>
            <Header/>
            <NextList/>
            <RaceDetails slot={props.location.slot} place={props.location.place}/>
        </div>
    )
}

export default RaceDetailsPage
