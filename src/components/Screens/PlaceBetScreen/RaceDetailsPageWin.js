import React,{useState,useEffect,useRef} from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import { fetchNextRace } from "../../../actions";


import Header from '../../Nav/Header';
import NextList from '../../Next/NextList';
import RaceDetails from '../../RaceDetail/RaceDetails';
import RespHeader from '../../Nav/RespHeader';

import "./RaceDetails.css";

const RaceDetailsPageWin=(props,ownProps)=> {
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
          <SimpleBar style={{ maxHeight: '100vh' }}>
              <MediaQuery query='(min-width: 980px)'>
                  <RespHeader/>
                  <NextList next={props.next}/>
                  <RaceDetails slot={props.location.slot} 
                              place={props.location.place}
                              code={props.location.code}
                              raceType={props.location.raceType} 
                              type="Win"/>
                  </MediaQuery>
              <MediaQuery query='(max-width: 980px)'>
                  <Header/>
                  <NextList next={props.next}/>
                  <RaceDetails slot={props.location.slot} 
                              place={props.location.place}
                              code={props.location.code}
                              raceType={props.location.raceType} 
                              type="Win"/>
              </MediaQuery>   
            </SimpleBar>
        </div>
    )
};

const mapStateToProps=(state,ownProps)=> {
    return{ 
      next:state.next,
    }
}
export default connect(mapStateToProps, { fetchNextRace } )(RaceDetailsPageWin);