import React,{useEffect,useState} from 'react';
import { connect } from 'react-redux';
import { fetchMeetingDetails,fetchRaceDetails} from "../../actions";
import "./RaceDetails.css";
const RaceDetails = (props)=>{
    props.fetchRaceDetails(1);
    props.fetchMeetingDetails();
    console.log(props.racingDetail.results)
    const [venue, setVenue] = useState('');
    const [venue_slot, setvenue_slot] = useState('');
    var races_list=[props.meetingDetails.races]
    races_list=Object.values(races_list)
    var items_list={}
    {races_list?races_list.map(item=>{
         items_list=item;
    }): items_list=[]}
    var results_list={}
    {props.racingDetail.results?props.racingDetail.results.map(item=>{
         results_list=item;
    }): results_list=[]};
    var exotic_list={}
    {props.racingDetail.exoticResults?props.racingDetail.exoticResults.map(item=>{
        exotic_list=item;
    }): exotic_list=[]}
    return (
        <main className="page-content">
            <div className="left-column">
                <ui-view>
                    <div>
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
                                                <a className="meeting-info-race meeting-info-race-selected meeting-info-race-closed ">
                                                        R{item.raceNumber}  
                                                        <span className="meeting-info-race-results">
                                                            {item.raceStatus="paying"?item.results:item.raceStartTime.split("T")[1]} 
                                                        </span>
                                                </a>
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
                        <div className="pane">
                            <div className="race-header-container">
                                <header className="race-header">
                                    <div className="race-header-info">
                                        <div className="race-heading">
                                            <div className="race-number">
                                                R{props.racingDetail.raceNumber}

                                            </div>
                                            <div className="race-header-race-time-not-open">
                                                {props.racingDetail.startTime}
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
                        <div className="page-section-pane">
                        </div>
                        <div className="page-section-pane">
                            <div className="race-results-wrapper">
                                <section className="runners-section result-section">
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
                                            {results_list?results_list.map(item=>{  
                                                console.log(item)
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
                                            )}):""}
                                        </tbody>
                                    </table>
                                    <table className="race-table-pane">
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
                                            {props.racingDetail.exoticResults?props.racingDetail.exoticResults.map(exotic_item=>
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
                                                }):""}
                                        </tbody>
                                    </table>
                                    <div>
                                        <div className="pseudo-table">
                                            <div className="pseudo-header">
                                                <div className="labels-wrapper">
                                                    {/* <span className="odds-label double">

                                                    </span> */}
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
                                                        </div>
                                                    </div>
                                                    )
                                                }):""}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </ui-view>
            </div>
        </main>
    )
};

const mapStateToProps=(state)=> {
    return{ 
        meetingDetails:state.meetingDetails,
        racingDetail:state.racingDetail,
    }
}
export default connect(mapStateToProps, { 
    fetchRaceDetails,fetchMeetingDetails} 
    )(RaceDetails);



