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
    countBetSlipData
} from "../../actions";

import BetSlipHome from '../BetSlip/BetSlipHome';

import "./RaceDetails.css";

const RaceDetails = (props,ownProps)=>{
    const [pool_fh, setpool_fh] = useState();
    const [count, setcount] = useState()
    const [place_list_all, setplace_list_all] = useState(["NORTHFIELD PARK (USA) Race6",'ergevdfgdbb','rgergegegeetheeh'])
    // var place_list_all=["NORTHFIELD PARK (USA) Race6",'ergevdfgdbb','rgergegegeetheeh'];
    var runner_list_all=[[1,2,3,4],[3,4],[1,2,3]];
    const [addedBet, setaddedBet] = useState(false)
    const [runnerSelection, setrunnerSelection] = useState([]);
    const [runner_win_place, setrunner_win_place] = useState({})

    // console.log(props.bet_pool_fh_1)
    props.fetchMeetingDetails();
    if (parseInt(props.slot)){
        var initialValue=parseInt(props.slot)
    } else {
        initialValue=1
    }
    if ((props.place)){
        var initialValuePlace=(props.place)
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


     const duration=(raceStartTime)=>{ 
        var left=(Date.now()-new Date(raceStartTime))
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
        var current=new Date(st)
        if (current.getMinutes()<9) {
         return (current.getHours()+":0"+current.getMinutes())
        }
        else return (current.getHours()+":"+current.getMinutes())
    };

    const resultsTable=(props)=>{
        return(
            <table className="race-table-results pane">
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
                </thead>
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
            <table className="race-table pane">
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
            </thead>
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
    // console.log(props.countBetSlip)
    // if(props.countBetSlip) {
    //     console.log("one")
    //     props.countBetSlipData(0)
    // } else {
    //     console.log("two")
    //     // props.countBetSlipData(0)
    // }
    const handleClick=(props,runner_item)=>{
        if ((props.racingDetail.raceStatus=="Open")) {

            if(props.countBetSlip && props.countBetSlip.length==0) {
                // console.log(props.countBetSlip);
                props.countBetSlipData(1);
                setcount((props.countBetSlip));
                setrunner_win_place({
                    "pool_fh":"tk_integ"+props.countBetSlip,
                    "name":props.racingDetail.meeting.meetingName+" "+"("+props.racingDetail.meeting.location+")"+" Race "+props.racingDetail.raceNumber || ""
                    ,"runners":runner_item.runnerNumber
                });
            } else {
                console.log("two");
                console.log(props.countBetSlip)
                props.countBetSlipData(parseInt(props.countBetSlip)+1);
                setcount((props.countBetSlip));
                setrunner_win_place({
                    "pool_fh":"tk_integ"+props.countBetSlip,
                    "name":props.racingDetail.meeting.meetingName+" "+"("+props.racingDetail.meeting.location+")"+" Race "+props.racingDetail.raceNumber || ""
                    ,"runners":runner_item.runnerNumber
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
    // console.log(count)

    useEffect(() => {
        // console.log(count)
    }, [count]);
    // console.log(props.countBetSlip)

    useEffect(() => {
        if ((runner_win_place)) {
            {props.addBetSlipData(runner_win_place)}
            {props.allBetSlipData(runner_win_place)}
            // console.log(runner_win_place)
        }
    }, [runner_win_place])
    // console.log(props.betSlipInd)

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
                        >
                        <div className="price-cell-body-first">
                            <div >
                                <div className="first-price">
                                    ${runner_item.returnWin}
                                </div>
                            </div>
                        </div>
                        <div className="price-cell-body">
                            <div>
                                <div>
                                    ${runner_item.returnPlace}
                                </div>
                            </div>
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
    
    const handleactionBetPlace=()=>{

    }
    // useEffect(() => {
    //     if(props.betSlipInd) {
    //         // console.log(props.betSlipInd)
    //         props.allBetSlipData(props.betSlipInd)
    //     }
    // }, [props.betSlipInd])
    // console.log(props.allBetSlip)
    const raceName=(props)=>{
        const raceSlots=(props)=>{
            return(                        
            <div className="meeting-race-selector">
                <div className="meeting-info">
                    <div className="meeting-info-race-selector-wrapper">
                        <div className="meeting-info-race-selector">     
                            {items_list?items_list.map(item=>{
                                return(
                                    <div onClick={()=>{
                                        
                                        {handleactionBetPlace()}
                                        {setaddedBet(false)}
                                        setplace_slot(item.raceNumber)
                                        setplace(item.Location)
                                        }}>
                                        <a className=
                                        {item.raceStatus=="Paying"?
                                        "meeting-info-race  meeting-info-race-closed":
                                        "meeting-info-race  meeting-info-race-open"}>
                                            R{item.raceNumber}  
                                            <span className={item.raceStatus=="Paying"?"meeting-info-race-results":"meeting-info-race-time"}>
                                                {item.raceStatus=="Paying"?item.results:item.raceStartTime} 
                                            </span>
                                        </a>
                                    </div>
                            )}):""}
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
            <div className="pane">
                <div className="race-header-container">
                    <header className="race-header">
                        <div className="race-header-info">
                            <div className="race-heading">
                                <div className="race-number">
                                    R{props.racingDetail.raceNumber}
                                </div>
                                <div className="race-header-race-time-not-open">
                                    {startTime(props.racingDetail.raceStartTime)}
                                </div>
                            </div>
                            <div className="race-info-wrapper">
                                <div className="race-name">
                                    {props.racingDetail.raceName}

                                </div>
                                <ul className="race-metadata-list">
                                <li className="status-text">
                                    {props.racingDetail.raceStatus=="Paying"?
                                    props.racingDetail.raceStatus:
                                    duration(props.racingDetail.raceStartTime)}
                                </li>
                                    <li>{props.racingDetail.raceDistance}m</li>
                                    <li>{props.racingDetail.prizeMoney}</li>
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
            <div className="page-section pane">
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
        <main className="page-content">
            <div className="left-column">
                <ui-view>
                    <div className="all-tables">
                        {raceName(props)}
                        <div className="page-section pane">
                        </div>
                        <div className="page-section pane">  
                            <div className="race-results-wrapper">
                                
                                <section className={props.racingDetail.raceStatus=="Open"?
                                "runners-section":"results-section"}>
                                    {props.racingDetail.raceStatus=="Open"?placeBets():""}
                                    <div className="page-section-break">
                                    </div>
                                    {props.racingDetail.raceStatus=="Paying"?resultsTable(props):""}
                                    {props.racingDetail.raceStatus=="Paying"?exoticTable(props):""}
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
    return{ 
        slot:ownProps.slot,
        meetingDetails:state.meetingDetails,
        racingDetail:state.racingDetail,
        betSlipInd:state.betSlipInd,
        countBetSlip:state.countBetSlip,
        allBetSlip:state.allBetSlip,
        place:ownProps.place,
        type:ownProps.type,
        bet_pool_fh_1:ownProps.bet_pool_fh_1,
        bet_pool_fh_2:ownProps.bet_pool_fh_2,
        
    }
}
export default connect(mapStateToProps, 
    { 
        fetchRaceDetails,
        fetchMeetingDetails,
        addBetSlipData,
        allBetSlipData,
        countBetSlipData
        })
    (RaceDetails);



