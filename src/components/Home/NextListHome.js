import React,{ useState,useEffect,useRef } from 'react';
import { connect } from 'react-redux';
import { Link} from "react-router-dom";
import {IoIosArrowForward} from "react-icons/io"
import { fetchNextRace,
            fetchPathParams} from "../../actions";
import "./NextListHome.css";
import HomeImage from "../../images/Home.gif"

const NextListHome = (props)=>{
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

    const date=formatDate(Date.now())

    props.fetchNextRace();
    // console.log(props.next)


    const [nextRace,setnextRace]=useState([]);
    const [nextRaceGrey,setnextRaceGrey]=useState([]);
    const [nextRaceHarness,setnextRaceHarness]=useState([]);
    const [fetched, setfetched] = useState(false)


    const fetchResources=(next)=>{
        {next.map(item =>{
            // console.log(item)
            switch(item.meeting.raceType) {
                case 'R' :
                    setnextRace(oldArray => [...oldArray, item]);
                    break
                case 'G' :
                    setnextRaceGrey(oldArray => [...oldArray, item]);
                    break
                default:
                    setnextRaceHarness(oldArray => [...oldArray, item]);
                    break        
                };
        })}
    };
    useEffect(()=> {
        if (props.next.length>0) {
            
            fetchResources(props.next);
        }
    },[props.next]);

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

    const renderTodayHome=((details,type)=>{
        
        return (        
            <section className="horizontal-pane">
            <section className="next-to-go-races-section pane page-section">
                <div className="page-section-heading">
                    {type}
                </div>
                <race-list races="nextToGoRaces">
                    <ul className="race-list">
                        <li>
                            <a>
                                <div>
                                {details?details.length>0?details.map(item => {
                                //    console.log(details)
                                //    console.log(item.raceNumber)
                                //    console.log(item.meeting.meetingName)
                                //    console.log(item.meeting.venueMnemonic)
                                //    console.log(item.meeting.raceType)
                                
                                   return(
                                        <Link to={{
                                            slot:item.raceNumber, 
                                            place: item.meeting.meetingName,
                                            code:item.meeting.venueMnemonic,
                                            raceType:item.meeting.raceType,
                                            pathname:`/${date}/${item.meeting.meetingName}/${item.meeting.venueMnemonic}/${item.meeting.raceType}/${item.raceNumber}/Win`
                                        }} 
                                        onClick={()=>{props.fetchPathParams(
                                            {
                                                slot:item.raceNumber, 
                                                place: item.meeting.meetingName,
                                                code:item.meeting.venueMnemonic,
                                                raceType:item.meeting.raceType,
                                            }
                                        )}}
                                        className="next-item-list-home">                        
                                            <time>{startTime(item.raceStartTime)}</time>
                                            <p>{item.meeting.meetingName} ({item.meeting.location})</p>
                                            {/* <div className="race-details-container">
                                                <span className="race-detail">
                                                    {item.raceDistance}m
                                                </span>
                                                <span className="race-detail">
                                                    {" "+item.meeting.trackCondition } <IoIosArrowForward size={10}/> 
                                                </span>    
                                                         <IoIosArrowForward size={10}/>              
                                            </div> */}
                                        </Link> 
                                )}):"":""}
                                </div>
                            </a>
                        </li>
                    </ul>
                </race-list>
            </section>
        </section>
        )
    });


    return(
        <main className="page-content">
            <div className="left-column">
                <ui-view>
                    {/* <img src={HomeImage} className="main-image">
                    </img> */}
                    <div>
                        <div className="page-heading">
                            Ready To Take Off
                        </div>
                        
                        <div className="row">
                            <div className="col-sm-4">
                                {nextRace?renderTodayHome(nextRace.slice(0,3),'Racing'):""}            
                            </div>
                            <div className="col-sm-4">
                                {nextRaceGrey?renderTodayHome(nextRaceGrey.slice(0,3),'GreyHound'):""}            
                            </div>
                            <div className="col-sm-4">
                                {nextRaceHarness?renderTodayHome(nextRaceHarness.slice(0,3),'Harness'):""}            
                            </div>
                        </div>
                    </div>


                </ui-view>
            </div>
        </main>
    );
}; 

const mapStateToProps=(state)=> {
    return{ 
        next:state.next,
        pathParam:state.pathParams
    }
}
export default connect(mapStateToProps, { fetchNextRace,fetchPathParams } )(NextListHome);

