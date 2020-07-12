import React,{ useState,useEffect,useRef } from 'react';
import { connect } from 'react-redux';

import "./TodayDetails.css";
import { Link} from "react-router-dom";
import { fetchPathParams} from "../../actions";


const TodayRacingDetails=(props)=> {
    const [diffTime, setdiffTime] = useState(Date.now()-new Date("2020-07-03T05:09:00.000Z"))

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
    const date=formatDate(Date.now())
    const duration=(raceStartTime)=>{ 
        var left=(Date.now()-new Date(raceStartTime))-diffTime
        var delta=Math.abs(left/1000)
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        var seconds = Math.floor(delta % 60);
        if (hours>0 || hours<0) {
            if (left>0 ) {
                if (minutes==0){
                    return(-hours+'h')
                }
                else return(-hours+'h'+minutes+'m')
            }
            else {
                if (minutes==0){
                    return(hours+'h')
                }
            } return (hours+'h'+minutes+'m')
        }
        if (hours==0 && minutes>=5){
            if (left>0){
                return (-minutes+'m')
            }
            else return(minutes+'m')
        } 
        if (hours==0 && (minutes<=5||minutes>=-5) 
            && (minutes>0||minutes<0)) {
                if (left>0) {
                    if (seconds==0){
                        return(-minutes+'m')
                    } else return (-minutes+'m'+seconds+'s')
                }
               else {
                if (seconds==0){
                    return(minutes+'m')
                } else return (minutes+'m'+seconds+'s')
                }
        }  
        if (hours==0 && minutes==0) {
            if (left>0) {
                return(-seconds+'s')
            }
            else return((seconds+'s'))
        } 
    };
    const startTime=(st)=>{
        var current=new Date(st);
        var left=(Date.now()-new Date(st))-diffTime
        left=Date.now()-left+10*60*60*1000
        var delta=Math.abs(left/1000)
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        var seconds = Math.floor(delta % 60);
        if (minutes<9) {
         return (hours+":0"+minutes)
        }
        else return (hours+":"+minutes)
    }
    const racingSlots=()=>{ return (
            (props.todayRacing.map(item => {{ 
                    return(
                        <div className="table-item-row">
                            {item.races.map(items=>{
                                // console.log(items,item)
                                return( 
                                    <Link to={{
                                        pathname:`/${date}/${item.meetingName}/${item.venueMnemonic}/${item.raceType}/${items.raceNumber}/Win`,
                                        slot:items.raceNumber, 
                                        place: item.meetingName,
                                        code:item.venueMnemonic,
                                        raceType:item.raceType   
                                }} 
                                onClick={()=>{props.fetchPathParams(
                                    {
                                        slot:items.raceNumber, 
                                        place: item.meetingName,
                                        code:item.venueMnemonic,
                                        raceType:item.raceType   
                                    }
                                )}}
                                    className='table-rem-row'>
                                        <div className='table-rem-row'
                                            id={item.Location}>
                                            <div 
                                            className={(items.raceStatus!='Normal')?'table-item':
                                            (-(Date.now()-new Date(items.raceStartTime)-diffTime)<60000
                                            &&
                                            -(Date.now()-new Date(items.raceStartTime)-diffTime)>-60000)?
                                                "table-item-open-color":
                                            'table-item-open'}>
                                                <p className="table-item-slot">R{items.raceNumber}</p>
                                                <p className="table-item-time">
                                                    {startTime(items.raceStartTime)}   
                                                </p>
                                                <p className="table-item-results">
                                                    {Array.isArray(items.results) ?items.results.length>0?items.results.map(result=>{
                                                        return(
                                                            <>{result+" "}
                                                            </>
                                                        )
                                                    }):duration(items.raceStartTime):duration(items.raceStartTime)}
                                                </p>
                                            </div>
                                        </div>  
                                    </Link>
                                )
                            })}
                        </div>
                    )
                // }          
    }})))};
    const renderTodayRacingDetail=(()=>{
        return (   
            <div class="table">
                <div className="places-list">
                    {props.todayRacing.map(item=>{
                        return(
                            <div className="places-list-item">
                                <p>{item.meetingName}</p>
                                <p>({item.location})</p>
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
const mapStateToProps=(state)=> {
    return{ 
        pathParam:state.pathParams
    }
}
export default connect(mapStateToProps, { fetchPathParams } )(TodayRacingDetails);

