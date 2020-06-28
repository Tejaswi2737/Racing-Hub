import React,{ useState,useEffect,useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import MediaQuery from 'react-responsive'


import { allBetSlipData } from "../../actions";

// import BetSlipStore from "../../context/BetSlipContext";


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
    const [nextRace,setnextRace]=useState([]);
    const [nextRaceGrey,setnextRaceGrey]=useState([]);
    const [nextRaceHarness,setnextRaceHarness]=useState([]);
    const [Race,setRace]=useState(true);
    const [Grey,setGrey]=useState(true);
    const [Harness,setHarness]=useState(true);

    const [firstTime, setfirstTime] = useState();
    const [firstNumber, setfirstNumber] = useState();
    const [fetched, setfetched] = useState(false)
    useEffect(() => {
        if (props.next.length>0){
            {props.next[0].raceStartTime?setfirstTime(props.next[0].raceStartTime):setfirstTime()}
            {props.next[0].raceNumber?setfirstNumber(props.next[0].raceNumber):setfirstNumber()}
            setfetched(true)
        }
    }, [props.next]);

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
    
    const renderTodayTableList=(state,title) =>{
        return (        
           (state.map(item => {
                return(
                    <>
                        <MediaQuery query='(min-width: 800px)'>
                            <Grid item xs ={4} className="next-section">
                                
                                
                                <Link className={classes.paper}  className={
                                    (item.raceStartTime==props.firstTime
                                        &&item.raceNumber==props.firstNumber)?
                            "next-item-first":"next-item"}
                                    to={{
                                        pathname:"/RaceDetail/Win", 
                                        slot:item.raceNumber, 
                                        place: item.meetingName,
                                        bet_pool_fh_1:item.raceStartTime.slice(0,6)+'_'+
                                        "racing_"+item.raceType+'_'+item.meetingName+'_'+item.location+'_'+item.raceNumber+'_'+'w',
                                        bet_pool_fh_2:item.raceStartTime.slice(0,6)+'_'+
                                        "racing_"+item.raceType+'_'+item.meetingName+'_'+item.location+'_'+item.raceNumber+'_'+'p'
                                    }}>                        
                                    <p>R{item.raceNumber}</p>
                                    <time>{duration(item.raceStartTime)}</time>    
                                    <p>{item.meetingName} ({item.meetingCode})</p>
                                </Link> 
                            </Grid>
                        </MediaQuery>  
                        <MediaQuery query='(max-width: 800px)'>
                            <Grid item xs ={6} className="next-section">
                                <Link className={classes.paper}  className={
                                    (item.raceStartTime==firstTime
                                        &&item.raceNumber==firstNumber)?
                            "next-item-first":"next-item"}
                                    to={{
                                        pathname:"/RaceDetail/Win", 
                                        slot:item.raceNumber, 
                                        place: item.meetingName,
                                        bet_pool_fh_1:item.raceStartTime.slice(0,6)+'_'+
                                        "racing_"+item.raceType+'_'+item.meetingName+'_'+item.location+'_'+item.raceNumber+'_'+'w',
                                        bet_pool_fh_2:item.raceStartTime.slice(0,6)+'_'+
                                        "racing_"+item.raceType+'_'+item.meetingName+'_'+item.location+'_'+item.raceNumber+'_'+'p'
                                    }}>                        
                                    <p>R{item.raceNumber}</p>
                                    <time>{duration(item.raceStartTime)}</time>    
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
                <h1 onClick={()=>setRace(!Race)}>Racing</h1>
                <Grid container spacing={3}>
                    {Race?renderTodayTableList(nextRace.slice(0,6)):""}
                </Grid>
                <h1 onClick={()=>setGrey(!Grey)}>GreyHound</h1>
                <Grid container spacing={3}>
                    {Grey?renderTodayTableList(nextRaceGrey.slice(0,6)):""}
                </Grid>
                <h1 onClick={()=>setHarness(!Harness)}>Harness</h1>
                <Grid container spacing={3}>
                    {Harness?renderTodayTableList(nextRaceHarness.slice(0,6)):""}
                </Grid>
            </div>
        </div>
        );
}; 


export default NextRace