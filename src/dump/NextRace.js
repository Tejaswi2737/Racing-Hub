import React from 'react';
import { connect } from 'react-redux';
import { fetchNextRace } from "../actions"
import "./NextRace.css"
class NextRace extends React.Component {
    componentDidMount() {
        console.log(this.props.next)
        this.props.fetchNextRace();    
    };
    renderSwitchRacing(item) { 
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
        }
    };
    renderSwitchGrey(item) { 
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
    }};
    renderSwitchHarness(item) { 
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
        };
    }
    renderList() {
        return (        
           (this.props.next.map(item => {
                return(
                <section className="next-section-racing" key="item.id">
                    <div>
                        {this.renderSwitchRacing(item)}
                    </div>
                    <div>
                        {this.renderSwitchGrey(item)}
                    </div>
                    <div>
                        {this.renderSwitchHarness(item)}
                    </div>                    
                </section>
            )}
        ))
        );
    };
    render() {
        return(
            <div className="ui ui relaxed dived list">
                {this.renderList()}
            </div>
        )
    }
}
const mapStateToProps=(state)=> {
    console.log(state)
    return{ next:state.next}
}
export default connect(mapStateToProps, { fetchNextRace } )(NextRace);