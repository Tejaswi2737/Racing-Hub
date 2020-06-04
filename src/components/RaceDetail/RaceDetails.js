import React from 'react'
import "./RaceDetails.css"
const RaceDetails=() => {
    return (
        <div className="meeting-race-selector">
            <div className="meeting-info">
                <button className="meeting-info-meeting-selector">
                    <div className="meeting-info-description">
                        Place
                    </div>
                </button>
                <div className="meeting-info-race-selector-wrapper">
                    <div className="meeting-info-race-selector">
                        <a className="meeting-race-info meeting-info-race-closed">
                            <text>
                                Place
                            </text>
                            <span className="meeting-info-race-results">
                               wrfg 
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default RaceDetails;

