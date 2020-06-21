import React,{ useState,useEffect,useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import MediaQuery from 'react-responsive'



import BetSlipStore from "../../context/BetSlipContext";


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
    // var contextType=BetSlipStore;
    // const betSlipWin=contextType._currentValue.betSlipFormatWin;
    // const betSlipPlace=contextType._currentValue.betSlipFormatPlace;
    // const betSlipPlace={
    //     "bet_fh": "tk_integ_",
    //     "bet_pool_fh": "",
    //     "stake_cents": 0,
    //     "combinations":[
    //     {
    //     "place":1,
    //     "runners":[]
    //     }
    //     ]
    //   };
    // const betSlipWin={
    //     "bet_fh": "tk_integ_",
    //     "bet_pool_fh": "",
    //     "stake_cents": 0,
    //     "combinations":[
    //     {
    //     "place":1,
    //     "runners":[]
    //     }
    //     ]
    //   };
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
    
    // const betSlipFormat=(item)=>{
    //     if (item.raceType=='R') {
    //         var type='racing'
    //     }
    //     if (item.raceType=='G') {
    //         var type='greyhound'
    //     }
    //     if (item.raceType=='H') {
    //         var type='harness'
    //     }
    //     betSlipWin.bet_pool_fh=item.raceStartTime.slice(0,6)+'_'+
    //     "racing_"+type+'_'+item.meetingName+'_'+item.location+'_'+item.raceNumber+'_'+'w';
    //     betSlipPlace.bet_pool_fh=item.raceStartTime.slice(0,6)+'_'+
    //     "racing_"+type+'_'+item.meetingName+'_'+item.location+'_'+item.raceNumber+'_'+'p'
    // };
    
    const renderTodayTableList=(state) =>{
        return (        
           (state.map(item => {
                // {betSlipFormat(item)}
                return(
                    <>
                        <MediaQuery query='(min-width: 100px)'>
                            <Grid item xs ={4} className="next-section">
                                <Link className={classes.paper}  className={
                                    (item.raceStartTime==firstTime&&item.raceNumber==firstNumber)?
                            "next-item-first":"next-item"}
                                    to={{
                                        pathname:"/RaceDetail", 
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
            </div>
        </div>
        );
}; 

export default NextRace