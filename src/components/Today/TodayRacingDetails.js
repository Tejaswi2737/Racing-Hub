import React,{useState} from 'react';
import "./TodayDetails.css";
import { Link} from "react-router-dom";


import BetSlipStore from "../../context/BetSlipContext";

const TodayRacingDetails=(props)=> {

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
        if (hours==0 && minutes>=5){
            if (left>0){
                return (-minutes+'m')
            }
            else return(minutes+'m')
        } 
        if (hours==0 && (minutes<=5||minutes>=-5) 
            && (minutes>0||minutes<0)) {
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
            if (left>0) {
                return(-seconds+'s')
            }
            else return((seconds+'s'))
        } 
    };
    const startTime=(st)=>{
        var current=new Date(st)
        if (current.getMinutes()<9) {
         return (current.getHours()+":0"+current.getMinutes())
        }
        else return (current.getHours()+":"+current.getMinutes())
    }
    const racingSlots=()=>{ return (
            (props.todayRacing.map(item => {{ 
                    return(
                        <div className="table-item-row">
                            {item.races.map(items=>{
                                return( 
                                    <Link to={{
                                        pathname:"/RaceDetail/Win", 
                                        slot:items.raceNumber, 
                                        place: item.meetingName,
                                }} 
                                    className='table-rem-row'>
                                        <div className='table-rem-row'
                                            id={item.Location}>
                                            <div 
                                            className={(items.raceStatus!='Normal')?'table-item':
                                            (-(Date.now()-new Date(items.raceStartTime))<60000
                                            &&
                                            -(Date.now()-new Date(items.raceStartTime))>-60000)?
                                                "table-item-open-color":
                                            'table-item-open'}>
                                                <p className="table-item-slot">R{items.raceNumber}</p>
                                                <p className="table-item-time">
                                                    {startTime(items.raceStartTime)}   
                                                </p>
                                                <p className="table-item-results">
                                                    {Array.isArray(items.results) ?items.results.length>0?items.results.map(result=>{
                                                        return(
                                                            <>{result+" "}
                                                            </>
                                                        )
                                                    }):duration(items.raceStartTime):duration(items.raceStartTime)}
                                                </p>
                                            </div>
                                        </div>  
                                    </Link>
                                )
                            })}
                        </div>
                    )
                // }          
    }})))};
    const renderTodayRacingDetail=(()=>{
        return (   
            <div class="table">
                <div className="places-list">
                    {props.todayRacing.map(item=>{
                        return(
                            <div className="places-list-item">
                                <p>{item.meetingName}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="today-list">
                    {racingSlots()}
                </div>
            </div>
         );
    });
    return (
        <div>
            {renderTodayRacingDetail()}
        </div>
    )
};
export default TodayRacingDetails;
