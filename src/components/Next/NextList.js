import React from 'react';
import { connect } from 'react-redux';
import { fetchNextRace } from "../../actions";
import "./NextRace.css";

const NextList = (props)=>{
    props.fetchNextRace();
    console.log(props.next)
    const renderToday=(()=>{
        return (        
            (props.next.map(item => {
                 return(
                    <div className="next-item-list">                        
                        <p>{item.Location} {item.Location_Code}-
                        {item.Race_Slot} Time Left-{item.Duration}</p>
                    </div> 
             )}
         )
         )
         );
    });
    return(
        <div>
            <div className="next-list">
                {renderToday()}
            </div>
        </div>
        );
}; 

const mapStateToProps=(state)=> {
    return{ next:state.next}
}
export default connect(mapStateToProps, { fetchNextRace } )(NextList);