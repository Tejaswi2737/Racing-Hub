import React from 'react';
import MediaQuery from 'react-responsive';

import Header from '../Nav/Header';
import RespHeader from '../Nav//RespHeader';

import NextListHome from '../Home/NextListHome';
import BetSlipHome from '../BetSlip/BetSlipHome';
import "./Home.css";

const Home=() =>{
    return (
        <>
            <MediaQuery query='(min-width: 980px)'>
                <RespHeader/>
                <NextListHome/>
            </MediaQuery>
            <MediaQuery query='(max-width: 980px)'>
                <Header/>
                <NextListHome/>
            </MediaQuery>           
        </>
    )
}
export default Home;

        {/* <MediaQuery query='(min-width: 800px)'>
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
        </MediaQuery>
        <MediaQuery query='(max-width: 800px)'>
            <Header/>
            <NextListHome/>
        </MediaQuery> */}