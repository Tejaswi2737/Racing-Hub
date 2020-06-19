import React from 'react'
import "./BetSlip.css"

const BetSlipHome=() =>{
    return (
        <div className="side-panel toggleable">
            <div className="inner-side-panel pane loaded">
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
            </div>
        </div>
    )
}
export default BetSlipHome;
