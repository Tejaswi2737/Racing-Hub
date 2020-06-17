import React,{useState,useEffect,useRef} from 'react';
import { connect } from 'react-redux';

import { fetchNextRace } from "../../actions";


import Header from '../Nav/Header'
import TodayDetails from '../Today/TodayDetails'
import NextList from '../Next/NextList'

const TodayH=(props)=> {
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
        })
    return (
        <div>
            <Header/>
            <NextList next={props.next}/>
            <TodayDetails detail='todayRacingHarness'/>
        </div>
    )
}
const mapStateToProps=(state)=> {
    return{ next:state.next}
}
export default connect(mapStateToProps, { fetchNextRace } )(TodayH);
// export default TodayG;
