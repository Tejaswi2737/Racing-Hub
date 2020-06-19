import React, {useState} from 'react'
import "./BetSlip.css"
import { values } from 'lodash'
import { RiDeleteBin6Line } from "react-icons/ri";

const BetSlipHome=() =>{

    const [showCurrency, setshowCurrency] = useState(false)
    
    const betSlipHeader=()=>{
        return(
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
        )
    };

    const betSlipPlaceInput=(props)=>{
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
                                        <input type="decimal" 
                                        onClick={()=>{setshowCurrency(true)}}
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
                                        <input type="decimal" 
                                        onClick={()=>{setshowCurrency(true)}}
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

    const betSlipBetDetail =(props)=>{
        return(

                    <div className="card">
                        {/* for the bet slips */}
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
                                        {betSlipPlaceInput()}
                                    </div>
                                    <footer className="bet-card-footer">
                                        <div className="bet-card-footer-actions">
                                            <button className="bet-card-remove">
                                                <i className="icon-remove" style={{height:'5rem'}}>
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
    }
    const currencyOpen=()=>{
        const currency=[{"amount":"50","denom":"c"},
        {"amount":"1","denom":"d"},
        {"amount":"5","denom":"d"},
        {"amount":"10","denom":"d"},
        {"amount":"20","denom":"d"},
        {"amount":"50","denom":"d"},
        {"amount":"100","denom":"d"},
        {"amount":"500","denom":"d"},
         ]
        console.log("open")
        console.log(currency)
        return(
            <div className="bet-builder-actions-wrapper">
                <div className="bet-builder-keypad">
                {showCurrency?
                    <menu className="keypad-menu">
                        {currency.map(coin=>{
                        return(
                        <button className="common-button">
                            {(coin.denom=="d")?'+'+'$'+coin.amount:'+'+coin.amount+'c'}
                        </button>)})}
                        <button onClick={()=>setshowCurrency(false)}
                        className="common-button keypad-close-button large">
                            Done/Close
                        </button>
                        <button className="common-button">
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
                        <button  className="bet-builder-button common-button change-bet-button builder-bet-clear-all">
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
    console.log(showCurrency)
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
                                        {betSlipBetDetail()}
                                        {betSlipBetDetail()}
                                        {betSlipBetDetail()}
                                    </div>
                                </div>
                            </div>
                            {currencyOpen()}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default BetSlipHome;
