import React from 'react'
import Header from '../Nav/Header';
import NextList from '../Next/NextList';
import RaceDetails from '../RaceDetail/RaceDetails';
import "./RaceDetails.css"
const RaceDetailsPage=(props)=> {
    console.log(props.location.state,props.location.place)
    return (
        <div>
            <Header/>
            <NextList/>
            <RaceDetails/>
        </div>
    )
}

export default RaceDetailsPage
