import React,{useEffect,useState,useRef} from 'react';
import { connect } from 'react-redux';
import { Link} from "react-router-dom";
import MediaQuery from 'react-responsive';
import _ from 'lodash';
// import { Table } from 'semantic-ui-react';


import { fetchMeetingDetails,
    fetchRaceDetails,
    fetchWinPlaceBet,
    addBetSlipData,
    allBetSlipData,
    countBetSlipData,
    remainingBetSlipData,
    betSlipScreen,
    fetchTodayRacing,
    fetchPathParams
} from "../../actions";

import BetSlipHome from '../BetSlip/BetSlipHome';

import "./RaceDetails.css";

const RaceDetails = (props,ownProps)=>{

    const [todayData, settodayData] = useState([]);
    const [raceData, setraceData] = useState([]);
    const [pool_fh, setpool_fh] = useState();
    const [count, setcount] = useState()
    const [place_list_all, setplace_list_all] = useState(["NORTHFIELD PARK (USA) Race6",'ergevdfgdbb','rgergegegeetheeh'])
    // var place_list_all=["NORTHFIELD PARK (USA) Race6",'ergevdfgdbb','rgergegegeetheeh'];
    var runner_list_all=[[1,2,3,4],[3,4],[1,2,3]];
    const [addedBet, setaddedBet] = useState(false)
    const [runnerSelection, setrunnerSelection] = useState([]);
    const [runner_win_place, setrunner_win_place] = useState({});
    const [pathValues, setpathValues] = useState([])

    props.fetchMeetingDetails();
    
    
    if (parseInt(pathValues.slot)){
        var initialValue=parseInt(pathValues.slot)
    } else {
        initialValue=1
    }
    if ((pathValues.place)){
        var initialValuePlace=(pathValues.place)
    } else {
        initialValuePlace=""
    }
    const [place, setplace] = useState(initialValuePlace);
    const [place_slot, setplace_slot] = useState(initialValue);
    var races_list=[props.meetingDetails.races];
    useEffect(() => {
        setplace_slot(initialValue)
    }, [initialValue,initialValuePlace])
    useEffect(() => {
        props.fetchRaceDetails(place_slot);
    }, [place_slot,place])
    races_list=Object.values(races_list);
    var items_list={}
    {races_list?races_list.map(item=>{
         items_list=item;
    }): items_list=[]};

  
    useEffect(() => {
        props.remainingBetSlipData(props.remainingBetSlip)
    }, [props.meetingDetails])

    useEffect(() => {
        console.log(window.localStorage.getItem('pathParams'))
        const data =window.localStorage.getItem('pathParams')
        if (data) {
            setpathValues(JSON.parse(data))
            console.log(data)
        }
    }, [])

    useEffect(() => {
        if(props.pathParams.code) {
            setpathValues(props.pathParams)
            localStorage.setItem('pathParams',JSON.stringify(props.pathParams))
        }
    }, [props.pathParams]);
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
    // console.log(pathValues)
    const date=formatDate(Date.now())
    useEffect(() => {
        props.fetchTodayRacing()
        if(props.todayRacing) {
            var newArray=props.todayRacing.filter(function (el) {
                return (
                    el.meetingName ==pathValues.place &&
                    el.raceType==pathValues.raceType &&
                     el.venueMnemonic== pathValues.code 
                )

              });
            // console.log(newArray)
            settodayData(newArray)
        }
    }, [props]);
    useEffect(() => {
        if(todayData) {
            if(todayData[0]) {
                // console.log()
                var dataass=todayData[0].races
                var newArray=dataass.filter(function (el) {
                    return (
                        el.raceNumber ==pathValues.slot 
                    )
    
                  });
                // console.log(newArray)
                setraceData(newArray)            
            }
        }
    }, [todayData])






    const [showLoading, setShowLoading] = useState(false);
    const [diffTime, setdiffTime] = useState(Date.now()-new Date("2020-07-03T05:09:00.000Z"))

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
    };

    const resultsTable=(props)=>{
        return(
            
            <table className="race-table-results">
                {props.racingDetail.results.length>0?
                <thead>
                    <tr>
                        <th >
                            Results
                        </th>
                        <th >
                            Number
                        </th>
                        <th >
                            Runner Details
                        </th>
                        <th>
                            Tote
                        </th>
                    </tr>
                </thead>:""}
                <tbody className="">
                    {props.racingDetail.results.map(item=>{  
                        return(
                            <tr>
                                <td className="result-position">
                                    {item.place}
                                </td>
                                <td className="result-number">
                                    {item.runnerNumber} 
                                </td>
                            <td className="runner-details">
                                {item.runnerName}
                                <dl className="runner-metadata-list">
                                    <dt>
                                        D
                                    </dt>
                                    <dd className="full-name">
                                        {item.riderDriverName+" "}
                                    </dd>
                                    <dt>
                                        T
                                    </dt>
                                    <dd className="full-name">
                                        {item.trainerName}
                                    </dd>
                                </dl>
                            </td>
                            <td >
                                <div>
                                    <div>
                                        {item.toteWin}
                                    </div>
                                    <div >
                                        {item.totePlace}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>     
        )
    };

    const exoticTable=(props)=>{
        return(
            <table className="race-table">
                {props.racingDetail.exoticResults.length>0?
            <thead >
                <tr>
                    <th>
                        Exotic Results
                    </th>
                    <th >
                        Results
                    </th>
                    <th >
                        Dividend
                    </th>
                </tr>
            </thead>:""}
            <tbody>
                {props.racingDetail.exoticResults.map(exotic_item=>
                    {
                        return(
                            <tr >
                            <td>
                                {exotic_item.wageringProduct}
                            </td>
                            <td >
                                <div >
                                    <div>
                                        <span>
                                            {exotic_item.Results}        
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td >
                                <div >
                                    <div >
                                        <span>
                                            {exotic_item.Dividend}        
                                        </span>
                                    </div>
                                </div>
                            </td>
                        </tr>                                              
                        )
                    })}
            </tbody>
        </table>
        )
    };


    const sortRunnerInforTable=(props)=> {

    }




    const runnerInfoheader=(props)=>{
        return(
            <div className="runner-info-row">
                <div className="number-cell">
                    No
                </div>
                <div className="name-cell">
                    Runner
                </div>

                <div className="price-cell">
                    Win
                </div>
                <div className="price-cell">
                    Place
                </div>
                {(props.racingDetail.raceStatus=="Open")?(props.type=="Quinella"||props.type=="Duet")?
                        <div className="price-cell">
                            1st Box
                        </div>
                    :(props.type=="Trifecta")?
                    <>
                        <div className="price-cell">
                            1st Box
                        </div>
                        <div className="price-cell">
                            2nd
                        </div>
                        <div className="price-cell">
                            3rd
                        </div>
                    </>
                    :(props.type=="First4")?
                    <>
                        <div className="price-cell">
                            1st Box
                        </div>
                        <div className="price-cell">
                            2nd
                        </div>
                        <div className="price-cell">
                            3rd
                        </div>
                        <div className="price-cell">
                            4th
                        </div>
                    </>:(props.type=="Exacta")?
                    <>
                        <div className="price-cell">
                            1st Box
                        </div>
                        <div className="price-cell">
                            2nd
                        </div>         
                    </> :"":""              
                }

            </div>
        )
    };

    const handleClick=(props,runner_item)=>{
        if ((raceData[0].raceStatus=="Normal")) {
            if(props.countBetSlip && props.countBetSlip.length==0) {
                props.countBetSlipData(1);
                setcount((props.countBetSlip));
                setrunner_win_place({
                    "name":todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber || ""
                    ,"runners":runner_item.runnerNumber,"win": null ,"place": null
                });
            } else {
                // console.log(props.countBetSlip)
                props.countBetSlipData(parseInt(props.countBetSlip)+1);
                setcount((props.countBetSlip));
                setrunner_win_place({
                    // "pool_fh":"tk_integ"+props.countBetSlip,
                    "name":todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber || ""
                    ,"runners":runner_item.runnerNumber,"win": null ,"place": null
                });
            }
            
            
            // console.log(props.countBetSlip)
            // if(props.countBetSlip) {
            //     console.log(props.countBetSlip)
            //     setcount(props.countBetSlip+1);
            // } else  {
            //     console.log(props.countBetSlip)
            //     setcount(1)
            // }
            
        }
    };



    useEffect(() => {
        if ((runner_win_place)) {
            {props.addBetSlipData(runner_win_place)}
            {props.allBetSlipData(runner_win_place)}
            props.betSlipScreen(true)
        }
    }, [runner_win_place])

    const runnerInfoBody=(props)=>{
        return(
            <div className="pseudo-body">
            {props.racingDetail.runners?props.racingDetail.runners.map(runner_item=>{
                return(
                    <div className="row-runner">
                    <div className="number-cell-body">
                        {runner_item.runnerNumber}
                    </div>
                    <div className="name-cell-body">
                        <div >
                            <div className="runner-name-wrapper">
                                <div className="runner-name">
                                    {runner_item.runnerName}
                                </div>
                            </div>
                            <div className="runner-metadata-list">
                                <dt>
                                    D
                                </dt>
                                <dd className="full-name">
                                    {runner_item.riderDriverName}
                                </dd>
                                <dt>
                                    T
                                </dt>
                                <dd className="full-name">
                                    {runner_item.trainerName}
                                </dd>
                            </div>
                        </div>
                    </div>
                    <div className="price-cell-body"
                        onClick={()=>{
                            handleClick(props,runner_item,pool_fh,runnerSelection,place_list_all,runner_list_all)
                        }} 
                        style={{
                            backgroundColor:props.remainingBetSlip[0] && todayData[0] &&raceData[0] ?
                            props.remainingBetSlip.filter(e => e.name == todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber
                            && e.runners === runner_item.runnerNumber
                            ).length > 0
                            ?
                            "#d3ecef":"white":"white"}}
                        >
                        <div className="price-cell-body-child"
                        style={{
                            backgroundColor:props.remainingBetSlip[0] && todayData[0] &&raceData[0] ?
                            props.remainingBetSlip.filter(e => e.name == todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber
                            && e.runners === runner_item.runnerNumber
                            ).length > 0
                            ?
                            "#d3ecef":"white":"white"}}
                        >
                                    ${runner_item.returnWin}    
                        </div>
                        <div className="price-cell-body-child"
                        style={{
                            backgroundColor:props.remainingBetSlip[0] && todayData[0] &&raceData[0] ?
                            props.remainingBetSlip.filter(e => e.name == todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber
                            && e.runners === runner_item.runnerNumber
                            ).length > 0
                            ?
                            "#d3ecef":"white":"white"}}                        >
                       
                                    ${runner_item.returnPlace}
                          
                        </div>
                    </div>
                    {(props.racingDetail.raceStatus=="Open")?(props.type=="Quinella"||props.type=="Duet")?
                        <div className="price-cell-body">
                            <div>
                                <div>
                                <input
                                        name="1st"
                                        type="checkbox"
                                        />                                    
                                </div>
                            </div>
                        </div>
                        :(props.type=="Trifecta")?
                        <>
                            <div className="price-cell-body">
                                <div>
                                    <div>
                                    <input
                                            name="1st"
                                            type="checkbox"
                                            />                                    
                                    </div>
                                </div>
                            </div>
                            <div className="price-cell-body">
                                <div>
                                    <div>
                                    <input
                                            name="2nd"
                                            type="checkbox"
                                            />                                    
                                    </div>
                                </div>
                            </div>
                            <div className="price-cell-body">
                                <div>
                                    <div>
                                    <input
                                            name="3rd"
                                            type="checkbox"
                                            />                                    
                                    </div>
                                </div>
                            </div>
                        </>
                        :(props.type=="First4")?
                        <>
                            <div className="price-cell-body">
                                <div>
                                    <div>
                                    <input
                                            name="1st"
                                            type="checkbox"
                                            />                                    
                                    </div>
                                </div>
                            </div>
                            <div className="price-cell-body">
                                <div>
                                    <div>
                                    <input
                                            name="2nd"
                                            type="checkbox"
                                            />                                    
                                    </div>
                                </div>
                            </div>
                            <div className="price-cell-body">
                                <div>
                                    <div>
                                    <input
                                            name="3rd"
                                            type="checkbox"
                                            />                                    
                                    </div>
                                </div>
                            </div>
                            <div className="price-cell-body">
                                <div>
                                    <div>
                                    <input
                                            name="4th"
                                            type="checkbox"
                                            />                                    
                                    </div>
                                </div>
                            </div>
                        </>:(props.type=="Exacta")?
                        <>
                            <div className="price-cell-body">
                                <div>
                                    <div>
                                    <input
                                            name="1st"
                                            type="checkbox"
                                            />                                    
                                    </div>
                                </div>
                            </div>
                            <div className="price-cell-body">
                                <div>
                                    <div>
                                    <input
                                            name="2nd"
                                            type="checkbox"
                                            />                                    
                                    </div>
                                </div>
                        </div>      
                        </> :"":""           
                    }
                </div>
                )
            }):""}
        </div>
        )
    };

    const runnerInfo=(props)=>{
        return(
            <div className="race-runners-wrapper results">
                <div className="pseudo-table">
                    {runnerInfoheader(props)}
                    {runnerInfoBody(props)}
                </div>
            </div>
        )
    };

    const raceName=(props)=>{
        const raceSlots=(props)=>{
            return(                        
            <div className="meeting-race-selector">
                <div className="meeting-info">
                    <div className="meeting-info-race-selector-wrapper">
                        <div className="meeting-info-race-selector">     
                            {todayData?todayData[0]?todayData[0].races.map(item=>{
                                return(
                                    <Link to={{
                                        pathname:`/${date}/${pathValues.place}/${pathValues.code}/${pathValues.raceType}/${item.raceNumber}/Win`,
                                        slot:item.raceNumber, 
                                        place: pathValues.place,
                                        code:pathValues.code,
                                        raceType:pathValues.raceType
                                       
                                    }}
                                    onClick={()=>{props.fetchPathParams(
                                        {
                                            slot:item.raceNumber, 
                                            place: pathValues.place,
                                            code:pathValues.code,
                                            raceType:pathValues.raceType
                                        }
                                    )}}
                                        className={item.raceStatus=="Paying"?
                                        "meeting-info-race  meeting-info-race-closed":
                                        "meeting-info-race  meeting-info-race-open"}>
                                            R{item.raceNumber}  
                                            <span className={item.raceStatus=="Paying"?"meeting-info-race-results":"meeting-info-race-time"}>
                                                {item.raceStatus=="Paying"?item.results:startTime(item.raceStartTime)} 
                                            </span>
                                        {/* </a> */}
                                    </Link>
                            )}):"":""}
                        </div>
                    </div>
                    {/* <div className="meeting-info-meeting-conditions">
                        <div className="meeting-info-track-condition">
                            {props.racingDetail.trackCondition}   
                        </div>
                        <div className="meeting-info-weather-condition">
                            <div className="meeting-info-weather-condition-description">
                                {props.racingDetail.weatherCondition}
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            )
        };
    
        return(
            <div className="">
                <div className="race-header-container">
                    <header className="race-header">
                        <div className="race-header-info">
                            <div className="race-heading">
                                <div className="race-number">
                                    R{raceData?raceData[0]?
                                    raceData[0].raceNumber:"":""}
                                </div>
                                <div className="race-header-race-time-not-open">
                                    {startTime(raceData?raceData[0]?
                                    raceData[0].raceStartTime:"":"")}
                                </div>
                            </div>
                            <div className="race-info-wrapper">
                                <div className="race-name">
                                    {raceData?raceData[0]?
                                    raceData[0].raceName:"":""}
                                </div>
                                <ul className="race-metadata-list">
                                <li className="status-text">
                                {raceData?raceData[0]?
                                    raceData[0].raceStatus=="Normal"?
                                    duration(raceData[0].raceStartTime):raceData[0].raceStatus:"":""}
                                    {/* {raceData?raceData[0]?
                                    raceData[0].race?
                                    (raceData[0].raceStatus=="Normal"?
                                    startTime(raceData[0].raceStartTime):
                                    raceData[0].raceStatus):"":"":""} */}
                                </li>
                                    <li>{raceData?raceData[0]?
                                    raceData[0].raceDistance:"":""}m</li>
                                    <li>{todayData?todayData[0]?
                                    todayData[0].prizeMoney:"":""}</li>
                                </ul>
                            </div>
                        </div>
                        {raceSlots(props)}
                    </header>    
                </div>
            </div>
        )
    };

    const poolTot=(props)=>{
        return(
            <div className="page-section">
            <div className="info-table">
                <div className="tabbed-sections">
                    <nav className="tabs-nav">
                        <a className="active">
                            Pools
                        </a>
                    </nav>
                    <section className="tabs-section active">
                        <section className="section">
                            <ul className="pools-list">
                                {props.racingDetail.poolTotals?props.racingDetail.poolTotals.map(total_item=>{
                                    return(
                                        <li>
                                        <span>
                                            {total_item.wageringProduct}
                                        </span>
                                        <span className="amount-span">
                                            {total_item.poolTotal}
                                        </span>
                                    </li>
                                    )
                                }):""}
                            </ul>
                        </section>
                    </section>
                </div>
            </div>
        </div>    
        )
    };

    const racetypes=[{"name":"Win/Place","url":"/RaceDetail/Win"},
    {"name":"Quinella","url":"/RaceDetail/Quinella"},
    {"name":"Trifecta","url":"/RaceDetail/Trifecta"},
    {"name":"First 4","url":"/RaceDetail/First4"},
    {"name":"Exacta","url":"/RaceDetail/Exacta"},
    {"name":"Duet","url":"/RaceDetail/Duet"}]
    
    const placeBets=(props)=>{
        return(
            <div className="bet-type-carousel">
                <ul className="tbc-nav-tabular-list bet-type-carousel-list">
                    {racetypes.map(item=>{
                        return(
                            <li className="tbc-nav-tabular-list-item">
                                <Link  to={{pathname:item.url,
                                    slot:place_slot,
                                place:place}} 
                                className="tbc-nav-tabular-item-link">
                                    <div className="bet-type-carousel-description">
                                        {item.name}
                                    </div>
                                    <div className="bet-type-carousel-legs">
                                    </div>
                                 </Link>
                            </li>
                        )
                    })}
                </ul>
                
            </div>
        )
    };
    return (
        <main className="page-content detail-page">
            <div className="left-column">
                <ui-view>
                    <div className="all-tables">
                        {raceName(props)}
                        <div className="page-section">
                        </div>
                        <div className="page-section">  
                            <div className="race-results-wrapper">
                                <section className={props.racingDetail.raceStatus=="Open"?
                                "runners-section":"results-section"}>
                                    {/* {props.racingDetail.raceStatus=="Open"?placeBets():""} */}
                                    {/* <div className="page-section-break"> */}
                                    {/* </div> */}
                                    {raceData?raceData[0]?raceData[0].raceStatus=="Paying"?resultsTable(props):"":"":""}
                                    {raceData?raceData[0]?raceData[0].raceStatus=="Paying"?exoticTable(props):"":"":""}
                                    {/* {raceData.raceStatus!="Normal"?exoticTable(props):""} */}
                                    {runnerInfo(props)}
                                </section>
                            </div>
                        </div>
                        {poolTot(props)}
                    </div>
                </ui-view>
            </div>
            <MediaQuery query='(min-width: 800px)'>
                <BetSlipHome/>
            </MediaQuery>
        </main>
    );
};

const mapStateToProps=(state,ownProps)=> {
    // console.log(ownProps)
    return{ 
        todayRacing:state.todayRacing,
        slot:ownProps.slot,
        code:ownProps.code,
        raceType:ownProps.raceType,
        place:ownProps.place,
        type:ownProps.type,







        meetingDetails:state.meetingDetails,
        racingDetail:state.racingDetail,
        betSlipInd:state.betSlipInd,
        countBetSlip:state.countBetSlip,
        screenStatus:state.screenStatus,
        remainingBetSlip:state.remainingBetSlip,
        allBetSlip:state.allBetSlip,

        bet_pool_fh_1:ownProps.bet_pool_fh_1,
        bet_pool_fh_2:ownProps.bet_pool_fh_2,
        pathParams:state.pathParams
    }
}
export default connect(mapStateToProps, 
    { 
        fetchRaceDetails,
        fetchMeetingDetails,
        addBetSlipData,
        allBetSlipData,
        countBetSlipData,
        betSlipScreen,
        remainingBetSlipData,

        fetchPathParams,
        fetchTodayRacing
        })
    (RaceDetails);



