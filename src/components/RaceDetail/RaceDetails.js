import React,{useEffect,useState,useRef} from 'react';
import { connect } from 'react-redux';
import { Link} from "react-router-dom";
import MediaQuery from 'react-responsive';

import { fetchMeetingDetails,
    fetchRaceDetails,
    fetchWinPlaceBet} from "../../actions";



import BetSlipHome from '../BetSlip/BetSlipHome';

import "./RaceDetails.css";


const RaceDetails = (props,ownProps)=>{
    props.fetchMeetingDetails();
    console.log(props.place)
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
        console.log(raceStartTime)
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
        console.log(current.getMinutes())
        if (current.getMinutes()<9) {
            console.log("1")
         return (current.getHours()+":0"+current.getMinutes())
        }
        else return (current.getHours()+":"+current.getMinutes())
    }



    const resultsTable=(props)=>{
        return(
            <table className="race-table pane">
            <thead className="result-header runner-header resulted">
                <tr className="result-header runner-header resulted">
                    <th className="details-header">
                        Results
                    </th>
                    <th className="">
                        Runner
                    </th>
                    <th className="right result-odds-header">
                        Tote
                    </th>
                </tr>
            </thead>
            <tbody className="">
                {props.racingDetail.results.map(item=>{  
                    return(
                        <tr className="result-item">
                            <td className="result-position">
                                {item.place}
                            </td>
                        <td className="runner-details">
                            {item.runnerNumber} {item.runnerName}
                            <dl className="runner-metadata-list">
                                <dt>
                                    D
                                </dt>
                                <dd className="full-name">
                                    {item.riderDriverName}
                                </dd>
                                <dt>
                                    T
                                </dt>
                                <dd className="full-name">
                                    {item.trainerName}
                                </dd>
                            </dl>
                        </td>
                        <td className="right result-tote-odds">
                            <div className="result-odds-details">
                                <div className="result-win">
                                    {item.toteWin}
                                </div>
                                <div className="result-place">
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
            <thead className="">
                <tr className="result-header pool-header">
                    <th className="details-header">
                        Exotic Results
                    </th>
                    <th className="result-combo-header">
                        Results
                    </th>
                    <th className="result-odds-header right">
                        Dividend
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.racingDetail.exoticResults.map(exotic_item=>
                    {
                        return(
                            <tr className="result-item thin">
                            <td>
                                {exotic_item.wageringProduct}
                            </td>
                            <td className="result-results">
                                <div className="result-odds-details">
                                    <div className="result-pool-name result-pool-selections">
                                        <span>
                                            {exotic_item.Results}        
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td className="right result-dividends">
                                <div className="result-odds-details">
                                    <div className="result-pool-odds">
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


    const runnerInfoheader=(props)=>{
        return(
            <div className="pseudo-header">
            <div className="labels-wrapper">
                <span className="odds-label double">
                    TOTE
                </span>
            </div>
            <div className="row">
                <div className="cell number-cell active">
                    No
                </div>
                <div className="cell name-cell">
                    Runner
                </div>
                <div className="cell price-cell hidden">
                    
                </div>
                <div className="cell price-cell hidden">
                    Win
                </div>
                <div className="cell price-cell hidden">
                    Place
                </div>
                {(props.type=="Quinella"||props.type=="Duet")?
                        <div className="cell price-cell hidden">
                            1st Box
                        </div>
                    :(props.type=="Trifecta")?
                    <>
                        <div className="cell price-cell hidden">
                            1st Box
                        </div>
                        <div className="cell price-cell hidden">
                            2nd
                        </div>
                        <div className="cell price-cell hidden">
                            3rd
                        </div>
                    </>
                    :(props.type=="First4")?
                    <>
                        <div className="cell price-cell hidden">
                            1st Box
                        </div>
                        <div className="cell price-cell hidden">
                            2nd
                        </div>
                        <div className="cell price-cell hidden">
                            3rd
                        </div>
                        <div className="cell price-cell hidden">
                            4th
                        </div>
                    </>:(props.type=="Exacta")?
                    <>
                        <div className="cell price-cell hidden">
                            1st Box
                        </div>
                        <div className="cell price-cell hidden">
                            2nd
                        </div>         
                    </> :""              
                }

            </div>
        </div>
        )
    };

    const runnerInfoBody=(props)=>{
        return(
            <div className="pseudo-body">
            {props.racingDetail.runners?props.racingDetail.runners.map(runner_item=>{
                return(
                    <div className="row">
                    <div className="cell number-cell">
                        {runner_item.runnerNumber}
                    </div>
                    <div className="cell name-cell">
                        <div className="runner-name-metadata-wrapper">
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
                    <div className="cell price-cell win-cell animate-field-653 wrappable unselectable closed">
                        
                    </div>
                    <div className="cell price-cell win-cell animate-field-653 wrappable unselectable closed">
                        <div className="animate-change">
                            <div className="animate-odd">
                                ${runner_item.returnWin}
                            </div>
                        </div>
                    </div>
                    <div className="cell price-cell animate-field-655 wrappable unselectable closed favourite">
                        <div className="animate-change">
                            <div className="animate-odd">
                                ${runner_item.returnPlace}
                            </div>
                        </div>
                    </div>

                    {(props.type=="Quinella"||props.type=="Duet")?
                        <div className="cell price-cell animate-field-655 wrappable unselectable closed favourite">
                            <div className="animate-change">
                                <div className="animate-odd">
                                <input
                                        name="1st"
                                        type="checkbox"
                                        />                                    
                                </div>
                            </div>
                        </div>
                        :(props.type=="Trifecta")?
                        <>
                            <div className="cell price-cell animate-field-655 wrappable unselectable closed favourite">
                                <div className="animate-change">
                                    <div className="animate-odd">
                                    <input
                                            name="1st"
                                            type="checkbox"
                                            />                                    
                                    </div>
                                </div>
                            </div>
                            <div className="cell price-cell animate-field-655 wrappable unselectable closed favourite">
                                <div className="animate-change">
                                    <div className="animate-odd">
                                    <input
                                            name="2nd"
                                            type="checkbox"
                                            />                                    
                                    </div>
                                </div>
                            </div>
                            <div className="cell price-cell animate-field-655 wrappable unselectable closed favourite">
                                <div className="animate-change">
                                    <div className="animate-odd">
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
                            <div className="cell price-cell animate-field-655 wrappable unselectable closed favourite">
                                <div className="animate-change">
                                    <div className="animate-odd">
                                    <input
                                            name="1st"
                                            type="checkbox"
                                            />                                    
                                    </div>
                                </div>
                            </div>
                            <div className="cell price-cell animate-field-655 wrappable unselectable closed favourite">
                                <div className="animate-change">
                                    <div className="animate-odd">
                                    <input
                                            name="2nd"
                                            type="checkbox"
                                            />                                    
                                    </div>
                                </div>
                            </div>
                            <div className="cell price-cell animate-field-655 wrappable unselectable closed favourite">
                                <div className="animate-change">
                                    <div className="animate-odd">
                                    <input
                                            name="3rd"
                                            type="checkbox"
                                            />                                    
                                    </div>
                                </div>
                            </div>
                            <div className="cell price-cell animate-field-655 wrappable unselectable closed favourite">
                                <div className="animate-change">
                                    <div className="animate-odd">
                                    <input
                                            name="4th"
                                            type="checkbox"
                                            />                                    
                                    </div>
                                </div>
                            </div>
                        </>:(props.type=="Exacta")?
                        <>
                            <div className="cell price-cell animate-field-655 wrappable unselectable closed favourite">
                                <div className="animate-change">
                                    <div className="animate-odd">
                                    <input
                                            name="1st"
                                            type="checkbox"
                                            />                                    
                                    </div>
                                </div>
                            </div>
                            <div className="cell price-cell animate-field-655 wrappable unselectable closed favourite">
                                <div className="animate-change">
                                    <div className="animate-odd">
                                    <input
                                            name="2nd"
                                            type="checkbox"
                                            />                                    
                                    </div>
                                </div>
                        </div>      
                        </> :""              
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

    const raceSlots=(props)=>{
        return(                        
        <div className="meeting-race-selector">
            <div className="meeting-info">
                <button className="meeting-info-meeting-selector">
                    <div className="meeting-info-description" >
                        Place
                    </div>
                </button>
                <div className="meeting-info-race-selector-wrapper">
                    <div className="meeting-info-race-selector">     
                        {items_list?items_list.map(item=>{
                            return(
                                <div onClick={()=>{setplace_slot(item.raceNumber)
                                setplace(item.Location)}}>
                                    <a className=
                                    {item.raceStatus=="Paying"?
                                    "meeting-info-race meeting-info-race-selected meeting-info-race-closed":
                                    "meeting-info-race meeting-info-race-selected meeting-info-race-open"}>
                                            R{item.raceNumber}  
                                            <span className={item.raceStatus=="Paying"?"meeting-info-race-results":"meeting-info-race-time"}>
                                                {item.raceStatus=="Paying"?item.results:item.raceStartTime} 
                                            </span>
                                    </a>
                                </div>

                        )}):""}
                    </div>
                </div>
                <div className="meeting-info-meeting-conditions">
                    <div className="meeting-info-track-condition">
                        {props.racingDetail.trackCondition}   
                    </div>
                    <div className="meeting-info-weather-condition">
                        <div className="meeting-info-weather-condition-description">
                            {props.racingDetail.weatherCondition}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    };

    const raceName=(props)=>{
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
                                <li className="status.text">
                                    {props.racingDetail.raceStatus=="Paying"?
                                    props.racingDetail.raceStatus:
                                    duration(props.racingDetail.raceStartTime)}
                                </li>
                                    <li>{props.racingDetail.raceDistance}m</li>
                                    <li>{props.racingDetail.prizeMoney}</li>
                                </ul>
                            </div>
                        </div>
                    </header>
                </div>
            </div>
        )
    };

    const poolTot=(props)=>{
        console.log(props)
        return(
            <div className="page-section-pane">
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
        console.log(props)
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
                    <div>
                        {raceSlots(props)}
                        {raceName(props)}
                        <div className="page-section pane">
                        </div>
                        <div className="page-section pane">
                            {props.racingDetail.raceStatus=="Open"?placeBets():""}
                            <div className="race-results-wrapper">
                                <section className="runners-section result-section">
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
        winPlace:state.winPlaceBet,
        place:ownProps.place,
        type:ownProps.type
    }
}
export default connect(mapStateToProps, 
    { 
        fetchRaceDetails,
        fetchMeetingDetails,
        fetchWinPlaceBet
    })
    (RaceDetails);



