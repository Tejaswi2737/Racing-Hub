import React from 'react';
// import { connect } from 'react-redux';
import { Link} from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';
import moment from "moment"
import countdownLib from 'countdown';
import Countdown from 'react-countdown';

// import { fetchNextRace } from "../../actions";
import "./NextRace.css";

const NextList = (props)=>{
    // props.fetchNextRace();

    const duration=(raceStartTime)=>{
        // Moment.startPooledTimer(1000)
        // console.log("mounted")
        // // var left= <Moment duration={raceStartTime} unit="days"
        // // date={Date.now()}/>
        // // console.log(left)
        var timelo=<moment local>{raceStartTime}</moment>

        // var left =<Moment diff={Date.now()} >
        //         {<Moment local>{raceStartTime}</Moment>}
        //     </Moment>
        // // var time=left.props.diff%3600



        // var left =<Moment  diff={Date.now()} >
        //         <Moment local>{raceStartTime}</Moment>
        //     </Moment>
        // console.log(left.props.diff/1000)
        // var delta = Math.abs(left.props.diff/1000) ;
        // console.log(delta)
        // // calculate (and subtract) whole days
        // var days = Math.floor(delta / 86400);
        // delta -= days * 86400;

        // // calculate (and subtract) whole hours
        // var hours = Math.floor(delta / 3600) % 24;
        // delta -= hours * 3600;

        // // calculate (and subtract) whole minutes
        // var minutes = Math.floor(delta / 60) % 60;
        // delta -= minutes * 60;

        // // what's left is seconds
        // var seconds = delta % 60;  // in theory the modulus is not required
        // return (hours+'h'+minutes+'m'+seconds)
        // const SERVER_REGION = 'Australia/Sydney';

        // const localDateTime=(datetime)=> {
        //     // cant call this.serverDateTime as 'this' is not always available
        //     const time = datetime || Moment();
        //     const serverDateTime = Moment.tz(time, SERVER_REGION);
        //     return serverDateTime.clone().utcOffset(Moment().utcOffset());
        // };
    	// const countdown = (time)=> {
        //     var localTime = timelo;
        //     var ts = countdownLib(raceStartTime);
        //     var formatted = '';
        //     if (ts.months > 1) {
        //         formatted = ts.months + ' months';
        //     } else if (ts.days === 0) {
        //         if (ts.hours === 0) {
        //             if (ts.minutes < 5) {
        //                 formatted = ts.minutes + 'm ' + ts.seconds + 's';
        //             } else {
        //                 formatted = ts.minutes + 'm ';
        //             }
        //         } else {
        //             formatted = ts.hours + 'h ' + ts.minutes + 'm';
        //         }
        //     } else {
        //         formatted = ts.days + 'd ' + ts.hours + 'h';
        //     }
    
        //     if (Moment(time) < Moment()) {
        //         formatted = '-' + formatted;
        //     }
    
        //     return formatted;
        // }
        // {countdown(raceStartTime)}



        // var left=<Moment  date={raceStartTime} durationFromNow/>
        // var left =<Moment diff={Date.now()} >
        //         {Date.now()}
        //     </Moment>
        // console.log(left.props.diff)

        console.log(Date.now()-new Date(raceStartTime))
        var left=(Date.now()-new Date(raceStartTime))



        
        // var left=Date.now()-new Date(raceStartTime)
        // // console.log(countdownLib.props)
    //     var left=<Countdown date={Date.now()+10000}
    //     intervalDelay={1000}
    //     precision={1}
    //     renderer={props => <div>{props.total}</div>}
    //   />
        // const left=countdownLib(raceStartTime)
        // console.log(left)
        // return(left.minutes)


        // var delta = Math.abs(left.props.diff/1000) ;
        var delta=Math.abs(left/1000)
        console.log(left)
        // console.log(delta)
        // // calculate (and subtract) whole days
         var days = Math.floor(delta / 86400);
         delta -= days * 86400;

        // // calculate (and subtract) whole hours
         var hours = Math.floor(delta / 3600) % 24;
         delta -= hours * 3600;

        // // calculate (and subtract) whole minutes
         var minutes = Math.floor(delta / 60) % 60;
         delta -= minutes * 60;
         if (left>0){
             hours=-hours
         }

        // // what's left is seconds
         var seconds = Math.floor(delta % 60);  // in theory the modulus is not required
         return (hours+'h'+minutes+'m'+seconds+'s')
    };
    const renderToday=(()=>{
        return (        
            (props.next.map(item => {
                 return(
                     <div className="next-to-go-bar-race">
                        <Link className="next-to-go-bar-race-link" to={{pathname:"/RaceDetail/Win", slot:item.raceNumber, place: item.meetingName}}>
                            <div className="next-to-go-bar-race-info">
                                <span className="next-to-go-bar-race-name">
                                    {item.meetingName} ({item.location}) - R{item.raceNumber}
                                </span>
                            </div>
                            <time className="next-to-go-bar-time-to-start next-to-go-bar-race-close-to-start">
                                {duration(item.raceStartTime)}
                            </time>      
                        </Link>
                     </div>
             )}
         )
         )
         );
    });
    return(
        <div>
            <div className="next-to-go-bar-race-list">
                {renderToday()}
                {/* {setInterval(() => {
                   renderToday()
                }, 1000)} */}
            </div>
        </div>
        
        );
}; 
export default NextList
// const mapStateToProps=(state)=> {
//     return{ next:state.next}
// }
// export default connect(mapStateToProps, { fetchNextRace } )(NextList);