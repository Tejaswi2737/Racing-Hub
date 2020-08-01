import React,{useEffect,useState,useRef} from 'react';
import { connect } from 'react-redux';
import { Link} from "react-router-dom";
import MediaQuery from 'react-responsive';
import _, { isInteger, indexOf } from "lodash"
import { fetchMeetingDetails,
    fetchRaceDetails,
    addBetSlipData,
    allBetSlipData,
    countBetSlipData,
    remainingBetSlipData,
    betSlipScreen,
    fetchTodayRacing,
    fetchPathParams,
    deleteSingleBet,
    deleteAllBets,
    
    allBetSlipDataQuinella,
    remainingBetSlipDataQuinella,
    betSlipScreenQuinella,
    postWinPlaceBetsQuinella,
    deleteSingleBetQuinella,
    deleteAllBetsQuinella,

    allBetSlipDataTrifecta,
    remainingBetSlipDataTrifecta,
    betSlipScreenTrifecta,
    postWinPlaceBetsTrifecta,
    deleteSingleBetTrifecta,
    deleteAllBetsTrifecta,

    allBetSlipDataFirst4,
    remainingBetSlipDataFirst4,
    betSlipScreenFirst4,
    postWinPlaceBetsFirst4,
    deleteSingleBetFirst4,
    deleteAllBetsFirst4,

    allBetSlipDataExacta,
    remainingBetSlipDataExacta,
    betSlipScreenExacta,
    postWinPlaceBetsExacta,
    deleteSingleBetExacta,
    deleteAllBetsExacta,

    allBetSlipDataDuet,
    remainingBetSlipDataDuet,
    betSlipScreenDuet,
    postWinPlaceBetsDuet,
    deleteSingleBetDuet,
    deleteAllBetsDuet
} from "../../actions";
import BetSlipHome from '../BetSlip/BetSlipHome';
import "./RaceDetails.css";

const RaceDetails = (props,ownProps)=>{
    const [place, setplace] = useState(initialValuePlace);
    const [place_slot, setplace_slot] = useState(initialValue);

    const [todayData, settodayData] = useState([]);
    const [raceData, setraceData] = useState([]);
    const [pool_fh, setpool_fh] = useState();
    const [count, setcount] = useState()
    const [place_list_all, setplace_list_all] = useState(["NORTHFIELD PARK (USA) Race6",'ergevdfgdbb','rgergegegeetheeh'])
    const [addedBet, setaddedBet] = useState(false)
    const [runnerSelection, setrunnerSelection] = useState([]);

    const [pathValues, setpathValues] = useState([])
    const [showLoading, setShowLoading] = useState(false);
    const [diffTime, setdiffTime] = useState(Date.now()-new Date("2020-07-03T05:09:00.000Z"))
    const timerToClearSomewhere = useRef(false) 


    const [poolFinalList, setpoolFinalList] = useState([]);

    const [runner_win_place, setrunner_win_place] = useState({});
    const [runner_quinella, setrunner_quinella] = useState({});
    const [runner_trifetca, setrunner_trifetca] = useState({});
    const [runner_first4, setrunner_first4] = useState({});
    const [runner_exacta, setrunner_exacta] = useState({});
    const [runner_duet, setrunner_duet] = useState({});


    
    const [RemainingBets, setRemainingBets] = useState([]);
    const [RemainingBetsQuienlla, setRemainingBetsQuienlla] = useState([]);
    const [RemainingBetsTrifecta, setRemainingBetsTrifecta] = useState([]);
    const [RemainingBetsFirst4, setRemainingBetsFirst4] = useState([]);
    const [RemainingBetsExacta, setRemainingBetsExacta] = useState([]);
    const [RemainingBetsDuet, setRemainingBetsDuet] = useState([]);
    
    const [finalRemainingBets, setfinalRemainingBets] = useState([]);
    const [finalRemainingBetsQuienlla, setfinalRemainingBetsQuienlla] = useState([]);
    const [finalRemainingBetsTrifecta, setfinalRemainingBetsTrifecta] = useState([]);
    const [finalRemainingBetsFirst4, setfinalRemainingBetsFirst4] = useState([]);
    const [finalRemainingBetsExacta, setfinalRemainingBetsExacta] = useState([]);
    const [finalRemainingBetsDuet, setfinalRemainingBetsDuet] = useState([]);

    
    const [betsUpdated, setbetsUpdated] = useState([]);
    const [checkUpdate, setcheckUpdate] = useState(false)

// fetching the meeting details and assigning them to races_list
//fetchMeetingDetails--- meeting details
    useEffect(() => {
        props.fetchMeetingDetails();
    }, [])
    var races_list=[props.meetingDetails.races];
    races_list=Object.values(races_list);
    // var items_list={}
    // {races_list?races_list.map(item=>{
    //      items_list=item;
    // }): items_list=[]};
    

// store the pathparam, i.e., the slot and place name of the request and fetch the requested race detail
//place_slot --- has the slot
// fetchRaceDetails -- action to fetch the race details player/ runner info
    var initialValue=parseInt(pathValues.slot)?parseInt(pathValues.slot):1
    var initialValuePlace=parseInt(pathValues.place)?parseInt(pathValues.place):""
    useEffect(() => {
        setplace_slot(initialValue)
    }, [initialValue,initialValuePlace])
    useEffect(() => {
        props.fetchRaceDetails(place_slot);
    }, [place_slot,place])


    // store the pathparams and fetch them when reloaded for first time to localstorage to allow reload

    useEffect(() => {
        if(props.pathParams.code) {
            setpathValues(props.pathParams)
            localStorage.setItem('pathParams',JSON.stringify(props.pathParams))
        }
    }, [props.pathParams]);

    useEffect(() => {
        const data =window.localStorage.getItem('pathParams')
        if (data) {
            setpathValues(JSON.parse(data))
            setplace_slot(JSON.parse(data).slot)
            setplace(JSON.parse(data).place)
            props.fetchRaceDetails(JSON.parse(data).slot);
        }
    }, [])


// see if required or not
    useEffect(() => {
        props.remainingBetSlipData(props.remainingBetSlip)
    }, [props.meetingDetails]);



// component to keep todays date irrespective of the actual data for mocking purpose intially
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



// the details of the race, amount etc for the corresponding pathparams, ie., venue and slot
// stored in todayData and raceData
    useEffect(() => {
        props.fetchTodayRacing();
    }, [])
    useEffect(() => {
        if(props.todayRacing) {
            var newArray=props.todayRacing.filter(function (el) {
                return (
                    el.meetingName ===pathValues.place &&
                    el.raceType===pathValues.raceType &&
                    el.venueMnemonic=== pathValues.code 
                )
              });
            settodayData(newArray)
        }
    }, [props]);

    useEffect(() => {
        if(todayData) {
            if(todayData[0]) {
                var dataass=todayData[0].races
                var newArray=dataass.filter(function (el) {
                    return (
                        el.raceNumber ===pathValues.slot 
                    )
                  });
                setraceData(newArray)            
            }
        }
    }, [todayData])


// Component for setting timeout for every second
// duration for timeleft and start time for the australian standard time format for the required data 
    useEffect(
       () => {
         timerToClearSomewhere.current = setInterval(() => setShowLoading(true), 800)
         return () => {
           clearInterval(timerToClearSomewhere.current)
         }
       },
       [showLoading]
     )
     setTimeout(()=>{
        setShowLoading(false)
        return () => {
            clearInterval(timerToClearSomewhere.current)
          }
     },1000)


     const duration=(raceStartTime)=>{ 
        var left=(Date.now()-new Date(raceStartTime))-diffTime
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
                if (minutes===0){
                    return(-hours+'h')
                }
                else return(-hours+'h'+minutes+'m')
            }
            else {
                if (minutes===0){
                    return(hours+'h')
                }
            } return (hours+'h'+minutes+'m')
        }
        if (hours===0 && minutes>=5){
            if (left>0){
                return (-minutes+'m')
            }
            else return(minutes+'m')
        } 
        if (hours===0 && (minutes<=5||minutes>=-5) 
            && (minutes>0||minutes<0)) {
                if (left>0) {
                    if (seconds===0){
                        return(-minutes+'m')
                    } else return (-minutes+'m'+seconds+'s')
                }
               else {
                if (seconds===0){
                    return(minutes+'m')
                } else return (minutes+'m'+seconds+'s')
                }
        }  
        if (hours===0 && minutes===0) {
            if (left>0) {
                return(-seconds+'s')
            }
            else return((seconds+'s'))
        } 
    };

    const startTime=(st)=>{
        var current=new Date(st);
        var left=(Date.now()-new Date(st))-diffTime
        left=Date.now()-left+10*60*60*1000
        var delta=Math.abs(left/1000)
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        var seconds = Math.floor(delta % 60);
        if (minutes<9) {
         return (hours+":0"+minutes)
        }
        else return (hours+":"+minutes)
    };


// Results table for the already completed and results declared races
    const resultsTable=(props)=>{
        return(
            <table className="race-table-results">
                {props.racingDetail.results.length>0?
                <thead>
                    <tr>
                        <th >
                            Results
                        </th>
                        <th >
                            Number
                        </th>
                        <th >
                            Runner Details
                        </th>
                        <th>
                            Tote
                        </th>
                    </tr>
                </thead>:""}
                <tbody className="">
                    {props.racingDetail.results.map(item=>{  
                        return(
                            <tr>
                                <td className="result-position">
                                    {item.place}
                                </td>
                                <td className="result-number">
                                    {item.runnerNumber} 
                                </td>
                            <td className="runner-details">
                                {item.runnerName}
                                <dl className="runner-metadata-list">
                                    <dt>
                                        D
                                    </dt>
                                    <dd className="full-name">
                                        {item.riderDriverName+" "}
                                    </dd>
                                    <dt>
                                        T
                                    </dt>
                                    <dd className="full-name">
                                        {item.trainerName}
                                    </dd>
                                </dl>
                            </td>
                            <td >
                                <div>
                                    <div>
                                        {item.toteWin}
                                    </div>
                                    <div >
                                        {item.totePlace}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>     
        )
    };


// exotic results for the results declared races
    const exoticTable=(props)=>{
        return(
            <table className="race-table">
                {props.racingDetail.exoticResults.length>0?
            <thead >
                <tr>
                    <th>
                        Exotic Results
                    </th>
                    <th >
                        Results
                    </th>
                    <th >
                        Dividend
                    </th>
                </tr>
            </thead>:""}
            <tbody>
                {props.racingDetail.exoticResults.map(exotic_item=>
                    {
                        return(
                            <tr >
                            <td>
                                {exotic_item.wageringProduct}
                            </td>
                            <td >
                                <div >
                                    <div>
                                        <span>
                                            {exotic_item.Results}        
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td >
                                <div >
                                    <div >
                                        <span>
                                            {exotic_item.Dividend}        
                                        </span>
                                    </div>
                                </div>
                            </td>
                        </tr>                                              
                        )
                    })}
            </tbody>
        </table>
        )
    };


// runner infor table , this is for all the races
    const runnerInfoheader=(props)=>{
        return(
            <div className="runner-info-row">
                <div className="number-cell">
                    No
                </div>
                <div className={props.type==="Win"?"name-cell":"name-cell-short"}>
                    Runner
                </div>
                <div className="price-cell">
                    Win
                </div>
                <div className="price-cell">
                    Place
                </div>
                {(props.type==="Quinella"||props.type==="Duet")?
                        <div className="price-cell">
                            1st Box
                        </div>
                    :(props.type==="Trifecta")?
                    <>
                        <div className="price-cell">
                            1st Box
                        </div>
                        <div className="price-cell">
                            2nd
                        </div>
                        <div className="price-cell">
                            3rd
                        </div>
                    </>
                    :(props.type==="First4")?
                    <>
                        <div className="price-cell">
                            1st Box
                        </div>
                        <div className="price-cell">
                            2nd
                        </div>
                        <div className="price-cell">
                            3rd
                        </div>
                        <div className="price-cell">
                            4th
                        </div>
                    </>:(props.type==="Exacta")?
                    <>
                        <div className="price-cell">
                            1st Box
                        </div>
                        <div className="price-cell">
                            2nd
                        </div>         
                    </> :""             
                }

            </div>
        )
    };

// fetching the info for non-desktop versions, from the local storage.,
// the information of pending bets in the win place
    useEffect(() => {
        if (performance.navigation.type === 1 && window.innerWidth<980) {
            props.remainingBetSlipData(JSON.parse(window.localStorage.getItem('betSlip')))
        }
    }, [performance.navigation.type]);

    useEffect(() => {
        if(RemainingBets && window.innerWidth ) {
            props.remainingBetSlipData(finalRemainingBets);
            localStorage.setItem('betSlip',JSON.stringify(finalRemainingBets));
        }
    }, [finalRemainingBets]);


    useEffect(() => {
        if (performance.navigation.type === 1 && window.innerWidth<980) {
            props.remainingBetSlipDataQuinella(JSON.parse(window.localStorage.getItem('betSlipQuinella')))
        }
    }, [performance.navigation.type]);

    useEffect(() => {
        if(RemainingBetsQuienlla && window.innerWidth ) {
            props.remainingBetSlipDataQuinella(finalRemainingBetsQuienlla);
            localStorage.setItem('betSlipQuinella',JSON.stringify(finalRemainingBetsQuienlla));
        }
    }, [finalRemainingBetsQuienlla]);

//added recently
    useEffect(() => {
        if (performance.navigation.type === 1 && window.innerWidth<980) {
            props.remainingBetSlipDataDuet(JSON.parse(window.localStorage.getItem('betSlipDuet')))
        }
    }, [performance.navigation.type]);

    useEffect(() => {
        if(RemainingBetsDuet && window.innerWidth ) {
            props.remainingBetSlipDataDuet(finalRemainingBetsDuet);
            localStorage.setItem('betSlipDuet',JSON.stringify(finalRemainingBetsDuet));
        }
    }, [finalRemainingBetsDuet]);


    useEffect(() => {
        if (performance.navigation.type === 1 && window.innerWidth<980) {
            props.remainingBetSlipDataFirst4(JSON.parse(window.localStorage.getItem('betSlipFirst4')))
        }
    }, [performance.navigation.type]);

    useEffect(() => {
        if(RemainingBetsFirst4 && window.innerWidth ) {
            // console.log(finalRemainingBetsFirst4)
            props.remainingBetSlipDataFirst4(finalRemainingBetsFirst4);
            localStorage.setItem('betSlipFirst4',JSON.stringify(finalRemainingBetsFirst4));
        }
    }, [finalRemainingBetsFirst4]);


    
    useEffect(() => {
        if (performance.navigation.type === 1 && window.innerWidth<980) {
            props.remainingBetSlipDataTrifecta(JSON.parse(window.localStorage.getItem('betSlipTrifecta')))
        }
    }, [performance.navigation.type]);

    useEffect(() => {
        if(RemainingBetsTrifecta && window.innerWidth ) {
            // console.log(finalRemainingBetsFirst4)
            props.remainingBetSlipDataTrifecta(finalRemainingBetsTrifecta);
            localStorage.setItem('betSlipTrifecta',JSON.stringify(finalRemainingBetsTrifecta));
        }
    }, [finalRemainingBetsTrifecta]);


    useEffect(() => {
        if (performance.navigation.type === 1 && window.innerWidth<980) {
            props.remainingBetSlipDataExacta(JSON.parse(window.localStorage.getItem('betSlipExacta')))
        }
    }, [performance.navigation.type]);

    useEffect(() => {
        if(RemainingBetsExacta && window.innerWidth ) {
            props.remainingBetSlipDataExacta(finalRemainingBetsExacta);
            localStorage.setItem('betSlipExacta',JSON.stringify(finalRemainingBetsExacta));
        }
    }, [finalRemainingBetsExacta]);

// handle click for the win/place bets, 
// this will execute if the race is open for betting ie., normal now
// an object is assigned to runner_win_place and in which the bet details are stored
    const handleClickWin=(runner_item)=>{
        if ((raceData[0].raceStatus==="Normal")) {
                setrunner_win_place({
                    "name":todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber || ""
                    ,"runners":runner_item.runnerNumber,"win": null ,"place": null
                });  
                setrunner_quinella({})
                setrunner_duet({})
                setrunner_first4({})
                setrunner_trifetca({})
                setrunner_exacta({})
        }
    };

// send the runner_win_place info to an action creator, 
    useEffect(() => {
        if ((runner_win_place)) {
            if(runner_win_place.name) {
                {props.allBetSlipData(runner_win_place)}
                props.betSlipScreen(true);
            }
        }
    }, [runner_win_place]);

    const handleClickQuinella=(runner_item)=>{
        if ((raceData[0].raceStatus==="Normal")) {
            setrunner_quinella({
                "name":todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber || ""
                ,"runners":runner_item.runnerNumber,"quinella": null
            }); 
            setrunner_win_place({})
            setrunner_duet({})
            setrunner_first4({})
            setrunner_trifetca({})
            setrunner_exacta({})

        }
    };
    useEffect(() => {
        if ((runner_quinella)) {
            if(runner_quinella.name) {
                {props.allBetSlipDataQuinella(runner_quinella)}
                props.betSlipScreenQuinella(true);
            }
        }
    }, [runner_quinella]);


    const handleClickDuet=(runner_item)=>{
        if ((raceData[0].raceStatus==="Normal")) {
            setrunner_duet({
                "name":todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber || ""
                ,"runners":runner_item.runnerNumber,"duet": null
            }); 
            setrunner_win_place({})
            setrunner_quinella({})
            setrunner_first4({})
            setrunner_trifetca({})
            setrunner_exacta({})

        }
    };
    useEffect(() => {
        if ((runner_duet)) {
            if(runner_duet.name) {
                {props.allBetSlipDataDuet(runner_duet)}
                props.betSlipScreenDuet(true);
            }
        }
    }, [runner_duet]);


    const handleClickFirst4=(runner_item,selection)=>{
        if ((raceData[0].raceStatus==="Normal")) {
            if(selection==1) {
                setrunner_first4({
                    "name":todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber || ""
                    ,"selection1":runner_item.runnerNumber,"first4": null
                }); 
            }
            if(selection==2) {
                setrunner_first4({
                    "name":todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber || ""
                    ,"selection2":runner_item.runnerNumber,"first4": null
                }); 
            }
            if(selection==3) {
                setrunner_first4({
                    "name":todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber || ""
                    ,"selection3":runner_item.runnerNumber,"first4": null
                }); 
            }
            if(selection==4) {
                setrunner_first4({
                    "name":todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber || ""
                    ,"selection4":runner_item.runnerNumber,"first4": null
                }); 
            }
            setrunner_duet({})
            setrunner_win_place({})
            setrunner_quinella({})
            setrunner_trifetca({})
            setrunner_exacta({})

        }
    };



    useEffect(() => {
        if ((runner_first4)) {
            if(runner_first4.name) {
                {props.allBetSlipDataFirst4(runner_first4)}
                props.betSlipScreenFirst4(true);
            }
        }
    }, [runner_first4]);


    //Trifecta
    const handleClickTrifecta=(runner_item,selection)=>{
        if ((raceData[0].raceStatus==="Normal")) {
            if(selection==1) {
                setrunner_trifetca({
                    "name":todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber || ""
                    ,"selection1":runner_item.runnerNumber,"trifecta": null
                }); 
            }
            if(selection==2) {
                setrunner_trifetca({
                    "name":todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber || ""
                    ,"selection2":runner_item.runnerNumber,"trifecta": null
                }); 
            }
            if(selection==3) {
                setrunner_trifetca({
                    "name":todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber || ""
                    ,"selection3":runner_item.runnerNumber,"trifecta": null
                }); 
            }
            setrunner_duet({})
            setrunner_win_place({})
            setrunner_quinella({})
            setrunner_exacta({})
            setrunner_first4({})
        }
    };
    
    useEffect(() => {
        if ((runner_trifetca)) {
            if(runner_trifetca.name) {
                {props.allBetSlipDataTrifecta(runner_trifetca)}
                props.betSlipScreenTrifecta(true);
            }
        }
    }, [runner_trifetca]);


    //Exacta
    const handleClickExacta=(runner_item,selection)=>{
        if ((raceData[0].raceStatus==="Normal")) {
            if(selection==1) {
                setrunner_exacta({
                    "name":todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber || ""
                    ,"selection1":runner_item.runnerNumber,"exacta": null
                }); 
            }
            if(selection==2) {
                setrunner_exacta({
                    "name":todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber || ""
                    ,"selection2":runner_item.runnerNumber,"exacta": null
                }); 
            }
            setrunner_duet({})
            setrunner_win_place({})
            setrunner_quinella({})
            setrunner_trifetca({})
            setrunner_first4({})
        }
    };


    
    useEffect(() => {
        if ((runner_exacta)) {
            if(runner_exacta.name) {
                {props.allBetSlipDataExacta(runner_exacta)}
                props.betSlipScreenExacta(true);
            }
        }
    }, [runner_exacta]);



// handling the remaining bets for the non-desktop version
    useEffect(() => {
        if(window.innerWidth<980) {
            if( performance.navigation.type >=1 ) {
                var users=props.allBetSlip;
                var rem=props.remainingBetSlip.length<1?JSON.parse(window.localStorage.getItem('betSlip')):props.remainingBetSlip
                if(props.screenStatus) {
                    users = [users, ...rem];
                } else {
                    if(rem){
                        users=[...rem]
                    }
                }               
            }
            if(performance.navigation.type == 0 ) {
                var users=props.allBetSlip;
                var rem=props.remainingBetSlip.length<1?JSON.parse(window.localStorage.getItem('betSlip')):props.remainingBetSlip
                if(props.screenStatus) {
                    if(rem) {
                        users = [users, ...rem];
                    }
                } else {
                    if(rem){
                        users=[...rem]
                    }
                }
            }
            // var users_win=users.filter(e1=> { return e1.win===null });
            var grouped = _.reduce(users, (result, user) => {
                if(user){
                        (result[user.name] || (result[user.name] = [])).push(user);  
                        return result;
                }    
            }, {});
            var poolList=[]
            if(grouped) {
                if(Object.keys(grouped)){
                    Object.keys(grouped).map(poolname=>{
                        if(poolname!="undefined") {
                            var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                                if(user){
                                        (result[user.name] || (result[user.name] = [])).push(user.runners);  
                                        
                                        return (Object.values(result).reduce(
                                            function(accumulator, currentValue) {
                                              return accumulator.concat(currentValue)
                                            },
                                            []
                                          ));        
                                }    
                            }, {});
                            var groupedRunnersNo=groupedRunners.reduce(function (allNames, name) { 
                                if (name in allNames) {
                                  allNames[name]++
                                }
                                else {
                                  allNames[name] = 1
                                }
                                return(allNames)
                              }, {})
                            var itemList=[];
                            var winList=null;
                            var placeList=null;
                            for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                                if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                    if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                        var pos=(_.findIndex(users, {runners: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                        itemList.push(users[pos].runners)
                                        winList=grouped[poolname][grouped[poolname].length-1].win
                                        placeList=grouped[poolname][grouped[poolname].length-1].place
                                    } 
                                }
                                }
                            if (itemList.length){
                                var itemPool={"name":poolname,"runners":itemList, "win": winList ,"place": placeList}
                            }
                            if(poolFinalList){
                                poolList.push(itemPool)
                            } else {
                                poolList=itemPool
                            }
                        }     
                    })
                    setRemainingBets(poolList)
                }
            };
        }
    }, [props.allBetSlip]);



    useEffect(() => {
        if(window.innerWidth<980) {
            if( performance.navigation.type >=1 ) {
                var users=props.allBetSlipQuinella;
                var rem=props.remainingBetSlipQuinella.length<1?
                JSON.parse(window.localStorage.getItem('betSlipQuinella')):
                props.remainingBetSlipQuinella
                if(props.screenStatusQuinella) {
                    users = [users, ...rem];
                } else {users=[...rem]}
            }
            if(performance.navigation.type == 0 ) {
                var users=props.allBetSlipQuinella;
                var rem=props.remainingBetSlipQuinella.length<1?
                JSON.parse(window.localStorage.getItem('betSlipQuinella')):
                props.remainingBetSlipQuinella
                if(props.screenStatusQuinella) {
                    users = [users, ...rem];
                } else {users=[...rem]}
            }
            // var users_win=users.filter(e1=> { return e1.win===null });
            var grouped = _.reduce(users, (result, user) => {
                if(user){
                        (result[user.name] || (result[user.name] = [])).push(user);  
                        return result;
                }    
            }, {});
            var poolList=[]
            if(grouped) {
                if(Object.keys(grouped)){
                    Object.keys(grouped).map(poolname=>{
                        if(poolname!="undefined") {
                            var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                                if(user){
                                        (result[user.name] || (result[user.name] = [])).push(user.runners);  
                                        
                                        return (Object.values(result).reduce(
                                            function(accumulator, currentValue) {
                                              return accumulator.concat(currentValue)
                                            },
                                            []
                                          ));        
                                }    
                            }, {});
                            var groupedRunnersNo=groupedRunners.reduce(function (allNames, name) { 
                                if (name in allNames) {
                                  allNames[name]++
                                }
                                else {
                                  allNames[name] = 1
                                }
                                return(allNames)
                              }, {})
                            var itemList=[];
                            var quinellaList=null;
                            for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                                if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                    if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                        var pos=(_.findIndex(users, {runners: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                        itemList.push(users[pos].runners)
                                        quinellaList=grouped[poolname][grouped[poolname].length-1].quienlla
                                    } 
                                }
                                }
                            if (itemList.length){
                                var itemPool={"name":poolname,"runners":itemList,"quienlla": quinellaList}
                            }
                            if(poolFinalList){
                                poolList.push(itemPool)
                            } else {
                                poolList=itemPool
                            }
                        }     
                    })
                    setRemainingBetsQuienlla(poolList)
                }
            };
        }
    }, [props.allBetSlipQuinella]);


    useEffect(() => {
        if(window.innerWidth<980) {
            if( performance.navigation.type >=1 ) {
                var users=props.allBetSlipDuet;
                var rem=props.remainingBetSlipDuet.length<1?
                JSON.parse(window.localStorage.getItem('betSlipDuet')):
                props.remainingBetSlipDuet
                if(props.screenStatusDuet) {
                    users = [users, ...rem];
                } else {users=[...rem]}
            }
            if(performance.navigation.type == 0 ) {
                var users=props.allBetSlipDuet;
                var rem=props.remainingBetSlipDuet.length<1?
                JSON.parse(window.localStorage.getItem('betSlipDuet')):
                props.remainingBetSlipDuet
                if(props.screenStatusDuet) {
                    users = [users, ...rem];
                } else {users=[...rem]}
            }
            // var users_win=users.filter(e1=> { return e1.win===null });
            var grouped = _.reduce(users, (result, user) => {
                if(user){
                        (result[user.name] || (result[user.name] = [])).push(user);  
                        return result;
                }    
            }, {});
            var poolList=[]
            if(grouped) {
                if(Object.keys(grouped)){
                    Object.keys(grouped).map(poolname=>{
                        if(poolname!="undefined") {
                            var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                                if(user){
                                        (result[user.name] || (result[user.name] = [])).push(user.runners);  
                                        
                                        return (Object.values(result).reduce(
                                            function(accumulator, currentValue) {
                                              return accumulator.concat(currentValue)
                                            },
                                            []
                                          ));        
                                }    
                            }, {});
                            var groupedRunnersNo=groupedRunners.reduce(function (allNames, name) { 
                                if (name in allNames) {
                                  allNames[name]++
                                }
                                else {
                                  allNames[name] = 1
                                }
                                return(allNames)
                              }, {})
                            var itemList=[];
                            var duetList=null;
                            for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                                if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                    if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                        var pos=(_.findIndex(users, {runners: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                        itemList.push(users[pos].runners)
                                        duetList=grouped[poolname][grouped[poolname].length-1].duet
                                    } 
                                }
                                }
                            if (itemList.length){
                                var itemPool={"name":poolname,"runners":itemList,"duet": duetList}
                            }
                            if(poolFinalList){
                                poolList.push(itemPool)
                            } else {
                                poolList=itemPool
                            }
                        }     
                    })
                    setRemainingBetsDuet(poolList)
                }
            };
        }
    }, [props.allBetSlipDuet]);


//First4
    useEffect(() => {
        if(window.innerWidth<980) {
            if( performance.navigation.type >=1 ) {
                var users=props.allBetSlipFirst4;
                var rem=props.remainingBetSlipFirst4.length<1?
                JSON.parse(window.localStorage.getItem('betSlipFirst4')):
                props.remainingBetSlipFirst4
                if(props.screenStatusFirst4) {
                    users = [users, ...rem];
                } else {users=[...rem]}
            }
            if(performance.navigation.type == 0 ) {
                var users=props.allBetSlipFirst4;
                var rem=props.remainingBetSlipFirst4.length<1?
                JSON.parse(window.localStorage.getItem('betSlipFirst4')):
                props.remainingBetSlipFirst4
                if(props.screenStatusFirst4) {
                    users = [users, ...rem];
                } else {users=[...rem]}
            }
            // var users_win=users.filter(e1=> { return e1.win===null });
            var grouped = _.reduce(users, (result, user) => {
                if(user){
                        (result[user.name] || (result[user.name] = [])).push(user);  
                        return result;
                }    
            }, {});
            var poolList=[]
            if(grouped) {
                if(Object.keys(grouped)){
                    Object.keys(grouped).map(poolname=>{
                        if(poolname!="undefined") {
                            var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                                if(user){
                                        (result[user.name] || (result[user.name] = [])).push(user.selection1);  
                                        
                                        return (Object.values(result).reduce(
                                            function(accumulator, currentValue) {
                                              return accumulator.concat(currentValue)
                                            },
                                            []
                                          ));        
                                }    
                            }, {});
                            var groupedRunnersNo=groupedRunners.reduce(function (allNames, name) { 
                                if (name in allNames) {
                                  allNames[name]++
                                }
                                else {
                                  allNames[name] = 1
                                }
                                return(allNames)
                              }, {})
                            var itemList1=[];
                            var first4List=null;
                            for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                                if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                    if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                        var pos=(_.findIndex(users, {selection1: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                        itemList1.push(users[pos].selection1)
                                        first4List=grouped[poolname][grouped[poolname].length-1].first4
                                    } 
                                }
                            }

                            var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                                if(user){
                                        (result[user.name] || (result[user.name] = [])).push(user.selection2);  
                                        
                                        return (Object.values(result).reduce(
                                            function(accumulator, currentValue) {
                                              return accumulator.concat(currentValue)
                                            },
                                            []
                                          ));        
                                }    
                            }, {});
                            var groupedRunnersNo=groupedRunners.reduce(function (allNames, name) { 
                                if (name in allNames) {
                                  allNames[name]++
                                }
                                else {
                                  allNames[name] = 1
                                }
                                return(allNames)
                              }, {})
                            var itemList2=[];
                            var first4List=null;
                            for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                                if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                    if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                        var pos=(_.findIndex(users, {selection2: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                        itemList2.push(users[pos].selection2)
                                        first4List=grouped[poolname][grouped[poolname].length-1].first4
                                    } 
                                }
                            }
                              


                            var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                                if(user){
                                        (result[user.name] || (result[user.name] = [])).push(user.selection3);  
                                        
                                        return (Object.values(result).reduce(
                                            function(accumulator, currentValue) {
                                              return accumulator.concat(currentValue)
                                            },
                                            []
                                          ));        
                                }    
                            }, {});
                            var groupedRunnersNo=groupedRunners.reduce(function (allNames, name) { 
                                if (name in allNames) {
                                  allNames[name]++
                                }
                                else {
                                  allNames[name] = 1
                                }
                                return(allNames)
                              }, {})
                            var itemList3=[];
                            var first4List=null;
                            for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                                if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                    if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                        var pos=(_.findIndex(users, {selection3: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                        itemList3.push(users[pos].selection3)
                                        first4List=grouped[poolname][grouped[poolname].length-1].first4
                                    } 
                                }
                            }     


                            var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                                if(user){
                                        (result[user.name] || (result[user.name] = [])).push(user.selection4);  
                                        
                                        return (Object.values(result).reduce(
                                            function(accumulator, currentValue) {
                                                return accumulator.concat(currentValue)
                                            },
                                            []
                                            ));        
                                }    
                            }, {});
                            var groupedRunnersNo=groupedRunners.reduce(function (allNames, name) { 
                                if (name in allNames) {
                                    allNames[name]++
                                }
                                else {
                                    allNames[name] = 1
                                }
                                return(allNames)
                                }, {})
                            var itemList4=[];
                            var first4List=null;
                            for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                                if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                    if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                        var pos=(_.findIndex(users, {selection4: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                        itemList4.push(users[pos].selection4)
                                        first4List=grouped[poolname][grouped[poolname].length-1].first4
                                    } 
                                }
                            }     
                            if (itemList1.length || itemList2.length ||itemList3.length ||itemList4.length){
                                var itemPool={"name":poolname,"selection1":itemList1,"selection2":itemList2,"selection3":itemList3,"selection4":itemList4,"first4": first4List}
                            }
                            if(poolFinalList){
                                poolList.push(itemPool)
                            } else {
                                poolList=itemPool
                            }
                        }     
                    })
                    setRemainingBetsFirst4(poolList)
                }
            };
        }
    }, [props.allBetSlipFirst4]);


  //Trifecta

  useEffect(() => {
    if(window.innerWidth<980) {
        if( performance.navigation.type >=1 ) {
            var users=props.allBetSlipTrifecta;
            var rem=props.remainingBetSlipTrifecta.length<1?
            JSON.parse(window.localStorage.getItem('betSlipTrifecta')):
            props.remainingBetSlipTrifecta
            if(props.screenStatusTrifecta) {
                users = [users, ...rem];
            } else {users=[...rem]}
        }
        if(performance.navigation.type == 0 ) {
            var users=props.allBetSlipTrifecta;
            var rem=props.remainingBetSlipTrifecta.length<1?
            JSON.parse(window.localStorage.getItem('betSlipTrifecta')):
            props.remainingBetSlipTrifecta
            if(props.screenStatusTrifecta) {
                users = [users, ...rem];
            } else {users=[...rem]}
        }
        // var users_win=users.filter(e1=> { return e1.win===null });
        var grouped = _.reduce(users, (result, user) => {
            if(user){
                    (result[user.name] || (result[user.name] = [])).push(user);  
                    return result;
            }    
        }, {});
        var poolList=[]
        if(grouped) {
            if(Object.keys(grouped)){
                Object.keys(grouped).map(poolname=>{
                    if(poolname!="undefined") {
                        var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                            if(user){
                                    (result[user.name] || (result[user.name] = [])).push(user.selection1);  
                                    
                                    return (Object.values(result).reduce(
                                        function(accumulator, currentValue) {
                                          return accumulator.concat(currentValue)
                                        },
                                        []
                                      ));        
                            }    
                        }, {});
                        var groupedRunnersNo=groupedRunners.reduce(function (allNames, name) { 
                            if (name in allNames) {
                              allNames[name]++
                            }
                            else {
                              allNames[name] = 1
                            }
                            return(allNames)
                          }, {})
                        var itemList1=[];
                        var trifectaList=null;
                        for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                            if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                    var pos=(_.findIndex(users, {selection1: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                    itemList1.push(users[pos].selection1)
                                    trifectaList=grouped[poolname][grouped[poolname].length-1].trifecta
                                } 
                            }
                        }

                        var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                            if(user){
                                    (result[user.name] || (result[user.name] = [])).push(user.selection2);  
                                    
                                    return (Object.values(result).reduce(
                                        function(accumulator, currentValue) {
                                          return accumulator.concat(currentValue)
                                        },
                                        []
                                      ));        
                            }    
                        }, {});
                        var groupedRunnersNo=groupedRunners.reduce(function (allNames, name) { 
                            if (name in allNames) {
                              allNames[name]++
                            }
                            else {
                              allNames[name] = 1
                            }
                            return(allNames)
                          }, {})
                        var itemList2=[];
                        var trifectaList=null;
                        for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                            if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                    var pos=(_.findIndex(users, {selection2: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                    itemList2.push(users[pos].selection2)
                                    trifectaList=grouped[poolname][grouped[poolname].length-1].trifecta
                                } 
                            }
                        }
                          


                        var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                            if(user){
                                    (result[user.name] || (result[user.name] = [])).push(user.selection3);  
                                    
                                    return (Object.values(result).reduce(
                                        function(accumulator, currentValue) {
                                          return accumulator.concat(currentValue)
                                        },
                                        []
                                      ));        
                            }    
                        }, {});
                        var groupedRunnersNo=groupedRunners.reduce(function (allNames, name) { 
                            if (name in allNames) {
                              allNames[name]++
                            }
                            else {
                              allNames[name] = 1
                            }
                            return(allNames)
                          }, {})
                        var itemList3=[];
                        var trifectaList=null;
                        for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                            if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                    var pos=(_.findIndex(users, {selection3: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                    itemList3.push(users[pos].selection3)
                                    trifectaList=grouped[poolname][grouped[poolname].length-1].trifecta
                                } 
                            }
                        }     


  
                        if (itemList1.length || itemList2.length ||itemList3.length ){
                            var itemPool={"name":poolname,"selection1":itemList1,"selection2":itemList2,"selection3":itemList3,"trifecta": trifectaList}
                        }
                        if(poolFinalList){
                            poolList.push(itemPool)
                        } else {
                            poolList=itemPool
                        }
                    }     
                })
                setRemainingBetsTrifecta(poolList)
            }
        };
    }
}, [props.allBetSlipTrifecta]);
    


 //Exacta
 
 useEffect(() => {
    if(window.innerWidth<980) {
        if( performance.navigation.type >=1 ) {
            var users=props.allBetSlipExacta;
            var rem=props.remainingBetSlipExacta.length<1?
            JSON.parse(window.localStorage.getItem('betSlipExacta')):
            props.remainingBetSlipExacta
            if(props.screenStatusExacta) {
                users = [users, ...rem];
            } else {users=[...rem]}
        }
        if(performance.navigation.type == 0 ) {
            var users=props.allBetSlipExacta;
            var rem=props.remainingBetSlipExacta.length<1?
            JSON.parse(window.localStorage.getItem('betSlipExacta')):
            props.remainingBetSlipExacta
            if(props.screenStatusExacta) {
                users = [users, ...rem];
            } else {users=[...rem]}
        }
        // var users_win=users.filter(e1=> { return e1.win===null });
        var grouped = _.reduce(users, (result, user) => {
            if(user){
                    (result[user.name] || (result[user.name] = [])).push(user);  
                    return result;
            }    
        }, {});
        var poolList=[]
        if(grouped) {
            if(Object.keys(grouped)){
                Object.keys(grouped).map(poolname=>{
                    if(poolname!="undefined") {
                        var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                            if(user){
                                    (result[user.name] || (result[user.name] = [])).push(user.selection1);  
                                    
                                    return (Object.values(result).reduce(
                                        function(accumulator, currentValue) {
                                          return accumulator.concat(currentValue)
                                        },
                                        []
                                      ));        
                            }    
                        }, {});
                        var groupedRunnersNo=groupedRunners.reduce(function (allNames, name) { 
                            if (name in allNames) {
                              allNames[name]++
                            }
                            else {
                              allNames[name] = 1
                            }
                            return(allNames)
                          }, {})
                        var itemList1=[];
                        var exactaList=null;
                        for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                            if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                    var pos=(_.findIndex(users, {selection1: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                    itemList1.push(users[pos].selection1)
                                    exactaList=grouped[poolname][grouped[poolname].length-1].exacta
                                } 
                            }
                        }

                        var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                            if(user){
                                    (result[user.name] || (result[user.name] = [])).push(user.selection2);  
                                    
                                    return (Object.values(result).reduce(
                                        function(accumulator, currentValue) {
                                          return accumulator.concat(currentValue)
                                        },
                                        []
                                      ));        
                            }    
                        }, {});
                        var groupedRunnersNo=groupedRunners.reduce(function (allNames, name) { 
                            if (name in allNames) {
                              allNames[name]++
                            }
                            else {
                              allNames[name] = 1
                            }
                            return(allNames)
                          }, {})
                        var itemList2=[];
                        var exactaList=null;
                        for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                            if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                    var pos=(_.findIndex(users, {selection2: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                    itemList2.push(users[pos].selection2)
                                    exactaList=grouped[poolname][grouped[poolname].length-1].exacta
                                } 
                            }
                        }

                        if (itemList1.length || itemList2.length ){
                            var itemPool={"name":poolname,"selection1":itemList1,"selection2":itemList2,"exacta": exactaList}
                        }
                        if(poolFinalList){
                            poolList.push(itemPool)
                        } else {
                            poolList=itemPool
                        }
                    }     
                })
                setRemainingBetsExacta(poolList)
            }
        };
    }
}, [props.allBetSlipExacta]);




    useEffect(() => {
        if (RemainingBets && window.innerWidth) {
            setfinalRemainingBets([])
            RemainingBets.map(items=>{
                if(items) {
                    if(items.runners.length>1) {
                        items.runners.map(runnnerInd=>{
                            setfinalRemainingBets(oldArray => [...oldArray, 
                                {"name":items.name,"runners":runnnerInd,
                                "win": items.win ,"place": items.place}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBets(oldArray => [...oldArray,
                            {"name":items.name,"runners":items.runners[0],
                            "win": items.win ,"place": items.place}])
                    }
                }
            })
        }
    }, [RemainingBets]);


    useEffect(() => {
        if (RemainingBetsQuienlla && window.innerWidth) {
            setfinalRemainingBetsQuienlla([])
            RemainingBetsQuienlla.map(items=>{
                if(items) {
                    if(items.runners.length>1) {
                        items.runners.map(runnnerInd=>{
                            setfinalRemainingBetsQuienlla(oldArray => [...oldArray, 
                                {"name":items.name,"runners":runnnerInd,
                                "quinella": items.quinella}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsQuienlla(oldArray => [...oldArray,
                            {"name":items.name,"runners":items.runners[0],
                            "quinella": items.quinella}])
                    }
                }
            })
        }
    }, [RemainingBetsQuienlla]);

    useEffect(() => {
        if (RemainingBetsDuet && window.innerWidth) {
            setfinalRemainingBetsDuet([])
            RemainingBetsDuet.map(items=>{
                if(items) {
                    if(items.runners.length>1) {
                        items.runners.map(runnnerInd=>{
                            setfinalRemainingBetsDuet(oldArray => [...oldArray, 
                                {"name":items.name,"runners":runnnerInd,
                                "duet": items.duet}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsDuet(oldArray => [...oldArray,
                            {"name":items.name,"runners":items.runners[0],
                            "duet": items.duet}])
                    }
                }
            })
        }
    }, [RemainingBetsDuet]);



    useEffect(() => {
        if (RemainingBetsFirst4 && window.innerWidth) {
            setfinalRemainingBetsFirst4([])
            
            RemainingBetsFirst4.map(items=>{
                if(items) {
                    if(items.selection1.length>1) {
                        items.selection1.map(runnnerInd=>{
                            setfinalRemainingBetsFirst4(oldArray => [...oldArray, 
                                {"name":items.name,"selection1":runnnerInd,
                                "first4": items.first4}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsFirst4(oldArray => [...oldArray,
                            {"name":items.name,"selection1":items.selection1[0],
                            "first4": items.first4}])
                    }
                }
                if(items) {
                    if(items.selection2.length>1) {
                        items.selection2.map(runnnerInd=>{
                            setfinalRemainingBetsFirst4(oldArray => [...oldArray, 
                                {"name":items.name,"selection2":runnnerInd,
                                "first4": items.first4}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsFirst4(oldArray => [...oldArray,
                            {"name":items.name,"selection2":items.selection2[0],
                            "first4": items.first4}])
                    }
                }
                if(items) {
                    if(items.selection3.length>1) {
                        items.selection3.map(runnnerInd=>{
                            setfinalRemainingBetsFirst4(oldArray => [...oldArray, 
                                {"name":items.name,"selection3":runnnerInd,
                                "first4": items.first4}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsFirst4(oldArray => [...oldArray,
                            {"name":items.name,"selection3":items.selection3[0],
                            "first4": items.first4}])
                    }
                }
                if(items) {
                    if(items.selection4.length>1) {
                        items.selection4.map(runnnerInd=>{
                            setfinalRemainingBetsFirst4(oldArray => [...oldArray, 
                                {"name":items.name,"selection4":runnnerInd,
                                "first4": items.first4}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsFirst4(oldArray => [...oldArray,
                            {"name":items.name,"selection4":items.selection4[0],
                            "first4": items.first4}])
                    }
                }
            })
        }
    }, [RemainingBetsFirst4]);


    useEffect(() => {
        if (RemainingBetsTrifecta && window.innerWidth) {
            setfinalRemainingBetsTrifecta([])
            
            RemainingBetsTrifecta.map(items=>{
                if(items) {
                    if(items.selection1.length>1) {
                        items.selection1.map(runnnerInd=>{
                            setfinalRemainingBetsTrifecta(oldArray => [...oldArray, 
                                {"name":items.name,"selection1":runnnerInd,
                                "trifecta": items.trifecta}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsTrifecta(oldArray => [...oldArray,
                            {"name":items.name,"selection1":items.selection1[0],
                            "trifecta": items.trifecta}])
                    }
                }
                if(items) {
                    if(items.selection2.length>1) {
                        items.selection2.map(runnnerInd=>{
                            setfinalRemainingBetsTrifecta(oldArray => [...oldArray, 
                                {"name":items.name,"selection2":runnnerInd,
                                "trifecta": items.trifecta}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsTrifecta(oldArray => [...oldArray,
                            {"name":items.name,"selection2":items.selection2[0],
                            "trifecta": items.trifecta}])
                    }
                }
                if(items) {
                    if(items.selection3.length>1) {
                        items.selection3.map(runnnerInd=>{
                            setfinalRemainingBetsTrifecta(oldArray => [...oldArray, 
                                {"name":items.name,"selection3":runnnerInd,
                                "trifecta": items.trifecta}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsTrifecta(oldArray => [...oldArray,
                            {"name":items.name,"selection3":items.selection3[0],
                            "trifecta": items.trifecta}])
                    }
                }

            })
        }
    }, [RemainingBetsTrifecta]);



    useEffect(() => {
        if (RemainingBetsExacta && window.innerWidth) {
            setfinalRemainingBetsExacta([])
            
            RemainingBetsExacta.map(items=>{
                if(items) {
                    if(items.selection1.length>1) {
                        items.selection1.map(runnnerInd=>{
                            setfinalRemainingBetsExacta(oldArray => [...oldArray, 
                                {"name":items.name,"selection1":runnnerInd,
                                "exacta": items.exacta}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsExacta(oldArray => [...oldArray,
                            {"name":items.name,"selection1":items.selection1[0],
                            "exacta": items.exacta}])
                    }
                }
                if(items) {
                    if(items.selection2.length>1) {
                        items.selection2.map(runnnerInd=>{
                            setfinalRemainingBetsExacta(oldArray => [...oldArray, 
                                {"name":items.name,"selection2":runnnerInd,
                                "exacta": items.exacta}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsExacta(oldArray => [...oldArray,
                            {"name":items.name,"selection2":items.selection2[0],
                            "exacta": items.exacta}])
                    }
                }
            })
        }
    }, [RemainingBetsExacta]);



    const checkStatus=(runner_item)=>{
        var status=props.remainingBetSlipQuinella[0] && todayData[0] &&raceData[0] && props.type==="Quinella" ?
        props.remainingBetSlipQuinella.filter(e => e.name === todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber
        && e.runners === runner_item.runnerNumber
        ).length > 0
        ?
        true: false:false
        return status
    }

    const checkStatusDuet=(runner_item)=>{
        var status=props.remainingBetSlipDuet[0] && 
        todayData[0] &&raceData[0] && props.type==="Duet" ?
        props.remainingBetSlipDuet.filter(e => 
            e.name === todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber
        && e.runners === runner_item.runnerNumber
        ).length > 0
        ?
        true: false:false
        return status
    }   



    const checkStatusFirst4=(runner_item,Selection)=>{
        if(Selection==1) {
            
            var status=props.remainingBetSlipFirst4[0] && 
            todayData[0] &&raceData[0] && props.type==="First4" ?
            props.remainingBetSlipFirst4.filter(e => 
                e.name === todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber
            && e.selection1 === runner_item.runnerNumber
            ).length > 0
            ?
            true: false:false
            return status
        }
        if(Selection==2) {
            var status=props.remainingBetSlipFirst4[0] && 
            todayData[0] &&raceData[0] && props.type==="First4" ?
            props.remainingBetSlipFirst4.filter(e => 
                e.name === todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber
            && e.selection2 === runner_item.runnerNumber
            ).length > 0
            ?
            true: false:false
            return status
        }
        if(Selection==3) {
            var status=props.remainingBetSlipFirst4[0] && 
            todayData[0] &&raceData[0] && props.type==="First4" ?
            props.remainingBetSlipFirst4.filter(e => 
                e.name === todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber
            && e.selection3 === runner_item.runnerNumber
            ).length > 0
            ?
            true: false:false
            return status
        }
        if(Selection==4) {
            var status=props.remainingBetSlipFirst4[0] && 
            todayData[0] &&raceData[0] && props.type==="First4" ?
            props.remainingBetSlipFirst4.filter(e => 
                e.name === todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber
            && e.selection4 === runner_item.runnerNumber
            ).length > 0
            ?
            true: false:false
            return status
        }
    }   

    const checkStatusTrifecta=(runner_item,Selection)=>{
        if(Selection==1) {
            
            var status=props.remainingBetSlipTrifecta[0] && 
            todayData[0] &&raceData[0] && props.type==="Trifecta" ?
            props.remainingBetSlipTrifecta.filter(e => 
                e.name === todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber
            && e.selection1 === runner_item.runnerNumber
            ).length > 0
            ?
            true: false:false
            return status
        }
        if(Selection==2) {
            var status=props.remainingBetSlipTrifecta[0] && 
            todayData[0] &&raceData[0] && props.type==="Trifecta" ?
            props.remainingBetSlipTrifecta.filter(e => 
                e.name === todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber
            && e.selection2 === runner_item.runnerNumber
            ).length > 0
            ?
            true: false:false
            return status
        }
        if(Selection==3) {
            var status=props.remainingBetSlipTrifecta[0] && 
            todayData[0] &&raceData[0] && props.type==="Trifecta" ?
            props.remainingBetSlipTrifecta.filter(e => 
                e.name === todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber
            && e.selection3 === runner_item.runnerNumber
            ).length > 0
            ?
            true: false:false
            return status
        }
    } 
    const checkStatusExacta=(runner_item,Selection)=>{
        if(Selection==1) {
            
            var status=props.remainingBetSlipExacta[0] && 
            todayData[0] &&raceData[0] && props.type==="Exacta" ?
            props.remainingBetSlipExacta.filter(e => 
                e.name === todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber
            && e.selection1 === runner_item.runnerNumber
            ).length > 0
            ?
            true: false:false
            return status
        }
        if(Selection==2) {
            var status=props.remainingBetSlipExacta[0] && 
            todayData[0] &&raceData[0] && props.type==="Exacta" ?
            props.remainingBetSlipExacta.filter(e => 
                e.name === todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber
            && e.selection2 === runner_item.runnerNumber
            ).length > 0
            ?
            true: false:false
            return status
        }
    } 
    const runnerInfoBody=(props)=>{
        return(
            <div className="pseudo-body">
            {props.racingDetail.runners?props.racingDetail.runners.map(runner_item=>{
                return(
                    <div className="row-runner">
                    <div className="number-cell-body">
                        {runner_item.runnerNumber}
                    </div>
                    <div className={props.type==="Win"?"name-cell-body":"name-cell-body-short"}>
                        <div >
                            <div className="runner-name-wrapper">
                                <div className="runner-name">
                                    {runner_item.runnerName}
                                </div>
                            </div>
                            <div className="runner-metadata-list">
                                <dt>
                                    D
                                </dt>
                                <dd className="full-name">
                                    {runner_item.riderDriverName}
                                </dd>
                                <dt>
                                    T
                                </dt>
                                <dd className="full-name">
                                    {runner_item.trainerName}
                                </dd>
                            </div>
                        </div>
                    </div>
                    <div className="price-cell-body"
                        onClick={()=>
                            props.type==="Win"?handleClickWin(runner_item):""
                        } 
                        style={{
                            backgroundColor:props.remainingBetSlip[0] && todayData[0] &&raceData[0] && props.type==="Win" ?
                            props.remainingBetSlip.filter(e => e.name === todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber
                            && e.runners === runner_item.runnerNumber
                            ).length > 0
                            ?
                            "#d3ecef":"white":"white",
                            cursor:props.type==="Win"?"pointer": "inherit" 
                        }}
                        >
                        <div className="price-cell-body-child"
                        style={{
                            backgroundColor:props.remainingBetSlip[0] && todayData[0] &&raceData[0] && props.type==="Win"?
                            props.remainingBetSlip.filter(e => e.name === todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber
                            && e.runners === runner_item.runnerNumber
                            ).length > 0
                            ?
                            "#d3ecef":"white":"white"}}
                        >
                                    ${runner_item.returnWin}    
                        </div>
                        <div className="price-cell-body-child"
                            style={{
                                backgroundColor:props.remainingBetSlip[0] && todayData[0] &&raceData[0] && props.type==="Win"?
                                props.remainingBetSlip.filter(e => e.name === todayData[0].meetingName+" "+"("+todayData[0].location+")"+" Race "+raceData[0].raceNumber
                                && e.runners === runner_item.runnerNumber
                                ).length > 0
                                ?
                                "#d3ecef":"white":"white"}} >                      
                            ${runner_item.returnPlace}
                        </div>
                    </div>
                    {(props.type==="Quinella")?
                        <div className="price-cell-body checkbox">

                            <div>
                                <div>
                                <input
                                    name="1st"
                                    type="checkbox"
                                    className="checkbox-input"
                                    onClick={()=>handleClickQuinella(runner_item)}
                                    checked={checkStatus(runner_item)}
                                />                                    
                                </div>
                            </div>
                        </div>
                        :(props.type==="Duet")?
                        <div className="price-cell-body checkbox">
                            <div>
                                <div>
                                <input
                                    name="1st"
                                    type="checkbox"
                                    className="checkbox-input"
                                    onClick={()=>handleClickDuet(runner_item)}
                                    checked={checkStatusDuet(runner_item)}
                                />                                    
                                </div>
                            </div>
                        </div>
                        :(props.type==="Trifecta")?
                        <>
                            <div className="price-cell-body">
                                <div>
                                    <div>
                                    <input
                                        name="1st"
                                        type="checkbox"
                                        onClick={()=>handleClickTrifecta(runner_item,1)}
                                        checked={checkStatusTrifecta(runner_item,1)}
                                    />                                    
                                    </div>
                                </div>
                            </div>
                            <div className="price-cell-body">
                                <div>
                                    <div>
                                    <input
                                        name="2nd"
                                        type="checkbox"
                                        onClick={()=>handleClickTrifecta(runner_item,2)}
                                        checked={checkStatusTrifecta(runner_item,2)}
                                    />                                    
                                    </div>
                                </div>
                            </div>
                            <div className="price-cell-body">
                                <div>
                                    <div>
                                    <input
                                        name="3rd"
                                        type="checkbox"
                                        onClick={()=>handleClickTrifecta(runner_item,3)}
                                        checked={checkStatusTrifecta(runner_item,3)}
                                    />                                    
                                    </div>
                                </div>
                            </div>
                        </>
                        :(props.type==="First4")?
                        <>
                            <div className="price-cell-body">
                                <div>
                                    <div>
                                    <input
                                        name="1st"
                                        type="checkbox"
                                        onClick={()=>handleClickFirst4(runner_item,1)}
                                        checked={checkStatusFirst4(runner_item,1)}
                                    />                                    
                                    </div>
                                </div>
                            </div>
                            <div className="price-cell-body">
                                <div>
                                    <div>
                                    <input
                                        name="2nd"
                                        type="checkbox"
                                        onClick={()=>handleClickFirst4(runner_item,2)}
                                        checked={checkStatusFirst4(runner_item,2)}                                    
                                        />                                    
                                    </div>
                                </div>
                            </div>
                            <div className="price-cell-body">
                                <div>
                                    <div>
                                    <input
                                        name="3rd"
                                        type="checkbox"
                                        onClick={()=>handleClickFirst4(runner_item,3)}
                                        checked={checkStatusFirst4(runner_item,3)}                                    
                                        />                                    
                                    </div>
                                </div>
                            </div>
                            <div className="price-cell-body">
                                <div>
                                    <div>
                                    <input
                                        name="4th"
                                        type="checkbox"
                                        onClick={()=>handleClickFirst4(runner_item,4)}
                                        checked={checkStatusFirst4(runner_item,4)}                                    
                                        />                                    
                                    </div>
                                </div>
                            </div>
                        </>:(props.type==="Exacta")?
                        <>
                            <div className="price-cell-body">
                                <div>
                                    <div>
                                    <input
                                        name="1st"
                                        type="checkbox"
                                        onClick={()=>handleClickExacta(runner_item,1)}
                                        checked={checkStatusExacta(runner_item,1)}   
                                    />                                    
                                    </div>
                                </div>
                            </div>
                            <div className="price-cell-body">
                                <div>
                                    <div>
                                    <input
                                        name="2nd"
                                        type="checkbox"
                                        onClick={()=>handleClickExacta(runner_item,2)}
                                        checked={checkStatusExacta(runner_item,2)}   
                                    />                                    
                                    </div>
                                </div>
                        </div>     
                        </> :""        
                    }
                </div>
                )
            }):""}
        </div>
        )
    };

    const runnerInfo=(props)=>{
        return(
            <div className="race-runners-wrapper results">
                <div className="pseudo-table">
                    {runnerInfoheader(props)}
                    {runnerInfoBody(props)}
                </div>
            </div>
        )
    };

    const raceName=(props)=>{
        const raceSlots=(props)=>{
            return(                        
            <div className="meeting-race-selector">
                <div className="meeting-info">
                    <div className="meeting-info-race-selector-wrapper">
                        <div className="meeting-info-race-selector">     
                            {todayData?todayData[0]?todayData[0].races.map(item=>{
                                return(
                                    <Link to={{
                                        pathname:`/${date}/${pathValues.place}/${pathValues.code}/${pathValues.raceType}/${item.raceNumber}/Win`,
                                        slot:item.raceNumber, 
                                        place: pathValues.place,
                                        code:pathValues.code,
                                        raceType:pathValues.raceType
                                       
                                    }}
                                    onClick={()=>{props.fetchPathParams(
                                        {
                                            slot:item.raceNumber, 
                                            place: pathValues.place,
                                            code:pathValues.code,
                                            raceType:pathValues.raceType
                                        }
                                    )}}
                                        className={item.raceStatus==="Paying"?
                                        "meeting-info-race  meeting-info-race-closed":
                                        "meeting-info-race  meeting-info-race-open"}>
                                            R{item.raceNumber}  
                                            <span className={item.raceStatus==="Paying"?"meeting-info-race-results":"meeting-info-race-time"}>
                                                {item.raceStatus==="Paying"?item.results:startTime(item.raceStartTime)} 
                                            </span>
                                    </Link>
                            )}):"":""}
                        </div>
                    </div>
                </div>
            </div>
            )
        };
    
        return(
            <div className="">
                <div className="race-header-container">
                    <header className="race-header">
                        <div className="race-header-info">
                            <div className="race-heading">
                                <div className="race-number">
                                    R{raceData?raceData[0]?
                                    raceData[0].raceNumber:"":""}
                                </div>
                                <div className="race-header-race-time-not-open">
                                    {startTime(raceData?raceData[0]?
                                    raceData[0].raceStartTime:"":"")}
                                </div>
                            </div>
                            <div className="race-info-wrapper">
                                <div className="race-name">
                                    {raceData?raceData[0]?
                                    raceData[0].raceName:"":""}
                                </div>
                                <ul className="race-metadata-list">
                                <li className="status-text">
                                {raceData?raceData[0]?
                                    raceData[0].raceStatus==="Normal"?
                                    duration(raceData[0].raceStartTime):raceData[0].raceStatus:"":""}
                                </li>
                                    <li>{raceData?raceData[0]?
                                    raceData[0].raceDistance:"":""}m</li>
                                    <li>{todayData?todayData[0]?
                                    todayData[0].prizeMoney:"":""}</li>
                                </ul>
                            </div>
                        </div>
                        {raceSlots(props)}
                    </header>    
                </div>
            </div>
        )
    };

    const poolTot=(props)=>{
        return(
            <div className="page-section">
            <div className="info-table">
                <div className="tabbed-sections">
                    <nav className="tabs-nav">
                        <a className="active">
                            Pools
                        </a>
                    </nav>
                    <section className="tabs-section active">
                        <section className="section">
                            <ul className="pools-list">
                                {props.racingDetail.poolTotals?props.racingDetail.poolTotals.map(total_item=>{
                                    return(
                                        <li>
                                        <span>
                                            {total_item.wageringProduct}
                                        </span>
                                        <span className="amount-span">
                                            {total_item.poolTotal}
                                        </span>
                                    </li>
                                    )
                                }):""}
                            </ul>
                        </section>
                    </section>
                </div>
            </div>
        </div>    
        )
    };

    const racetypes=[
        {"name":"Win","url":`/${date}/${pathValues.place}/${pathValues.code}/${pathValues.raceType}/${pathValues.slot}/Win`},
        {"name":"Quinella","url":`/${date}/${pathValues.place}/${pathValues.code}/${pathValues.raceType}/${pathValues.slot}/Quinella`},
        {"name":"Trifecta","url":`/${date}/${pathValues.place}/${pathValues.code}/${pathValues.raceType}/${pathValues.slot}/Trifecta`},
        {"name":"First4","url":`/${date}/${pathValues.place}/${pathValues.code}/${pathValues.raceType}/${pathValues.slot}/First4`},
        {"name":"Exacta","url":`/${date}/${pathValues.place}/${pathValues.code}/${pathValues.raceType}/${pathValues.slot}/Exacta`},
        {"name":"Duet","url":`/${date}/${pathValues.place}/${pathValues.code}/${pathValues.raceType}/${pathValues.slot}/Duet`}
    ]
    
    const placeBets=()=>{
        return(
            <div className="bet-type-carousel">
                <ul className="tbc-nav-tabular-list bet-type-carousel-list">
                    {racetypes.map(item=>{
                        return(
                            <li className="tbc-nav-tabular-list-item">
                                <Link  to={{pathname:item.url,
                                    slot:place_slot,
                                place:place}} 
                                className={item.name===props.type?"tbc-nav-tabular-item-link selected":"tbc-nav-tabular-item-link"}>
                                    <div className="bet-type-carousel-description">
                                        {item.name}
                                    </div>
                                    <div className="bet-type-carousel-legs">
                                    </div>
                                 </Link>
                            </li>
                        )
                    })}
                </ul>
                
            </div>
        )
    };
    return (
        <main className="page-content detail-page">
            <div className="left-column">
                <ui-view>
                    <div className="all-tables">
                        {raceName(props)}
                        <div className="page-section">
                        </div>
                        <div className="page-section">  
                            <div className="race-results-wrapper">
                                <section className={props.racingDetail?props.racingDetail.raceStatus!=="Open":""?
                                "runners-section":"results-section"}>
                                    {raceData?raceData[0]?raceData[0].raceStatus==="Normal"?placeBets():"":"":""}
                                    <div className="page-section-break">
                                    </div> 
                                    {raceData?raceData[0]?raceData[0].raceStatus==="Paying"?resultsTable(props):"":"":""}
                                    {raceData?raceData[0]?raceData[0].raceStatus==="Paying"?exoticTable(props):"":"":""}
                                    {runnerInfo(props)}
                                </section>
                            </div>
                        </div>
                        {poolTot(props)}
                    </div>
                </ui-view>
            </div>
            <MediaQuery query='(min-width: 980px)'>
                <BetSlipHome/>
            </MediaQuery>
        </main>
    );
};

const mapStateToProps=(state,ownProps)=> {
    return{ 
        todayRacing:state.todayRacing,
        slot:ownProps.slot,
        code:ownProps.code,
        raceType:ownProps.raceType,
        place:ownProps.place,
        type:ownProps.type,
        meetingDetails:state.meetingDetails,
        racingDetail:state.racingDetail,
        betSlipInd:state.betSlipInd,
        countBetSlip:state.countBetSlip,

        bet_pool_fh_1:ownProps.bet_pool_fh_1,
        bet_pool_fh_2:ownProps.bet_pool_fh_2,
        pathParams:state.pathParams,

        allBetSlip:state.allBetSlip,
        screenStatus:state.screenStatus,
        remainingBetSlip:state.remainingBetSlip,
        deleteSingleBetData:state.deleteSingleBet,
        deleteAllBetData:state.deleteAllBet,

        allBetSlipQuinella: state.allBetSlipQuinella,
        screenStatusQuinella: state.screenStatusQuinella,
        remainingBetSlipQuinella: state.remainingBetSlipQuinella,
        deleteSingleBetQuinella: state.deleteSingleBetQuinella,
        deleteAllBetQuinella: state.deleteAllBetQuinella,

        allBetSlipTrifecta: state.allBetSlipTrifecta,
        screenStatusTrifecta: state.screenStatusTrifecta,
        remainingBetSlipTrifecta: state.remainingBetSlipTrifecta,
        deleteSingleBetTrifecta: state.deleteSingleBetTrifecta,
        deleteAllBetTrifecta: state.deleteAllBetTrifecta,

        allBetSlipFirst4: state.allBetSlipFirst4,
        screenStatusFirst4: state.screenStatusFirst4,
        remainingBetSlipFirst4: state.remainingBetSlipFirst4,
        deleteSingleBetFirst4: state.deleteSingleBetFirst4,
        deleteAllBetFirst4: state.deleteAllBetFirst4,


        allBetSlipExacta: state.allBetSlipExacta,
        screenStatusExacta: state.screenStatusExacta,
        remainingBetSlipExacta: state.remainingBetSlipExacta,
        deleteSingleBetExacta: state.deleteSingleBetExacta,
        deleteAllBetExacta: state.deleteAllBetExacta,

        allBetSlipDuet: state.allBetSlipDuet,
        screenStatusDuet: state.screenStatusDuet,
        remainingBetSlipDuet: state.remainingBetSlipDuet,
        deleteSingleBetDuet: state.deleteSingleBetDuet,
        deleteAllBetDuet: state.deleteAllBetDuet,
        
    }
}
export default connect(mapStateToProps, 
    { 
        fetchRaceDetails,
        fetchMeetingDetails,
        addBetSlipData,
        allBetSlipData,
        countBetSlipData,
        betSlipScreen,
        remainingBetSlipData,
        fetchPathParams,
        fetchTodayRacing,
        deleteSingleBet,
        deleteAllBets,

        allBetSlipDataQuinella,
        remainingBetSlipDataQuinella,
        betSlipScreenQuinella,
        postWinPlaceBetsQuinella,
        deleteSingleBetQuinella,
        deleteAllBetsQuinella,

        
        allBetSlipDataTrifecta,
        remainingBetSlipDataTrifecta,
        betSlipScreenTrifecta,
        postWinPlaceBetsTrifecta,
        deleteSingleBetTrifecta,
        deleteAllBetsTrifecta,

        
        allBetSlipDataFirst4,
        remainingBetSlipDataFirst4,
        betSlipScreenFirst4,
        postWinPlaceBetsFirst4,
        deleteSingleBetFirst4,
        deleteAllBetsFirst4,

        
        allBetSlipDataExacta,
        remainingBetSlipDataExacta,
        betSlipScreenExacta,
        postWinPlaceBetsExacta,
        deleteSingleBetExacta,
        deleteAllBetsExacta,

        
        allBetSlipDataDuet,
        remainingBetSlipDataDuet,
        betSlipScreenDuet,
        postWinPlaceBetsDuet,
        deleteSingleBetDuet,
        deleteAllBetsDuet
        })
    (RaceDetails);