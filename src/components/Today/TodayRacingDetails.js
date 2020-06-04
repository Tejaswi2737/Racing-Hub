import React from 'react';
import "./TodayDetails.css";

import Race_Detail from "../Race_Detail";
const TodayRacingDetails=(props)=> {
    var counts = {};
    var places=[]
    var slots=[];
    for (var c = 0; c < props.todayRacing.length; c++) {
        counts[props.todayRacing[c].Location] = 1 + (counts[props.todayRacing[c].Location] || 0);
    }
    var block=0
    var num=0;
    const nextPage=(place_name,slots_list)=>{
        console.log(place_name)
        return(
            <div>
                <Race_Detail place={place_name} slots={slots_list}/>
            </div>
        )
    }
    const changePageDetails=(event,slots)=>{
        var place_name=event.currentTarget.id
        var place_location=Object.keys(counts).indexOf(place_name);
        var places_list=slots[place_location+1]
        var slots_list=[]
        {places_list.map(item=>{
            slots_list.push(item.Race_Slot,item.Status)
        })}
        {nextPage(place_name,slots_list)}
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
                                    <div onClick={(event)=>{
                                        changePageDetails(event,slots)}} 
                                        className='table-rem-row'
                                        id={items.Location}
                                    >
                                        <div className={(items.Status=='Open')?'table-item-open':'table-item'}>
                                            <p className="table-item-slot">{items.Race_Slot}</p>
                                            <p className="table-item-time">{items.Time}</p>
                                            <p className="table-item-results">{items.Result}</p>
                                        </div>
                                    </div>  
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
