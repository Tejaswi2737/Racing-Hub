import React,{ useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchNextRace } from "../actions";
import "./NextRace.css";

const NextRaceTable = (props)=>{
    props.fetchNextRace();
    const [nextRace,setnextRace]=useState([]);
    const [nextRaceGrey,setnextRaceGrey]=useState([]);
    const [nextRaceHarness,setnextRaceHarness]=useState([]);
    const renderSwitchRacing =(item)=> {
        switch(item.Category) {
          case 'Racing':
            return (  
                <div>
                    <h1>Racing</h1>
                    <div className="next-item">                        
                        <p>{item.Location} {item.Location_Code}-
                        {item.Race_Slot}         {item.Duration}</p>
                    </div> 
                </div>                 
                );
            default:
                    return
        };   
    };
    const renderSwitchGrey=(item)=> { 
        switch(item.Category) {
            case 'GreyHound':
            return (                   
                <div>
                    <h1>GreyHound</h1>
                    <div className="next-item">                        
                        <p>{item.Race_Slot}</p>
                        <p>{item.Duration}</p>
                        <p>{item.Location} {item.Location_Code}</p>
                    </div> 
                </div> 
                );
            default:
                    return
    }};
    const renderSwitchHarness=(item)=> { 
        switch(item.Category) {
            case 'Harness':
            return (                   
                <div>
                    <h1>Harness</h1>
                    <div className="next-item">                        
                        <p>{item.Race_Slot}</p>
                        <p>{item.Duration}</p>
                        <p>{item.Location} {item.Location_Code}</p>
                    </div> 
                </div> 
                );
            default:
                return
        };
    };
    const renderList=() =>{
        return (        
           (props.next.map(item => {
                return(
                <section className="next-section-racing" >
                    <div>
                        {renderSwitchRacing(item)}
                    </div>
                    <div>
                        {renderSwitchGrey(item)}
                    </div>
                    <div>
                        {renderSwitchHarness(item)}
                    </div>                    
                </section>
            )}
        ))
        );
    };
    useEffect(() => {
        {props.next.map(item =>{
            switch(item.Category) {
                case 'Racing' :
                    setnextRace([...nextRace,item]);
                    break
                case 'GreyHound' :
                    setnextRaceGrey([...nextRaceGrey,item]);
                    break
                default:
                    setnextRaceHarness([...nextRaceHarness,item]);
                    break        
                }
        })}
    },[props]);
    console.log(nextRace)
    return(
            <div className="ui ui relaxed dived list">
                {renderList()}
            </div>
        )
} 

const mapStateToProps=(state)=> {
    return{ next:state.next}
}
export default connect(mapStateToProps, { fetchNextRace } )(NextRaceTable);


const renderSwitchRacing =(item)=> {
    switch(item.Category) {
      case 'Racing':
        return (   
            <div>
                <h1>Racing</h1>
                <div className="next-item">                        
                    <p>{item.Race_Slot}</p>
                    <p>{item.Duration}</p>
                    <p>{item.Location} {item.Location_Code}</p>
                </div> 
            </div>                 
            );
        default:
            return
    };   
};
const renderSwitchGrey=(item)=> { 
    switch(item.Category) {
        case 'GreyHound':
        return (                   
            <div>
                <h1>GreyHound</h1>
                <div className="next-item">                        
                    <p>{item.Race_Slot}</p>
                    <p>{item.Duration}</p>
                    <p>{item.Location} {item.Location_Code}</p>
                </div> 
            </div> 
            );
        default:
            return
}};
const renderSwitchHarness=(item)=> { 
    switch(item.Category) {
        case 'Harness':
        return (                   
            <div>
                <h1>Harness</h1>
                <div className="next-item">                        
                    <p>{item.Race_Slot}</p>
                    <p>{item.Duration}</p>
                    <p>{item.Location} {item.Location_Code}</p>
                </div> 
            </div> 
            );
        default:
            return
    };
};