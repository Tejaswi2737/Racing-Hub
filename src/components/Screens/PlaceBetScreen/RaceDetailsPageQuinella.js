import React,{useState,useEffect,useRef} from 'react';
import { connect } from 'react-redux';

import { fetchNextRace } from "../../../actions";


import Header from '../../Nav/Header';
import NextList from '../../Next/NextList';
import RaceDetails from '../../RaceDetail/RaceDetails';

import "./RaceDetails.css";

const RaceDetailsPageQuinella=(props,ownProps)=> {
    props.fetchNextRace();
    const [showLoading, setShowLoading] = useState(false)
    const timerToClearSomewhere = useRef(false) //now you can pass timer to another component
    useEffect(
       () => {
         timerToClearSomewhere.current = setInterval(() => setShowLoading(true), 800)
         return () => {
           clearInterval(timerToClearSomewhere.current)
         }
       },
       [showLoading]
     )
     setTimeout(()=>{
        setShowLoading(false)
        return () => {
            clearInterval(timerToClearSomewhere.current)
          }
     },1000)
    return (
        <div>
            <Header/>
            <NextList next={props.next}/>
            <RaceDetails slot={props.location.slot} place={props.location.place} type="Quinella"/>
        </div>
    )
};

const mapStateToProps=(state,ownProps)=> {
    return{ next:state.next,
      slot:ownProps.slot,
      place:ownProps.place
    }
}
export default connect(mapStateToProps, { fetchNextRace } )(RaceDetailsPageQuinella);