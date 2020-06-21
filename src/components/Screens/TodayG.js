import React,{useState,useEffect,useRef} from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import { fetchNextRace } from "../../actions";


import Header from '../Nav/Header'
import TodayDetails from '../Today/TodayDetails'
import NextList from '../Next/NextList'
import BetSlipHome from '../BetSlip/BetSlipHome';
import RespHeader from '../Nav/RespHeader';

const TodayG=(props)=> {
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
        <>
          <MediaQuery query='(min-width: 800px)'>
            <ui-view>
                <RespHeader/>
                <NextList next={props.next}/>
                <main className="page-content">
                    <div className="left-column">
                        <ui-view>
                            <nav className="menuItems">
                              <TodayDetails detail='todayRacingGrey'/>
                            </nav>
                        </ui-view>
                    </div>
                    <BetSlipHome/>
                </main>
            </ui-view>         
          </MediaQuery>
          <MediaQuery query='(max-width: 800px)'>
              <Header/>
              <NextList next={props.next}/>
              <TodayDetails detail='todayRacingGrey'/>
          </MediaQuery>
        </>
    );
}
const mapStateToProps=(state)=> {
    return{ next:state.next}
}
export default connect(mapStateToProps, { fetchNextRace } )(TodayG);
// export default TodayG;
