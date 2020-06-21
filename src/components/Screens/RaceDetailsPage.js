import React,{useState,useEffect,useRef} from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';


import { fetchNextRace } from "../../actions";


import Header from '../Nav/Header';
import NextList from '../Next/NextList';
import RaceDetails from '../RaceDetail/RaceDetails';

import "./RaceDetails.css";
import RespHeader from '../Nav/RespHeader';

const RaceDetailsPage=(props)=> {

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

              <MediaQuery query='(min-width: 980px)'>
                  <RespHeader/>
                  <NextList next={props.next}/>
                  <RaceDetails slot={props.location.slot} place={props.location.place}  type=""
                  bet_pool_fh_1={props.location.bet_pool_fh_1}
                  bet_pool_fh_2={props.location.bet_pool_fh_2}
                  />
              </MediaQuery>
              <MediaQuery query='(max-width: 980px)'>
                  <Header/>
                  <NextList next={props.next}/>
                  <RaceDetails slot={props.location.slot} place={props.location.place}  type=""
                  bet_pool_fh_1={props.location.bet_pool_fh_1}
                  bet_pool_fh_2={props.location.bet_pool_fh_2}
                  />
              </MediaQuery>     

        </div>
    )
};

const mapStateToProps=(state)=> {
    return{ next:state.next}
}
export default connect(mapStateToProps, { fetchNextRace } )(RaceDetailsPage);