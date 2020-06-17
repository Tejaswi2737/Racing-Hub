import React from 'react';
import "./TodayDetails.css";
import { Link} from "react-router-dom";
const TodayRacingDetails=(props)=> {
    var counts = {};
    var places=[]
    var slots=[];
    for (var c = 0; c < props.todayRacing.length; c++) {
        counts[props.todayRacing[c].Location] = 1 + (counts[props.todayRacing[c].Location] || 0);
    }
    var block=0
    var num=0;
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
        if (hours>0) {
             return (hours+'h'+minutes+'m')
        } 
        if (hours<0 && minutes>5){
             return (minutes+'m')
        }
        if (hours<0&& minutes<5) {
             return((hours+'h'+minutes+'m'+seconds+'s'))
        }  
    };
    const racingSlots=()=>{ return (
            (props.todayRacing.map(item => {{ 
                num=num+1;
                var show=false;
                if (num===1) {
                    places=[]
                    block=block+1;
                }
                if (0<num<=parseInt(Object.values(counts)[block-1])) {
                    places.push(item);
                }
                if (num===parseInt(Object.values(counts)[block-1])) {
                    slots[block]=places;
                    num=0;
                    show=true;
                    return(
                        <div className="table-item-row">
                            {slots[block].map(items=>{
                                return( 
                                    <Link to={{pathname:"/RaceDetail" ,place:items.Location,slot:items.Race_Slot, place: items.Location}} className='table-rem-row'>
                                        <div className='table-rem-row'
                                            id={items.Location}>
                                            <div className={(items.Status=='Open')?'table-item-open':'table-item'}>
                                                <p className="table-item-slot">R{items.Race_Slot}</p>
                                                <p className="table-item-time">
                                                    {items.Time}
                                                </p>
                                                <p className="table-item-results">
                                                    {items.Status=="Open"?duration(items.Time):items.Result}
                                                </p>
                                            </div>
                                        </div>  
                                    </Link>
                                )
                            })}
                        </div>
                    )
                }          
    }})))};
    const renderTodayRacingDetail=(()=>{
        return (   
            <div class="table">
                <div className="places-list">
                    {Object.keys(counts).map(item=>{
                        return(
                            <div className="places-list-item">
                                <p>{item}</p>
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
