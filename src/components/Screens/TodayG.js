import React,{useState,useEffect,useRef} from 'react';
import { Link} from "react-router-dom";

import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { 
    fetchNextRace,
    allBetSlipData,
    betSlipScreen,
    remainingBetSlipData,
    betSlipScreenQuinella,
    betSlipScreenDuet,
    betSlipScreenExacta,
    betSlipScreenTrifecta,
    betSlipScreenFirst4
 } from "../../actions";

import MenuView from "../Nav/Menu";

import Header from '../Nav/Header'
import TodayDetails from '../Today/TodayDetails'
import NextList from '../Next/NextList'
import BetSlipHome from '../BetSlip/BetSlipHome';
import RespHeader from '../Nav/RespHeader';

const TodayG=(props)=> {
    useEffect(() => {
      props.fetchNextRace();
    }, [])
    
    props.betSlipScreen(false)
    props.betSlipScreenQuinella(false)
    props.betSlipScreenDuet(false)
    props.betSlipScreenExacta(false)
    props.betSlipScreenFirst4(false)
    props.betSlipScreenTrifecta(false)
    useEffect(() => {
      if (performance.navigation.type === 1) {
          props.remainingBetSlipData(JSON.parse(window.localStorage.getItem('betSlip')))
      }
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
                              <TodayDetails detail='G'/>
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
              <NextList next={props.next}/>
              <TodayDetails detail='G'/>
              <Link to={`/${date}/betSlip`}
              id="mobile-betSlip-button">
                  <span>
                      B-S
                  </span>
              </Link> 
              </SimpleBar>
          </MediaQuery>
        </>
    );
}
const mapStateToProps=(state)=> {
    return{
      next:state.next,
      allBetSlip:state.allBetSlip,
      screenStatus:state.screenStatus,
      remainingBetSlip:state.remainingBetSlip,
    }
}
export default connect(mapStateToProps, { 
  fetchNextRace,
  allBetSlipData,
  betSlipScreen,
  betSlipScreenQuinella,
  remainingBetSlipData,
  betSlipScreenDuet,
  betSlipScreenExacta,
  betSlipScreenTrifecta,
  betSlipScreenFirst4
 } )(TodayG);
// export default TodayG;
