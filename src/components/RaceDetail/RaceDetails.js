import React,{useEffect,useState} from 'react';
import { connect } from 'react-redux';
import { fetchMeetingDetails,fetchRaceDetails} from "../../actions";
import "./RaceDetails.css";
const RaceDetails = (props,ownProps)=>{
    props.fetchMeetingDetails();
    console.log(props.venue)
    if (parseInt(props.slot)){
        var initialValue=parseInt(props.slot)
    } else {
        initialValue=1
    }
    if ((props.venue)){
        var initialValuePlace=(props.venue)
    } else {
        initialValuePlace=""
    }
    const [venue, setvenue] = useState(initialValuePlace);
    const [venue_slot, setvenue_slot] = useState(initialValue);
    var races_list=[props.meetingDetails.races];
    useEffect(() => {
        setvenue_slot(initialValue)
    }, [initialValue,initialValuePlace])
    useEffect(() => {
        props.fetchRaceDetails(venue_slot);
    }, [venue_slot,venue])
    races_list=Object.values(races_list);
    var items_list={}
    {races_list?races_list.map(item=>{
         items_list=item;
    }): items_list=[]};
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
    const runnerInfo=(props)=>{
        return(
            <div className="race-runners-wrapper results">
            <div className="pseudo-table">
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
                            Win
                        </div>
                        <div className="cell price-cell hidden">
                            Place
                        </div>
                    </div>
                </div>
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
                        </div>
                        )
                    }):""}
                </div>
            </div>
        </div>
    
        )
    };
    const raceSlots=(props)=>{
        return(                        
        <div className="meeting-race-selector">
            <div className="meeting-info">
                <button className="meeting-info-meeting-selector">
                    <div className="meeting-info-description">
                        Place
                    </div>
                </button>
                <div className="meeting-info-race-selector-wrapper">
                    <div className="meeting-info-race-selector">     
                        {items_list?items_list.map(item=>{
                            return(
                                <div onClick={()=>{setvenue_slot(item.raceNumber)
                                setvenue(item.Location)}}>
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
                                    {props.racingDetail.raceStartTime}
                                </div>
                            </div>
                            <div className="race-info-wrapper">
                                <div className="race-name">
                                    {props.racingDetail.raceName}

                                </div>
                                <ul className="race-metadata-list">
                                <li className="status.text">{props.racingDetail.raceStatus}</li>
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

    return (
        <main className="page-content">
            <div className="left-column">
                <ui-view>
                    <div>
                        {raceSlots(props)}
                        {raceName(props)}
                        <div className="page-section-pane">
                        </div>
                        <div className="page-section-pane">
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
        </main>
    );
};

const mapStateToProps=(state,ownProps)=> {
    return{ 
        slot:ownProps.slot,
        meetingDetails:state.meetingDetails,
        racingDetail:state.racingDetail,
        venue:ownProps.place
    }
}
export default connect(mapStateToProps, { 
    fetchRaceDetails,fetchMeetingDetails} 
    )(RaceDetails);



