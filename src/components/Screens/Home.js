import React,{useState,useEffect,useRef} from 'react';

import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Link} from "react-router-dom";

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import Header from '../Nav/Header';
import RespHeader from '../Nav//RespHeader';
import MenuView from "../Nav/Menu";
import { remainingBetSlipData,allBetSlipData } from "../../actions";

import NextListHome from '../Home/NextListHome';
import BetSlipHome from '../BetSlip/BetSlipHome';
import "./Home.css";
import mobileSlipButton from '../BetSlip/MobileLayout/mobileSlipButton';

const Home=(props) =>{
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
    };

    const date=formatDate(Date.now())
    useEffect(() => {
        if (performance.navigation.type == 1) {
            props.remainingBetSlipData(JSON.parse(window.localStorage.getItem('betSlip')))
        }
        props.allBetSlipData({})
    }, [performance.navigation.type]);
    return (
        <>
            <MediaQuery query='(min-width: 980px)'>
                <SimpleBar style={{ maxHeight: '100vh' }}>
                <RespHeader/>
                    <NextListHome/>
                </SimpleBar>
            </MediaQuery>
            <MediaQuery query='(max-width: 980px)'>
                <SimpleBar style={{ maxHeight: '100vh' }}>
                <MenuView/>
                    <Header/>
                    <NextListHome/>
                    <Link to={`/${date}/betSlip`}
                        id="mobile-betSlip-button">
                        <span>B-S
                        </span>
                    </Link>
                </SimpleBar>   
            </MediaQuery>    
        </>
    )
}
const mapStateToProps=(state)=> {
    return{ 
        remainingBetSlip:state.remainingBetSlip,
        allBetslip:state.allBetslip
    }
}
export default connect(mapStateToProps, { 
    remainingBetSlipData,
    allBetSlipData
 } )(Home);



