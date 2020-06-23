import React, {useState,useEffect} from 'react';
import { connect } from 'react-redux';


import "./BetSlip.css"
import { RiDeleteBin6Line } from "react-icons/ri";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';


import { fetchMeetingDetails,
    fetchRaceDetails,
    fetchWinPlaceBet} from "../../actions";
import { toInteger } from 'lodash';



const BetSlipHome=(props) =>{
    props.fetchWinPlaceBet();
    const [showCurrency, setshowCurrency] = useState(false)
    const [BetSlipDoneJson, setBetSlipDoneJson] = useState();
    const [BetSlipPendingJson, setBetSlipPendingJson] = useState({});
    const [BetSlipSingle, setBetSlipSingle] = useState();
    const [fetched, setfetched] = useState(false);
    const [fetchedSingle, setfetchedSingle] = useState(false);

    const [deleted,setdeleted]=useState(false)
    const [startSlip, setstartSlip] = useState(false)
    const [BetSlipSingleSubmitted, setBetSlipSubmitted] = useState();
    const [betDone, setbetDone] = useState(false);

    const [WinMoney, setWinMoney] = useState(0);
    const [PlaceMoney, setPlaceMoney] = useState(0);
    const [ManualPlace, setManualPlace] = useState(0);
    const [ManualWin, setManualWin] = useState(0);
    const [typeBet, settypeBet] = useState('');

    const doneBet=(item)=>{
        if (betDone){
            if (WinMoney>0.5||PlaceMoney>0.5) {
                setBetSlipDoneJson([BetSlipSingleSubmitted])
                if (BetSlipPendingJson.length==1){
                    setstartSlip(false)
                    BetSlipPendingJson({})
                }
                else (setBetSlipPendingJson(BetSlipPendingJson.filter(e1=> { return e1 != item })))
            }
        }    
        setbetDone(false)
    };    
    useEffect(() => {
        setfetched(true)
    }, [props])

    useEffect(() => {
        if (fetched) {
            setBetSlipSingle(props.winPlace)
            setfetchedSingle(true)
        }
    }, [fetched])
    

    useEffect(() => {
        if (fetchedSingle){
            setBetSlipPendingJson(BetSlipSingle)
            setstartSlip(true) 
        }
    }, [fetchedSingle]);



    useEffect(() => {
        setWinMoney(0)
        setPlaceMoney(0)
    }, [showCurrency]);

    const deleteSingleBet=(item)=>{
        if (BetSlipPendingJson.length==1){
            setstartSlip(false)
        }
        setBetSlipPendingJson(BetSlipPendingJson.filter(e1=> { return e1 != item }))
    };

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

    const betSlipPlaceInput=(props,WinMoney)=>{
        const manualChangePlaceAmount=(e)=>{
            setManualPlace(e.target.value)
        }
        const manualChangeWinAmount=(e)=>{
            setManualWin(e.target.value)
        }
        return(
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
                                        type={Number}
                                        onClick={()=>{
                                            setshowCurrency(true)
                                            settypeBet('Win')
                                        }} 
                                        value={WinMoney}
                                        onChange={(e)=>manualChangeWinAmount(e)}
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
                                        type={Number}
                                        onClick={()=>{
                                            setshowCurrency(true)
                                            settypeBet('Place')
                                        }}
                                        onChange={(e)=>manualChangePlaceAmount(e)}
                                        value={PlaceMoney}
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
                                    $1
                                </span>
                            </bet-cost>
                        </div>
                    </li>
                </ul>
            </form>
        )
    };

    const betSlipBetDetail =(WinMoney)=>{
        return(
            <>
            {(startSlip)?BetSlipPendingJson.map(item=>{
                return(
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
                                                MENANGLE 
                                                <span className="">
                                                    {' '+ '(NSW)'}
                                                </span>
                                                <span>
                                                    {' '+'RACE 3'}
                                                </span>
                                            </li>
                                        </ul>
                                        <ul className="bet-card-selections">
                                            <li>
                                                <p className="bet-card-label">
                                                    Selections
                                                </p>
                                                <span className="bet-card-selection">
                                                    1
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    {betSlipPlaceInput(props,WinMoney)}
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
                )
            })
        :""}
        </>
        )
    }
    const currencyOpen=(WinMoney,PlaceMoney,BetSlipDoneJson,typeBet,ManualPlace,ManualWin)=>{
        const currency=[
            {"amount":"50","denom":"c"},
            {"amount":1,"denom":"d"},
            {"amount":5,"denom":"d"},
            {"amount":10,"denom":"d"},
            {"amount":20,"denom":"d"},
            {"amount":50,"denom":"d"},
            {"amount":100,"denom":"d"},
            {"amount":500,"denom":"d"},
        ]
        const setCentMoney=(coin) =>{
            if (typeBet=='Win') setWinMoney(WinMoney+coin.amount/100);
            if (typeBet=='Place')  setPlaceMoney(PlaceMoney+coin.amount/100)
        }
        const setDollarMoney=(coin) =>{
            if (typeBet=='Win') setWinMoney(WinMoney+coin.amount);
            if (typeBet=='Place') setPlaceMoney(PlaceMoney+coin.amount)
        }
        return(
            <div className="bet-builder-actions-wrapper">
                <div className="bet-builder-keypad">
                {showCurrency?
                    <menu className="keypad-menu">
                        {currency.map(coin=>{
                        return(
                        <button className="common-button"
                            onClick={()=>
                                {(coin.denom=='c')?setCentMoney(coin):setDollarMoney(coin)}}
                            >
                            {(coin.denom==="d")?'+'+'$'+coin.amount:'+'+coin.amount+'c'}
                        </button>)})}
                        <button onClick={()=>{
                            setshowCurrency(false)
                            setbetDone(true)
                            }}
                        className="common-button keypad-close-button large">
                            Done/Close
                        </button>
                        <button onClick={()=>{typeBet=='Win'?setWinMoney(0):setPlaceMoney(0)}}
                        className="common-button">
                            Clear
                        </button>
                    </menu>
                :""}
                </div>
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
                            $36.50
                            </p>
                        </li>
                    </ul>
                    <menu  className="bet-summary-menu">
                        <button  onClick={()=>{
                            setstartSlip(false)
                            setshowCurrency(false)
                            setBetSlipDoneJson({})}}
                        className="bet-builder-button common-button change-bet-button builder-bet-clear-all">
                            Delete All
                        </button>
                        <button  className="bet-builder-button common-button submit-bet-button bet-builder-bet-now-button">
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
// export default BetSlipHome;

const mapStateToProps=(state)=> {
    return{ 
        winPlace:state.winPlaceBet,
    }
}
export default connect(mapStateToProps, 
    { 
        fetchWinPlaceBet
    })
    (BetSlipHome);
