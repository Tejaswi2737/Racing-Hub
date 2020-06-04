import React from 'react';
import { connect } from 'react-redux';
import { Link} from "react-router-dom";

import { fetchNextRace } from "../../actions";
import "./NextListHome.css";

const NextListHome = (props)=>{
    props.fetchNextRace();
    const renderToday=(()=>{
        return (        
            (props.next.map(item => {
                 return(
                    <a className="next-item-list-home">                        
                        <p>{item.Location} {item.Location_Code}</p>
                        <div className="race-details-container">
                            <span className="race-detail">
                                {item.Race_Slot}
                            </span>
                            <span className="race-detail">
                                {item.Duration}
                            </span>                            
                        </div>
                    </a> 
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
    return{ next:state.next}
}
export default connect(mapStateToProps, { fetchNextRace } )(NextListHome);