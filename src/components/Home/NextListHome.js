import React from 'react';
import { connect } from 'react-redux';
import { Link} from "react-router-dom";
import { fetchNextRaceHome } from "../../actions";
import "./NextListHome.css";

const NextListHome = (props)=>{
    props.fetchNextRaceHome();
    const linksList=[{"name":"Next To Go",
                        "url":"/next-to-go"},
                        {"name":"Racing",
                        "url":"/Today/R"},
                        {"name":"GreyHound",
                        "url":"/Today/G"},
                        {"name":"Harness",
                        "url":"/Today/H"}]
    const startTime=(st)=>{
        var current=new Date(st)
        if (current.getMinutes()<9) {
         return (current.getHours()+":0"+current.getMinutes())
        }
        else return (current.getHours()+":"+current.getMinutes())
    }

    const renderPagesHome=(linksList)=>{
        return(
            <nav className="pane home-page-navigation page-section">
            <div className="scroller">
                {linksList.map(item=>{
                    return(
                        <a>
                            <Link exact to={item.url}>
                                <span className="link-label">
                                    {item.name}
                                </span>
                            </Link>  
                        </a>
                    )
                })}
            </div>
        </nav>
        )
    }
    const renderTodayHome=((props)=>{
        return (        
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
                                {props.nextHome.map(item => {
                                    return(
                                        <Link to={{pathname:"/RaceDetail", slot:item.raceNumber, place: item.meetingName}} className="next-item-list-home">                        
                                            <time>{startTime(item.raceStartTime)}</time>
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
                                )})}
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

                    <nav-bar menu-items="menuItems">
                        {renderPagesHome(linksList)}
                    </nav-bar>
                    <div>
                        {renderTodayHome(props)}            
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
