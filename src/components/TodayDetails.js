import React from 'react';
import { connect } from 'react-redux';
import { fetchNextRace,
    fetchTodayRacing,
    fetchTodayGrey,
    fetchTodayHarness 
} from "../actions";
import "./NextRace.css";
import TodayRacingDetails from  "./TodayRacingDetails";


import "./TodayDetails.css"
const TodayDetails = (props)=>{
    props.fetchNextRace();
    props.fetchTodayRacing();
    props.fetchTodayGrey();
    props.fetchTodayHarness();
    const renderToday=(()=>{
        return (        
            (props.next.map(item => {
                 return(
                    <div className="next-item-list">                        
                        <p>{item.Location} {item.Location_Code}-
                        {item.Race_Slot} Time Left-{item.Duration}</p>
                    </div> 
             )}
         ))
         );
    });
    const racingInfo=(props)=>{
        return(
            <TodayRacingDetails todayRacing={props}/>
        )
    }
    return(
        <div>
            <div className="next-list">
                {renderToday()}
            </div>
            <div className="today-details">
                <div className="date-button">
                    <div className="date-category">
                        <div className="date-bar">
                            Monday 1st June
                        </div>
                    </div>
                    <div className="category-bar">
                        <div className="button-bar">
                            <button className="category-button">Racing</button>
                            <button onClick={()=>racingInfo(props.todayRacingGrey)}
                            className="category-button">GreyHound</button>
                            <button className="category-button">Harness</button>
                        </div>
                    </div>
                </div>
                <div className="today-racing-table">
                    {racingInfo(props.todayRacingGrey)}
                </div>
            </div>
        </div>
        );
}; 

const mapStateToProps=(state)=> {
    return{ 
        next:state.next,
        todayRacing:state.todayRacing,
        todayRacingGrey:state.todayRacingGrey,
        todayRacingHarness:state.todayRacingHarness
    }
}
export default connect(mapStateToProps, { 
    fetchNextRace,fetchTodayRacing,
    fetchTodayGrey,fetchTodayHarness } )(TodayDetails);