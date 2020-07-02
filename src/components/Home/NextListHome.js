import React,{ useState,useEffect,useRef } from 'react';
import { connect } from 'react-redux';
import { Link} from "react-router-dom";
import { fetchNextRace } from "../../actions";
import "./NextListHome.css";
import HomeImage from "../../images/Home.gif"

const NextListHome = (props)=>{
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
        var current=new Date(st)
        if (current.getMinutes()<9) {
         return (current.getHours()+":0"+current.getMinutes())
        }
        else return (current.getHours()+":"+current.getMinutes())
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

                                           
                                        }} className="next-item-list-home">                        
                                            <time>{startTime(item.raceStartTime)}</time>
                                            <p>{item.meeting.meetingName} ({item.meeting.location})</p>
                                            {/* <div className="race-details-container">
                                                <span className="race-detail">
                                                    {item.raceDistance}m
                                                </span>
                                                <span className="race-detail">
                                                    {item.meeting.trackCondition} 
                                                </span>                            
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
    return{ next:state.next}
}
export default connect(mapStateToProps, { fetchNextRace } )(NextListHome);


                    /* <nav-bar menu-items="menuItems">
                        {renderPagesHome(linksList)}
                    </nav-bar> */

/// Context

// import BetSlipStore from "../../context/BetSlipContext";


    // var contextType=BetSlipStore;
    // const betSlipWin=contextType._currentValue.betSlipFormatWin;
    // const betSlipPlace=contextType._currentValue.betSlipFormatPlace;
    // const betSlipPlace={
    //     "bet_fh": "tk_integ_",
    //     "bet_pool_fh": "",
    //     "stake_cents": 0,
    //     "combinations":[
    //     {
    //     "place":1,
    //     "runners":[]
    //     }
    //     ]
    //   };
    // const betSlipWin={
    //     "bet_fh": "tk_integ_",
    //     "bet_pool_fh": "",
    //     "stake_cents": 0,
    //     "combinations":[
    //     {
    //     "place":1,
    //     "runners":[]
    //     }
    //     ]
    //   };


        // const betSlipFormat=(item)=>{
    //     if (item.raceType=='R') {
    //         var type='racing'
    //     }
    //     if (item.raceType=='G') {
    //         var type='greyhound'
    //     }
    //     if (item.raceType=='H') {
    //         var type='harness'
    //     }
    //     betSlipWin.bet_pool_fh=item.raceStartTime.slice(0,6)+'_'+
    //     "racing_"+type+'_'+item.meetingName+'_'+item.location+'_'+item.raceNumber+'_'+'w';
    //     betSlipPlace.bet_pool_fh=item.raceStartTime.slice(0,6)+'_'+
    //     "racing_"+type+'_'+item.meetingName+'_'+item.location+'_'+item.raceNumber+'_'+'p'
    // };


        // const linksList=[{"name":"Next To Go",
    //                     "url":"/next-to-go"},
    //                     {"name":"Racing",
    //                     "url":"/Today/R"},
    //                     {"name":"GreyHound",
    //                     "url":"/Today/G"},
    //                     {"name":"Harness",
    //                     "url":"/Today/H"}]



    
    // <div className="next-data">
    //     <h1>Racing</h1>
    //     <Grid container spacing={3}>
    //         {renderTodayTableList(nextRace.slice(0,6))}
    //     </Grid>
    //     <h1>GreyHound</h1>
    //     <Grid container spacing={3}>
    //         {renderTodayTableList(nextRaceGrey.slice(0,6))}
    //     </Grid>
    //     <h1>Harness</h1>
    //     <Grid container spacing={3}>
    //         {renderTodayTableList(nextRaceHarness.slice(0,6))}
    //     </Grid>
    // </div>


    