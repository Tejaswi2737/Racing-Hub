import React,{ useState,useEffect,useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import MediaQuery from 'react-responsive'

import "./NextRace.css";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
      },
  })
);

const NextRace = (props)=>{
    const classes = useStyles();
    const [nextRace,setnextRace]=useState([]);
    const [nextRaceGrey,setnextRaceGrey]=useState([]);
    const [nextRaceHarness,setnextRaceHarness]=useState([]);
    const [firstTime, setfirstTime] = useState();
    const [firstNumber, setfirstNumber] = useState()
    const fetchResources=()=>{
        {props.next.map(item =>{
            switch(item.raceType) {
                case 'R' :
                    setnextRace(oldArray => [...oldArray, item]);
                    break
                case 'G' :
                    setnextRaceGrey(oldArray => [...oldArray, item]);
                    break
                default:
                    setnextRaceHarness(oldArray => [...oldArray, item]);
                    break        
                };
        })}
    };

    useEffect(()=> {
        fetchResources(props.next);
    },[props.next]);

     useEffect(() => {
        if (props.next.length>0){
            {props.next[0].raceStartTime?setfirstTime(props.next[0].raceStartTime):setfirstTime()}
            {props.next[0].raceNumber?setfirstNumber(props.next[0].raceNumber):setfirstNumber()}
        }
    }, [props.next])

    const duration=(raceStartTime)=>{ 
        var left=(Date.now()-new Date(raceStartTime))
        var delta=Math.abs(left/1000)
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        var seconds = Math.floor(delta % 60);
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
        if (hours==0 && minutes>=5){
            if (left>0){
                return (-minutes+'m')
            }
            else return(minutes+'m')
        } 
        if (hours==0 && (minutes<=5||minutes>=-5) 
            && (minutes>0||minutes<0)) {
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
            if (left>0) {
                return(-seconds+'s')
            }
            else return((seconds+'s'))
        } 
    };
    
    const renderTodayTableList=(state) =>{
        return (        
           (state.map(item => {
                return( 
                    <Link to="/RaceDetail/Win" className="navigation-entry next-to-go-race next-to-jump">
                        <div>
                            <p className="next-to-go-meeting-info next-to-go-code"> 
                                R{item.raceNumber}
                            </p>
                            <p className="next-to-go-meeting-info next-to-go-time">
                                <time className="time-label">
                                    <span>
                                        {duration(item.raceStartTime)}
                                    </span>
                                </time>
                            </p>
                            <p className="next-to-go-meeting-info next-to-go-meeting">
                                <span className="next-to-go-location">
                                    {item.meetingName} ({item.meetingCode})
                                </span>
                            </p>
                        </div>
                    </Link>
                    



                    // <>
                    //     <MediaQuery query='(min-width: 100px)'>
                    //         <Grid item xs ={4} className="next-section">
                    //             <Link className={classes.paper}  className=
                    //             {(item.raceStartTime==firstTime && item.raceNumber==firstNumber)?
                    //         "next-item-first":"next-item"}
                    //                 to={{pathname:"/RaceDetail", slot:item.raceNumber, place: item.meetingName}}>                        
                    //                 <p>R{item.raceNumber}</p>
                    //                 <time>{duration(item.raceStartTime)}</time>    
                    //                 <p>{item.meetingName} ({item.meetingCode})</p>
                    //             </Link> 
                    //         </Grid>
                    //     </MediaQuery>  
                    // </>                
                )}
        ))
        );
    };

    return(
        <div className="navigation-group">
            <section className="next-to-go-section navigation-section">
                <h1 className="navigation-section-heading">
                    <span className="navigation-section-title">
                        Racing
                    </span>
                </h1>
                <nav className="navigation-entries">
                    {renderTodayTableList(nextRace.slice(0,6))}
                </nav>
                <h1 className="navigation-section-heading">
                    <span className="navigation-section-title">
                        GreyHound
                    </span>
                </h1>
                <nav className="navigation-entries">
                    {renderTodayTableList(nextRaceGrey.slice(0,6))}
                </nav>
                <h1 className="navigation-section-heading">
                    <span className="navigation-section-title">
                        Harness
                    </span>
                </h1>
                <nav className="navigation-entries">
                    {renderTodayTableList(nextRaceHarness.slice(0,6))}
                </nav>
            </section>
              



{/* 

            <div className="next-data">
                <h1>Racing</h1>
                <Grid container spacing={3}>
                    {renderTodayTableList(nextRace.slice(0,6))}
                </Grid>
                <h1>GreyHound</h1>
                <Grid container spacing={3}>
                    {renderTodayTableList(nextRaceGrey.slice(0,6))}
                </Grid>
                <h1>Harness</h1>
                <Grid container spacing={3}>
                    {renderTodayTableList(nextRaceHarness.slice(0,6))}
                </Grid>
            </div> */}
        </div>
        );
}; 

export default NextRace