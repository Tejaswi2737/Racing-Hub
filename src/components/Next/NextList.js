import React from 'react';
import { Link} from "react-router-dom";

import "./NextRace.css";

const NextList = (props)=>{
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



    const renderToday=(()=>{
        return (        
            (props.next.map(item => {
                 return(
                     <div className="next-to-go-bar-race">
                        <Link className="next-to-go-bar-race-link" to={{pathname:"/RaceDetail", 
                        slot:item.raceNumber, place: item.meetingName}}>
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
