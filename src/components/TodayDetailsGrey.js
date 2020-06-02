import React from 'react';
import { connect } from 'react-redux';
import { fetchNextRace,fetchTodayGrey } from "../actions";
import "./NextRace.css";
import TodayRacingDetails from  "./TodayRacingDetails";
import "./TodayDetails.css"
// import TodayDetails from './TodayDetails';
const TodayDetailsGrey = (props)=>{
    props.fetchNextRace();
    props.fetchTodayGrey();
    console.log(props)
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
                            <button className="category-button">GreyHound</button>
                            <button className="category-button">Harness</button>
                        </div>
                    </div>
                </div>
                <div className="today-racing-table">
                    <TodayRacingDetails todayRacing={props.todayRacingGrey}/>
                </div>
            </div>
        </div>
        );
}; 

const mapStateToProps=(state)=> {
    return{ next:state.next,
    todayRacingGrey:state.todayRacingGrey}
}
export default connect(mapStateToProps, { fetchNextRace,fetchTodayGrey } )(TodayDetailsGrey);