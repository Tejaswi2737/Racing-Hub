import React,{useState,useEffect,useRef} from 'react';
import { connect } from 'react-redux';
import { Link} from "react-router-dom";
import { fetchNextRace,
    fetchTodayRacing} from "../../actions";
import "./TodayDetails.css"
import TodayRacingDetails from  "./TodayRacingDetails";

const TodayDetails = (props,ownProps)=>{
    // console.log(props)
    
        function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const date=formatDate(Date.now())
    const [todayData, settodayData] = useState([])
    useEffect(() => {
        if(props.todayRacing) {
            var newArray=props.todayRacing.filter(function (el) {
                return el.raceType ===props.detail
              });
            settodayData(newArray)
        }

        
    }, [props])
    props.fetchNextRace();
    useEffect(() => {
    }, [todayData])
    
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
                    <div className="category-bar">
                        <div className="button-bar">
                            <Link to={`/${date}/R`} className={props.detail==='R'?"category-button-active":"category-button"}>
                                Racing
                            </Link>
                            <Link to={`/${date}/G`} className={props.detail==='G'?"category-button-active":"category-button"}>
                                GreyHound
                            </Link>
                            <Link to={`/${date}/H`} className={props.detail==='H'?"category-button-active":"category-button"}>
                                Harness
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    {racingInfo(todayData)}
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