import React from 'react';
import { connect } from 'react-redux';
import { Link} from "react-router-dom";
import { fetchNextRaceHome } from "../../actions";
import "./NextListHome.css";


import BetSlipStore from "../../context/BetSlipContext";

const NextListHome = (props)=>{
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
    };
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
                                        <Link to={{
                                            pathname:"/RaceDetail", 
                                            slot:item.raceNumber, 
                                            place: item.meetingName,
                                            bet_pool_fh_1:item.raceStartTime.slice(0,6)+'_'+
                                            "racing_"+item.raceType+'_'+item.meetingName+'_'+item.location+'_'+item.raceNumber+'_'+'w',
                                            bet_pool_fh_2:item.raceStartTime.slice(0,6)+'_'+
                                            "racing_"+item.raceType+'_'+item.meetingName+'_'+item.location+'_'+item.raceNumber+'_'+'p'
                                        }} className="next-item-list-home">                        
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
