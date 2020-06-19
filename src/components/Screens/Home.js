import React from 'react'
import Header from '../Nav/Header';
import NextListHome from '../Home/NextListHome';
import BetSlipHome from '../BetSlip/BetSlipHome';
import "./Home.css";

const Home=() =>{
    return (
        <ui-view>
            <Header/>
            <main className="page-content">
                <div className="left-column">
                    <ui-view>
                        <nav className="menuItems">
                            <NextListHome/>
                        </nav>
                    </ui-view>
                </div>
                <BetSlipHome/>
            </main>
        </ui-view>
    )
}
export default Home;
