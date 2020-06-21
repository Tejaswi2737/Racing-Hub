import React from 'react';
import { Link} from "react-router-dom";

import "./NextRace.css";

import BetSlipStore from "../../context/BetSlipContext";

const NextList = (props)=>{

    // var contextType=BetSlipStore;
    // const betSlipWin=contextType._currentValue.betSlipFormatWin;
    // const betSlipPlace=contextType._currentValue.betSlipFormatPlace;
    // const betSlipPlace={
    //     "bet_fh": "tk_integ_",
    //     "bet_pool_fh": "",
    //     "stake_cents": 0,
    //     "combinations":[
    //     {
    //     "place":1,
    //     "runners":[]
    //     }
    //     ]
    //   };
    // const betSlipWin={
    //     "bet_fh": "tk_integ_",
    //     "bet_pool_fh": "",
    //     "stake_cents": 0,
    //     "combinations":[
    //     {
    //     "place":1,
    //     "runners":[]
    //     }
    //     ]
    //   };

    const duration=(raceStartTime)=>{
        var left=(Date.now()-new Date(raceStartTime))
        var delta=Math.abs(left/1000)
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        var seconds = Math.floor(delta % 60); 
        if (hours==0 && (minutes>0||minutes<0)){
            if (left>0) {
                if (seconds==0){
                    return(-minutes+'m')
                } else return (-minutes+'m'+seconds+'s')
            }
           else {
            if (seconds==0){
                return(minutes+'m')
            } else return (minutes+'m'+seconds+'s')
            }
        }
        if (hours==0 && minutes==0) {
            if (left>0){
                return(-seconds+'s')
            }
            return (seconds+'s')
        }
        if (hours>0 || hours<0) {
            if (left>0 ) {
                if (minutes==0){
                    return(-hours+'h')
                }
                else return(-hours+'h'+minutes+'m')
            }
            else {
                if (minutes==0){
                    return(hours+'h')
                }
            } return (hours+'h'+minutes+'m')
        }
    };

    // const betSlipFormat=(item)=>{
    //     if (item.raceType=='R') {
    //         var type='racing'
    //     }
    //     if (item.raceType=='G') {
    //         var type='greyhound'
    //     }
    //     if (item.raceType=='H') {
    //         var type='harness'
    //     }
    //     betSlipWin.bet_pool_fh=item.raceStartTime.slice(0,6)+'_'+
    //     "racing_"+type+'_'+item.meetingName+'_'+item.location+'_'+item.raceNumber+'_'+'w';
    //     betSlipPlace.bet_pool_fh=item.raceStartTime.slice(0,6)+'_'+
    //     "racing_"+type+'_'+item.meetingName+'_'+item.location+'_'+item.raceNumber+'_'+'p'
    // };

    const renderToday=(()=>{
        return (        
            (props.next.map(item => {
                // {betSlipFormat(item)}
                 return(
                     <div className="next-to-go-bar-race">
                        <Link className="next-to-go-bar-race-link" 
                        to={{
                            pathname:"/RaceDetail", 
                            slot:item.raceNumber, 
                            place: item.meetingName,
                            bet_pool_fh_1:item.raceStartTime.slice(0,6)+'_'+
                            "racing_"+item.raceType+'_'+item.meetingName+'_'+item.location+'_'+item.raceNumber+'_'+'w',
                            bet_pool_fh_2:item.raceStartTime.slice(0,6)+'_'+
                            "racing_"+item.raceType+'_'+item.meetingName+'_'+item.location+'_'+item.raceNumber+'_'+'p'
                        }}>
                            <div className="next-to-go-bar-race-info">
                                <span className="next-to-go-bar-race-name">
                                    {item.meetingName} ({item.location}) - R{item.raceNumber}
                                </span>
                            </div>
                            <time className=
                            {(Date.now()-new Date(item.raceStartTime)>-5*60000)?
                                "next-to-go-bar-race-close-to-start":
                                "next-to-go-bar-time-to-start"}>
                                {duration(item.raceStartTime)}
                            </time>      
                        </Link>
                     </div>
                )})
         ));
    });
    
    return(
        <div>
            <div className="next-to-go-bar-race-list">
                {renderToday()}
            </div>
        </div>
        
        );
}; 
export default NextList
