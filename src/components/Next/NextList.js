import React from 'react';
import { connect } from 'react-redux';
import { Link} from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';
import { fetchNextRace } from "../../actions";
import "./NextRace.css";

const NextList = (props)=>{
    props.fetchNextRace();
    const duration=(raceStartTime)=>{ 
        var left=<Moment date={raceStartTime} durationFromNow/>
        return(
            left
        )
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
             )}
         )
         )
         );
    });
    return(
        <div>
            <div className="next-to-go-bar-race-list">
                {renderToday()}
            </div>
        </div>
        );
}; 

const mapStateToProps=(state)=> {
    return{ next:state.next}
}
export default connect(mapStateToProps, { fetchNextRace } )(NextList);