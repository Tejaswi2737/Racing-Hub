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
         if (left>0){
             hours=-hours
         }
         var seconds = Math.floor(delta % 60);  
         return (hours+'h'+minutes+'m'+seconds+'s')
    };
    const renderToday=(()=>{
        return (        
            (props.next.map(item => {
                 return(
                     <div className="next-to-go-bar-race">
                        <Link className="next-to-go-bar-race-link" to={{pathname:"/RaceDetail", slot:item.raceNumber, place: item.meetingName}}>
                            <div className="next-to-go-bar-race-info">
                                <span className="next-to-go-bar-race-name">
                                    {item.meetingName} ({item.location}) - R{item.raceNumber}
                                </span>
                            </div>
                            <time className="next-to-go-bar-time-to-start next-to-go-bar-race-close-to-start">
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
