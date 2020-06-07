import React from 'react';
import { connect } from 'react-redux';
import { Link,Route} from "react-router-dom";

import { fetchNextRace } from "../../actions";
import "./NextRace.css";

const NextList = (props)=>{
    props.fetchNextRace();
    console.log(props.next)
    const renderToday=(()=>{
        return (        
            (props.next.map(item => {
                 return(
                    <Link className="next-item-list" to={{pathname:"/RaceDetail" ,state:item.Location,place:item.Location_Code}}>
                            <p>{item.Location} {item.Location_Code}-
                            {item.Race_Slot} Time Left-{item.Duration}</p>
                    </Link>

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