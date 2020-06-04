import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { Link} from "react-router-dom";
import { fetchNextRace,
    fetchTodayRacing} from "../../actions";
import "./TodayDetails.css"
import TodayRacingDetails from  "./TodayRacingDetails";

const TodayDetails = (props,ownProps)=>{
    console.log(ownProps.detail)
    props.fetchNextRace();
    const [fetchToday,setfetchToday]=useState(props.detail)
    const fetchTodayRaceInfo=(fetchToday)=> {
        props.fetchTodayRacing(fetchToday);
    }
    useEffect(() => {
        {fetchTodayRaceInfo(fetchToday)}; // this will fire on every change :(
    }, [fetchToday]);
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
                            <button onClick={()=><Link to="/Today/R"/>}
                             className="category-button">Racing</button>
                            <button onClick={()=>setfetchToday('todayRacingGrey')}
                            className="category-button">GreyHound</button>
                            <button onClick={()=>setfetchToday('todayRacingHarness')}
                             className="category-button">Harness</button>
                        </div>
                    </div>
                </div>
                <div className="today-racing-table">
                    {racingInfo(props.todayRacing)}
                </div>
            </div>
        </div>
        );
}; 

const mapStateToProps=(state,ownProps)=> {
    return{ 
        next:state.next,
        todayRacing:state.todayRacing,
        todayRacingGrey:state.todayRacingGrey,
        todayRacingHarness:state.todayRacingHarness,
        detail:ownProps.detail
    }
}
export default connect(mapStateToProps, { 
    fetchNextRace,fetchTodayRacing} 
    )(TodayDetails);