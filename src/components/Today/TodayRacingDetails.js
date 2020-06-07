import React, { useState,useEffect } from 'react';
import "./TodayDetails.css";
import { Link,Route} from "react-router-dom";
// import { Redirect } from 'react-router';
// import { createHistory } from "../..history";

const TodayRacingDetails=(props)=> {
    var counts = {};
    var places=[]
    var slots=[];
    // const [venue, setVenue] = useState('');
    // const [venue_slot, setvenue_slot] = useState('');
    for (var c = 0; c < props.todayRacing.length; c++) {
        counts[props.todayRacing[c].Location] = 1 + (counts[props.todayRacing[c].Location] || 0);
    }
    var block=0
    var num=0;
    // const nextPage=(place_name,slots_list)=>{
    //     return <Link push to="/RaceDetail" />
    // }
    // const changePageDetails=(event,counts)=>{
    //     var place_name=event.currentTarget.id
    //     var place_location=Object.keys(counts).indexOf(place_name);
    //     var places_list=slots[place_location+1]
    //     var slots_list=[]
    //     {places_list.map(item=>{
    //         slots_list.push(item.Race_Slot,item.Status)
    //     })}
    //     // setVenue(place_location)
    //     // setvenue_slot(slots_list)
    // };
    // useEffect(() => {
    //     return(history.push('/profile'))
    // }, [venue,venue_slot])
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
                                {console.log(counts)}
                                return( 
                                    <Link to={{pathname:"/RaceDetail" ,state:items.Location,place:items.Race_Slot}} className='table-rem-row'>
                                        <div className='table-rem-row'
                                            id={items.Location}>
                                            {/* // onClick={(event)=>{changePageDetails(event,counts)}}> */}
                                            {/* // <Link to={{pathname: "/RaceDetail",params: {place: 'place'}}}/>}> */}
                                            <div className={(items.Status=='Open')?'table-item-open':'table-item'}>
                                                <p className="table-item-slot">{items.Race_Slot}</p>
                                                <p className="table-item-time">{items.Time}</p>
                                                <p className="table-item-results">{items.Result}</p>
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
