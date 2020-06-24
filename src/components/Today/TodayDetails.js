import React,{useState,useEffect,useRef} from 'react';
import { connect } from 'react-redux';
import { Link} from "react-router-dom";
import { fetchNextRace,
    fetchTodayRacing} from "../../actions";
import "./TodayDetails.css"
import TodayRacingDetails from  "./TodayRacingDetails";

const TodayDetails = (props,ownProps)=>{
    props.fetchNextRace();
    const [fetchToday,setfetchToday]=useState(props.detail)
    const fetchTodayRaceInfo=(fetchToday)=> {
        props.fetchTodayRacing(fetchToday);
    }
    useEffect(() => {
        {fetchTodayRaceInfo(fetchToday)}; // this will fire on every change :(
    }, [fetchToday]);

    
    const [showLoading, setShowLoading] = useState(false)
    const timerToClearSomewhere = useRef(false) //now you can pass timer to another component
    useEffect(
       () => {
         timerToClearSomewhere.current = setInterval(() => setShowLoading(true), 800)
         return () => {
           clearInterval(timerToClearSomewhere.current)
         }
       },
       [showLoading]
     )
     setTimeout(()=>{
        setShowLoading(false)
        return () => {
            clearInterval(timerToClearSomewhere.current)
          }
     },1000)


    const racingInfo=(props)=>{
        return(
            <TodayRacingDetails todayRacing={props}/>
        )
    }
    return(
        <div>
            <div className="today-details">
                <div className="date-button">
                    {/* <div className="date-category">
                        <div className="date-bar">
                            Today
                        </div>
                    </div> */}
                    <div className="category-bar">
                        <div className="button-bar">
                            <Link to="/Today/R" className="category-button">
                                Racing
                            </Link>
                            <Link to="/Today/G" className="category-button">
                                GreyHound
                            </Link>
                            <Link to="/Today/H" className="category-button">
                                Harness
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
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
        detail:ownProps.detail
    }
}
export default connect(mapStateToProps, { 
    fetchNextRace,fetchTodayRacing} 
    )(TodayDetails);