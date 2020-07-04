import React,{ useState,useEffect,useRef } from 'react';
import { Link} from "react-router-dom";
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { fetchPathParams} from "../../actions";
import "./NextRace.css";

import BetSlipStore from "../../context/BetSlipContext";

const NextList = (props)=>{
  // console.log(props.next)
      function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const date=formatDate(Date.now());
    const [diffTime, setdiffTime] = useState(Date.now()-new Date("2020-07-03T05:09:00.000Z"))
    const [showLoading, setShowLoading] = useState(false)
    const timerToClearSomewhere = useRef(false) //now you can pass timer to another component
    useEffect(
       () => {
         timerToClearSomewhere.current = setInterval(() => setShowLoading(true), 800)
         return () => {
           clearInterval(timerToClearSomewhere.current)
         }
       },
       [showLoading]
     );
  
     setTimeout(()=>{
        setShowLoading(false)
        return () => {
            clearInterval(timerToClearSomewhere.current)
          }
     },1000);



    const duration=(raceStartTime)=>{
        var left=(Date.now()-new Date(raceStartTime))-diffTime
        var delta=Math.abs((left)/1000)
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        var seconds = Math.floor(delta % 60); 
        if (hours==0 && (minutes>0||minutes<0)){
            if (left>0) {
                if (seconds==0){
                    return(-minutes+'m')
                } else return (-minutes+'m'+seconds+'s')
            }
           else {
            if (seconds==0){
                return(minutes+'m')
            } else return (minutes+'m'+seconds+'s')
            }
        }
        if (hours==0 && minutes==0) {
            if (left>0){
                return(-seconds+'s')
            }
            return (seconds+'s')
        }
        if (hours>0 || hours<0) {
            if (left>0 ) {
                if (minutes==0){
                    return(-hours+'h')
                }
                else return(-hours+'h'+minutes+'m')
            }
            else {
                if (minutes==0){
                    return(hours+'h')
                }
            } return (hours+'h'+minutes+'m')
        }
    };


    const renderToday=(()=>{
        return (        
            (props.next.map(item => {
                                //  console.log(item)
                                //    console.log(item.raceNumber)
                                //    console.log(item.meeting.meetingName)
                                //    console.log(item.meeting.venueMnemonic)
                                //    console.log(item.meeting.raceType)

                 return(
                     <div className="next-to-go-bar-race">
                        <Link className="next-to-go-bar-race-link" 
                        to={{
                            pathname:`/${date}/${item.meeting.meetingName}/${item.meeting.venueMnemonic}/${item.meeting.raceType}/${item.raceNumber}/Win`,
                            slot:item.raceNumber, 
                            place: item.meeting.meetingName,
                            code:item.meeting.venueMnemonic,
                            raceType:item.meeting.raceType                            
                        }}
                        onClick={()=>{props.fetchPathParams(
                            {
                                slot:item.raceNumber, 
                                place: item.meeting.meetingName,
                                code:item.meeting.venueMnemonic,
                                raceType:item.meeting.raceType   
                            }
                        )}}
                        >
                            <div className="next-to-go-bar-race-info">
                                <span className="next-to-go-bar-race-name">
                                    {item.meeting.meetingName} ({item.meeting.location}) - R{item.raceNumber}
                                </span>
                            </div>
                            <time className=
                            {(Date.now()-new Date(item.raceStartTime)>-5*60000)?
                                "next-to-go-bar-race-close-to-start":
                                "next-to-go-bar-time-to-start"}>
                                {duration(item.raceStartTime)}
                            </time>      
                        </Link>
                     </div>
                )})
         ));
    });

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          width: '100%',
          backgroundColor: theme.palette.background.paper,
        },
      }));
    
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    return(
        <div>
            <div className="next-to-go-bar-race-list">
                <div className={classes.root}>
                    <AppBar position="static" color="default">
                        <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                        >
                            {props.next?renderToday(props):""}
                        </Tabs>
                    </AppBar>
                </div>
            </div>
        </div>
        
        );
}; 
const mapStateToProps=(state)=> {
    return{ 
        pathParam:state.pathParams
    }
}
export default connect(mapStateToProps, { fetchPathParams } )(NextList);


