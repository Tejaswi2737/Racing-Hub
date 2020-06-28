import React,{useState,useEffect,useRef} from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import { fetchNextRace,allBetSlipData,betSlipScreen } from "../../actions";

import Header from '../Nav/Header';
import NextRace from '../Next/NextRace';
import NextList from '../Next/NextList';
import BetSlipHome from '../BetSlip/BetSlipHome';
import RespHeader from '../Nav/RespHeader';
import "../Next/NextRace.css"
const NextScreen=(props) =>{
    props.fetchNextRace();
    props.betSlipScreen(false)
    const [firstTime, setfirstTime] = useState();
    const [showLoading, setShowLoading] = useState(false)
    const timerToClearSomewhere = useRef(false) //now you can pass timer to another component
    useEffect(() => {
        if (props.next.length>0){
            {props.next[0].raceStartTime?setfirstTime(Date.now()-new Date(props.next[0].raceStartTime)):setfirstTime()}
        }
    }, [props.next]);
    useEffect(
        () => {
          timerToClearSomewhere.current = setInterval(() => setShowLoading(true), 800)
          return () => {
            clearInterval(timerToClearSomewhere.current)
          }
        },
        [showLoading]
      );
   
      setTimeout(()=>{
         setShowLoading(false)
         return () => {
             clearInterval(timerToClearSomewhere.current)
           }
      },firstTime);
    return (
            <>
                <MediaQuery query='(min-width: 800px)'>
                <SimpleBar style={{ maxHeight: '100vh' }}>

                    <ui-view>
                        <RespHeader/>
                        <NextList next={props.next}/>
                        <main className="page-content">
                            <div className="left-column">
                                <ui-view>  
                                    <nav className="menuItems">
                                        <NextRace next={props.next}/>
                                    </nav>
                                </ui-view>
                            </div>
                            <BetSlipHome/>
                        </main>
                    </ui-view>  
                    </SimpleBar>        
                </MediaQuery>
                <MediaQuery query='(max-width: 800px)'>
                <SimpleBar style={{ maxHeight: '100vh' }}>

                    <Header/>
                    <main className="page-items">
                        <NextList next={props.next}/>
                        <NextRace next={props.next}/>
                    </main>
                    </SimpleBar>
                </MediaQuery>
            </>
    )
}
const mapStateToProps=(state)=> {
    return{ 
        next:state.next,
        screenStatus:state.screenStatus,

    }
}
export default connect(mapStateToProps, { 
    fetchNextRace,
    betSlipScreen
 } )(NextScreen);