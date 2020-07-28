import React,{useState,useEffect,useRef} from 'react';
import { Link} from "react-router-dom";

import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import { fetchNextRace,addBetSlipData,betSlipScreen,remainingBetSlipData } from "../../actions";
import MenuView from "../Nav/Menu";

import Header from '../Nav/Header';
import NextRace from '../Next/NextRace';
import NextList from '../Next/NextList';
import BetSlipHome from '../BetSlip/BetSlipHome';
import RespHeader from '../Nav/RespHeader';
import "../Next/NextRace.css"
const NextScreen=(props) =>{
    useEffect(() => {
        props.fetchNextRace();
      }, []);
    props.betSlipScreen(false)
    const [firstTime, setfirstTime] = useState();
    const [showLoading, setShowLoading] = useState(false)
    const timerToClearSomewhere = useRef(false) //now you can pass timer to another component
    useEffect(() => {
        if (performance.navigation.type === 1 && window.innerWidth<980) {
            console.log(JSON.parse(window.localStorage.getItem('betSlip')))

            props.remainingBetSlipData(JSON.parse(window.localStorage.getItem('betSlip')))
        }
        // if (performance.navigation.type === 1 && window.innerWidth>980) {
        //     console.log(JSON.parse(window.localStorage.getItem('betSlip')))
        //     props.addBetSlipData(JSON.parse(window.localStorage.getItem('betSlip')))
        // }
    }, [performance.navigation.type]);
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const date=formatDate(Date.now())
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
                <MediaQuery query='(min-width: 980px)'>
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
                <MediaQuery query='(max-width: 980px)'>
                <SimpleBar style={{ maxHeight: '100vh' }}>
                <MenuView/>
                    <Header/>
                    <main className="page-items">
                        <NextList next={props.next}/>
                        <NextRace next={props.next}/>
                        <Link to={`/${date}/betSlip`}
                        id="mobile-betSlip-button">
                            <span>
                                B-S
                            </span>
                        </Link> 
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
        remainingBetSlip:state.remainingBetSlip,
        betSlipInd:state.betSlipInd,
    }
}
export default connect(mapStateToProps, { 
    fetchNextRace,
    betSlipScreen,
    remainingBetSlipData,
    addBetSlipData
 } )(NextScreen);