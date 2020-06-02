import React from 'react';
import "./TodayDetails.css";

const TodayRacingDetails=(props)=> {
    var counts = {};
    for (var i = 0; i < props.todayRacing.length; i++) {
        counts[props.todayRacing[i].Location] = 1 + (counts[props.todayRacing[i].Location] || 0);
    }
    var place=[]
    const racingSlots=()=>{ return (
            (props.todayRacing.map(item => {{    
                if(place.indexOf(item.Location) == -1){
                    place.push(item.Location)
                    var classstyle='table-list-row' } else { 
                        classstyle='table-rem-row'}}
                    return(
                        <div className={classstyle}>
                            <div className="table-item">
                                <p>{item.Race_Slot}</p>
                                <p>{item.Time}</p>
                                <p>{item.Result}</p>
                            </div>
                        </div>
    )})))};
    const renderTodayRacingDetail=(()=>{
        return (   
            <div class="table">
                <div className="places-list">
                    {Object.keys(counts).map(item=>{
                        return(
                            <div className="places-list-item">
                                {item}
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
