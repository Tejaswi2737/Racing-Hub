import React from 'react'
import Header from '../Nav/Header';
import NextList from '../Next/NextList';
import RaceDetails from '../RaceDetail/RaceDetails';
import "./RaceDetails.css"
const RaceDetailsPage=(props)=> {
    console.log(props.location.slot)
    return (
        <div>
            <Header/>
            <NextList/>
            <RaceDetails slot={props.location.slot}/>
        </div>
    )
}

export default RaceDetailsPage
