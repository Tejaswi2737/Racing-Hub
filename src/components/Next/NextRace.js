import React,{ useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link} from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';
import Grid from '@material-ui/core/Grid';
import MediaQuery from 'react-responsive'

import { fetchNextRace } from "../../actions";
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
  }));
const NextRace = (props)=>{
    const classes = useStyles();
    props.fetchNextRace();
    const [nextRace,setnextRace]=useState([]);
    const [nextRaceGrey,setnextRaceGrey]=useState([]);
    const [nextRaceHarness,setnextRaceHarness]=useState([]);

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
                }
        })}
    };
    useEffect(()=> {
        fetchResources(props.next);
    },[props.next]);
    const duration=(raceStartTime)=>{ 
        var left=<Moment date={raceStartTime} durationFromNow/>
        return(
            left
        )
    };
    
    const renderTodayTableList=(state) =>{
        return (        
           (state.map(item => {
                return(
                    <>
                        <MediaQuery query='(max-width: 1400px)'>
                            <Grid item xs ={4} className="next-section" >
                                <Link className={classes.paper}  className="next-item"
                                    to={{pathname:"/RaceDetail", slot:item.raceNumber, place: item.meetingName}}>                        
                                    <p>R{item.raceNumber}</p>
                                    {duration(item.raceStartTime)}
                                    <p>{item.meetingName} ({item.meetingCode})</p>
                                </Link> 
                            </Grid>
                        </MediaQuery>  
                    </>                
            )}
        ))
        );
    };
    return(
        <div>
            <div className="next-data">
                <h1>Racing</h1>
                <Grid container spacing={3}>
                    {renderTodayTableList(nextRace)}
                </Grid>
                <h1>GreyHound</h1>
                <Grid container spacing={3}>
                    {renderTodayTableList(nextRaceGrey)}
                </Grid>
                <h1>Harness</h1>
                <Grid container spacing={3}>
                    {renderTodayTableList(nextRaceHarness)}
                </Grid>
            </div>
        </div>
        );
}; 

const mapStateToProps=(state)=> {
    return{ next:state.next}
}
export default connect(mapStateToProps, { fetchNextRace } )(NextRace);