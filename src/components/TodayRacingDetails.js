import React,{useState,useEffect} from 'react';
import "./TodayDetails.css";

const TodayRacingDetails=(props)=> {
    var counts = {};
    var counts_loc={};
    var places=[]
    const [placeValues, setplaceValues] = useState([])
    for (var c = 0; c < props.todayRacing.length; c++) {
        counts[props.todayRacing[c].Location] = 1 + (counts[props.todayRacing[c].Location] || 0);
    }
    for (var c = 0; c < props.todayRacing.length; c++) {
        counts_loc[props.todayRacing[c].Location_Code] = 
        1 + (counts_loc[props.todayRacing[c].Location_Code] || 0);
    }
    var block=0
    const showRow=(places)=>{
        console.log(places)
        places.map(item=>{
            return(
                <div>
                    Hello
                </div>

        )}
        )
    }
    var num=0;
    const racingSlots=()=>{ return (
            (props.todayRacing.map(item => {{ 
                num=num+1;
                var show=false;
                if (num===1) {
                    places=[]
                }
                if (0<num<=parseInt(Object.values(counts)[block])) {
                    places.push(item);
                }
                if (num===parseInt(Object.values(counts)[block])) {
                    block=block+1;
                    num=0;
                    show=true;
                    return(
                        <div className="table-item-row">
                            {console.log(places)}
                            {places.map(items=>{
                                return(
                                    <div className='table-rem-row'>
                                        <div className="table-item">
                                            <p>{items.Race_Slot}</p>
                                            <p>{items.Time}</p>
                                            <p>{items.Result}</p>
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
