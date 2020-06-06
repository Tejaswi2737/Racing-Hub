import React from 'react';
import { connect } from 'react-redux';
import { fetchRaceDetails} from "../../actions";
import "./RaceDetails.css";
const RaceDetails = (props)=>{
    props.fetchRaceDetails()
    var races_list=[props.racingDetail.races]
    races_list=Object.values(races_list)
    console.log(Object.values(races_list))
    var items_list={}
    {races_list?races_list.map(item=>{
         items_list=item;
    }): items_list=[]}
    console.log(items_list)
    return (
        <>
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

                            </div>
                            <div className="race-header-race-time-not-open">

                            </div>
                        </div>
                        <div className="race-info-wrapper">
                            <div className="race-name">

                            </div>
                            <ul className="race-metadata-list">
                                <li className="status.text"></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </header>
            </div>
        </div>
        </>
    )
};

const mapStateToProps=(state)=> {
    return{ 
        racingDetail:state.racingDetail,
    }
}
export default connect(mapStateToProps, { 
    fetchRaceDetails} 
    )(RaceDetails);