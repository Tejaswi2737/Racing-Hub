import React, {useState,useEffect} from 'react';
import { connect } from 'react-redux';

import _, { isInteger, indexOf } from "lodash"
import "./BetSlip.css"
import { RiDeleteBin6Line } from "react-icons/ri";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';


import { 
    addBetSlipData,
    allBetSlipData,
    deleteBetSlipData,
    remainingBetSlipData,
    betSlipScreen,
    postWinPlaceBets
} from "../../actions";
import { toInteger } from 'lodash';



const BetSlipHome=(props) =>{
    const [poolFinalList, setpoolFinalList] = useState([]);

    const [totalAmount, settotalAmount] = useState(0)
    const [poolStatus, setpoolStatus] = useState()
    const [betAllData, setbetAllData] = useState();
    const [deletedBets, setdeletedBets] = useState([]);
    const [deleteOn, setdeleteOn] = useState(false)
    const [RemainingBets, setRemainingBets] = useState();
    const [finalRemainingBets, setfinalRemainingBets] = useState([]);
    const [placeWinPlaceBetList, setplaceWinPlaceBetList] = useState([])

    const [distinctPoolfh, setdistinctPoolfh] = useState();
    const [runnerList, setrunnerList] = useState();
    const [showCurrency, setshowCurrency] = useState(false)
    const [BetSlipDoneJson, setBetSlipDoneJson] = useState();
    const [BetSlipPendingJson, setBetSlipPendingJson] = useState([]);
    const [BetSlipSingle, setBetSlipSingle] = useState();
    const [fetched, setfetched] = useState(false);
    const [fetchedSingle, setfetchedSingle] = useState(false);

    const [deleted,setdeleted]=useState(false)
    const [startSlip, setstartSlip] = useState(false)
    const [BetSlipSingleSubmitted, setBetSlipSubmitted] = useState();
    const [betDone, setbetDone] = useState(false);

    const [WinMoney, setWinMoney] = useState(null);
    const [PlaceMoney, setPlaceMoney] = useState(null);
    const [ManualPlace, setManualPlace] = useState(0);
    const [ManualWin, setManualWin] = useState(0);
    const [typeBet, settypeBet] = useState('');
    const [localRemaining, setlocalRemaining] = useState([])
    useEffect(() => {
        const data =window.localStorage.getItem('betSlip')
        if (data) {
            setlocalRemaining(JSON.parse(data))
        }
    }, [])

    useEffect(() => {
        if(finalRemainingBets) {
            localStorage.setItem('betSlip',JSON.stringify(finalRemainingBets))
        }
    }, [finalRemainingBets]);
    
    useEffect(() => {
        props.postWinPlaceBets([])
        var users=props.allBetSlip;
        var rem=props.remainingBetSlip.length<1?localRemaining:props.remainingBetSlip
        if(props.screenStatus) {
            users = [users, ...rem];
        } else {users=[...rem]}
        
        var dele=[];
        if(props.remainingBetSlip) {
            users=Object.values(users)
        }

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
                setstartSlip(true)
            }
        };
    }, [props.allBetSlip,localRemaining]);



    
    const deleteSingleBet=(item)=>{
        if (RemainingBets.length==1){
            setstartSlip(false)
            setRemainingBets([])
        }
        var obje=RemainingBets.filter(e1=> { return e1 != item })
        setRemainingBets(obje)
        if(item.runners.length>1) {
            item.runners.map(runnnerInd=>{
                setdeletedBets(oldArray => [...oldArray, {"name":item.name,"runners":parseInt(runnnerInd),"win": item.win ,"place": item.place}]); 
            })
        } else {
            setdeletedBets(oldArray => [...oldArray, {"name":item.name,"runners":parseInt(item.runners),"win": item.win ,"place": item.place}]);
        }
    };

    const handleDeleteAll=()=>{
        if (RemainingBets.length==1){
            setstartSlip(false)
            setRemainingBets()
        }
        RemainingBets.map(items=>{
            if(items) {
                if(items.runners.length>1) {
                    items.runners.map(runnnerInd=>{
                        setdeletedBets(oldArray => [...oldArray, 
                            {"name":items.name,"runners":runnnerInd,
                            "win": items.win ,"place": items.place}]);
                    })
                } else setdeletedBets(oldArray => [...oldArray, items]);   
            }
         })
        setRemainingBets([])
        setshowCurrency(false);
    };

    useEffect(() => {
        if (RemainingBets) {
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
        if (finalRemainingBets) {
            setplaceWinPlaceBetList([])
            finalRemainingBets.map(items=>{
                if(items) {
                    if( items.win>0)  {
                        setplaceWinPlaceBetList(oldArray => [...oldArray,
                            {
                                "bet_fh": "tk_integ_"+Date.now()+"_"+items.name,
                                "bet_pool_fh": items.name+'w',
                                "stake_cents": items.win,
                                "combinations":[
                                {
                                "place":1,
                                "runners":[items.runners]
                                }
                                ]
                            }                          
                        ])
                        
                    }
                    if( items.place>0)  {
                        setplaceWinPlaceBetList(oldArray => [...oldArray,
                            {
                                "bet_fh": "tk_integ_"+Date.now()+"_"+items.name,
                                "bet_pool_fh": items.name+"p",
                                "stake_cents": items.place,
                                "combinations":[
                                {
                                "place":2,
                                "runners":[items.runners]
                                }
                                ]
                            }                           
                        ])
                    }

                }
            })
        }
    }, [finalRemainingBets]);
    useEffect(() => {
        props.remainingBetSlipData(finalRemainingBets)
    }, [finalRemainingBets]);
    useEffect(() => {
        props.deleteBetSlipData(deletedBets)
    }, [deletedBets]);
    
    const betSlipHeader=()=>{
        return(
            <SimpleBar style={{ maxHeight: '100vh' }}>
            <header className="side-panel-title-bar">
                <toggle-button className="betslip-toggle">
                    <div className="toggle-button-grouped">
                        <button className="toggle-button selected">
                            Bet Slip
                        </button>
                        <button className="toggle-button">
                            Pending Bets
                        </button>
                    </div>
                </toggle-button>
            </header>
            </SimpleBar>
        )
    };


    const betSlipPlaceInput=(item)=>{
        var pos=(_.findIndex(RemainingBets, item));
        const updateFieldChanged = (e,item) => {
            e.preventDefault();
            var pos=(_.findIndex(RemainingBets, item))
            var newArr = [...RemainingBets]; 
            newArr[pos][e.target.name] = parseInt(e.target.value); 
            newArr[pos][e.target.name]=newArr[pos][e.target.name]
            setRemainingBets(newArr); 
        }
        return(
            <>
                <form className="common-form bet-card-form ng-valid ng-dirty ng-valid-parse">
                    <ul className="">
                        <li className="">
                            <div className="bet-card-info">
                                <label className="bet-info-value">
                                    Win
                                </label>
                                <div className="bet-card-input">
                                    <stake-input className="">
                                        <span className="stake-input">
                                            <span className="currency">
                                                $
                                            </span>
                                            <input 
                                                type="number"
                                                onClick={()=>{
                                                    settypeBet('Win')
                                                }} 
                                                key={RemainingBets[pos]['name']+'win'}
                                                name='win'
                                                placeholder={null}
                                                value={RemainingBets[pos]['win']}
                                                min={0}
                                                onChange={(e)=>updateFieldChanged(e,item)} 
                                                className="common-textfield ng-valid stake-input-has-focus ng-touched ng-not-empty ng-dirty ng-valid-parse">
                                            </input>
                                        </span>
                                    </stake-input>
                                </div>
                            </div>
                        </li>
                        <li className="">
                            <div className="bet-card-info">
                                <label className="bet-info-value">
                                    Place
                                </label>
                                <div className="bet-card-input">
                                    <stake-input className="">
                                        <span className="stake-input">
                                            <span className="currency">
                                                $
                                            </span>
                                            <input 
                                                type="number"
                                                onClick={()=>{
                                                    settypeBet('Place')
                                                }}
                                                name='place'
                                                placeholder={null}
                                                key={RemainingBets[pos]['name']+'place'}
                                                onChange={(e)=>updateFieldChanged(e,item)} 
                                                value={RemainingBets[pos]['place']}
                                                min={0}
                                                className="common-textfield ng-valid stake-input-has-focus ng-touched ng-not-empty ng-dirty ng-valid-parse">
                                            </input>
                                        </span>
                                    </stake-input>
                                </div>
                            </div>
                        </li>
                        <li className="">
                            <div className="bet-card-info">
                                <bet-cost className="">
                                    <label className="bet-info-label">
                                        Bet Cost
                                    </label>
                                    <span className="bet-info-value">
                                        ${(isNaN(RemainingBets[pos]['win'])&&isNaN(RemainingBets[pos]['place']))?0:
                                        isNaN(RemainingBets[pos]['win'])?item.runners.length*(RemainingBets[pos]['place']):
                                        isNaN(RemainingBets[pos]['place'])?item.runners.length*(RemainingBets[pos]['win']):
                                        item.runners.length*(RemainingBets[pos]['win']+RemainingBets[pos]['place'])}
                                    </span>
                                </bet-cost>
                            </div>
                        </li>
                    </ul>
                </form>
            </>
        )
    };
    const betSlipBetDetail =(WinMoney)=>{
        return(
            <>
            {RemainingBets?(startSlip)?RemainingBets.map(item=>{
                return(
                    item?item.name?
                        <div className="card">
                        <div className="">
                            <parimutuel className="">
                                <section className="bet-card">
                                    <header className="bet-card-header">
                                        <h1 className="bet-card-title">
                                            Win/Place
                                        </h1>
                                        <span className="bet-card-type tote">
                                            TOTE
                                        </span>
                                    </header>
                                    <div className="bet-card-body">
                                        <div className="bet-additional-info">
                                            <ul className="bet-card-race-information">
                                                <li>
                                                    {item.name} 
                                                </li>
                                            </ul>
                                            <ul className="bet-card-selections">
                                                <li>
                                                    <p className="bet-card-label">
                                                        Selections
                                                    </p>
                                                    <span className="bet-card-selection">
                                                        {item.runners.map(no=>{
                                                            return(
                                                                <>
                                                                <span>
                                                                    {no}
                                                                </span>
                                                                <span className="runner-seperator">
                                                                    {" , "}
                                                                </span>
                                                                </>
                                                            )
                                                        })}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                        {betSlipPlaceInput(item)}
                                    </div>
                                    <footer className="bet-card-footer">
                                        <div className="bet-card-footer-actions">
                                            <button className="bet-card-remove">
                                                <i onClick={()=>{deleteSingleBet(item)
                                                            setdeleted(true)
                                                            setshowCurrency(false)}}
                                                className="icon-remove" style={{height:'5rem'}}>
                                                    <RiDeleteBin6Line/>
                                                </i>
                                            </button>
                                        </div>
                                    </footer>
                                </section>
                            </parimutuel>
                        </div>
                    </div>
                    :"":""
                )
            })
        :"":""}
        </>
        )
    }
    const currencyOpen=(WinMoney,PlaceMoney,BetSlipDoneJson,typeBet,ManualPlace,ManualWin)=>{
        return(
            <div className="bet-builder-actions-wrapper">
                <footer className="bet-builder-footer">
                    <ul className="summary-list">
                        <li className="">
                            <h1 className="">
                                Number of bets
                            </h1>
                            <p className="bet-builder-footer-key-info">
                                <span className="bet-summary-info">
                                    Single
                                </span>
                            </p>
                        </li>
                        <li  className="">
                            <h1  className="">
                                Total cost
                            </h1>
                            <p  className="bet-builder-footer-key-info bet-builder-total-bets-cost">
                            ${_.sumBy(finalRemainingBets, 'win')+_.sumBy(finalRemainingBets, 'place')}
                            </p>
                        </li>
                    </ul>
                    <menu  className="bet-summary-menu">
                        <button  onClick={()=>{
                            handleDeleteAll()
                        }
                        }
                        className="bet-builder-button common-button change-bet-button builder-bet-clear-all">
                            Delete All
                        </button>
                        <button  onClick={()=>{
                            props.postWinPlaceBets(placeWinPlaceBetList)
                        }}
                        className="bet-builder-button common-button submit-bet-button bet-builder-bet-now-button">
                            Bet Now
                        </button>
                    </menu>
                </footer>
            </div>
        )
    };
    return (
        <div className="side-panel toggleable">
            <div className="inner-side-panel pane loaded">
                {betSlipHeader()}
                <div className="bet-builder bet-builder-has-bet">
                    <div className="bet-builder-state build">
                        <div className="inner-bet-builder-state">
                            <div className={showCurrency?"side-panel-messages-wrapper":"side-panel-messages-wrapper-closed"}>
                                <div className="bet-builder-bet-slip">
                                    <div className="bet-cards-wrapper">
                                        {betSlipBetDetail(WinMoney, PlaceMoney,BetSlipDoneJson)}
                                    </div>
                                </div>
                            </div>
                            {currencyOpen(WinMoney, PlaceMoney,BetSlipDoneJson,typeBet)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps=(state)=> {
    return{ 
        betSlipInd:state.betSlipInd,
        allBetSlip:state.allBetSlip,
        deleteBetSlip:state.deleteBetSlip,
        remainingBetSlip:state.remainingBetSlip,
        screenStatus:state.screenStatus,
        postWinPlace:state.postWinPlace
    }
}
export default connect(mapStateToProps, 
    { 
        addBetSlipData,
        allBetSlipData,
        deleteBetSlipData,
        remainingBetSlipData,
        betSlipScreen,
        postWinPlaceBets
    })
    (BetSlipHome);
