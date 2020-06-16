import React from 'react';
import { connect } from 'react-redux';
import { Link} from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';
import { fetchNextRaceHome } from "../../actions";
import "./NextListHome.css";

const NextListHome = (props)=>{
    props.fetchNextRaceHome();
    const duration=(raceStartTime)=>
    { 
       const dateToFormat = raceStartTime
       console.log(dateToFormat.split("T")[1].split(".")[0])
       var timenow=   
                <Moment local>
                    {raceStartTime}
                </Moment>
       console.log(timenow.props.children.split("T")[1].split(".")[0])
       return( 
        (timenow.props.children.split("T")[1].split(".")[0])
        )
    };
    const renderToday=(()=>{
        return (        
            (props.nextHome.map(item => {
                 return(
                    <Link to={{pathname:"/RaceDetail", slot:item.raceNumber, place: item.meetingName}} className="next-item-list-home">                        
                        <time>{duration(item.raceStartTime)}</time>
                        <p>{item.meetingName} ({item.location})</p>
                        <div className="race-details-container">
                            <span className="race-detail">
                                {item.raceDistance}m
                            </span>
                            <span className="race-detail">
                                {item.trackCondition} 
                            </span>                            
                        </div>
                    </Link> 
             )}
         ))
         );
    });
    return(
        <main className="page-content">
            <div className="left-column">
                <ui-view>
                    <nav-bar menu-items="menuItems">
                        <nav className="pane home-page-navigation page-section">
                            <div className="scroller">
                                <a>
                                    <Link exact to="/next-to-go">
                                        <span className="link-label">
                                            Next To Go
                                        </span>
                                    </Link>  
                                </a>
                                <a>
                                    <Link exact to="/Today/R">
                                        <span className="link-label">
                                            Racing
                                        </span>
                                    </Link> 
                                </a>
                                <a>
                                    <Link exact to="/Today/G">
                                        <span className="link-label">
                                            GreyHound
                                        </span>
                                    </Link>  
                                </a>
                                <a>
                                    <Link exact to="/Today/H">
                                        <span className="link-label">
                                            Harness
                                        </span>
                                    </Link> 
                                </a>
                            </div>
                        </nav>
                    </nav-bar>
                    <div>
                        <section className="horizontal-pane">
                            <section className="next-to-go-races-section pane page-section">
                                <div className="page-section-heading">
                                    Racing-Next to Go
                                </div>
                                <race-list races="nextToGoRaces">
                                    <ul className="race-list">
                                        <li>
                                            <a>
                                                <div>
                                                    {renderToday()}
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </race-list>
                            </section>
                        </section>
                    </div>
                </ui-view>
            </div>
        </main>
    );
}; 

const mapStateToProps=(state)=> {
    return{ nextHome:state.nextHome}
}
export default connect(mapStateToProps, { fetchNextRaceHome } )(NextListHome);
