import React from 'react';
import MediaQuery from 'react-responsive';
import { Link} from "react-router-dom";

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import Header from '../Nav/Header';
import RespHeader from '../Nav//RespHeader';
import MenuView from "../Nav/Menu";

import NextListHome from '../Home/NextListHome';
import BetSlipHome from '../BetSlip/BetSlipHome';
import "./Home.css";
import mobileSlipButton from '../BetSlip/MobileLayout/mobileSlipButton';

const Home=() =>{
    const scrollBarStyle = {
        width: '100vw',
        height: '100vh',
      };

    return (
        <>
            <MediaQuery query='(min-width: 980px)'>
                <SimpleBar style={{ maxHeight: '100vh' }}>
                <RespHeader/>
                    <NextListHome/>
                </SimpleBar>
            </MediaQuery>
            <MediaQuery query='(max-width: 980px)'>
                <SimpleBar style={{ maxHeight: '100vh' }}>
                <MenuView/>
                    <Header/>
                    <NextListHome/>
                    <Link to="/2020/betSlip"
                        id="mobile-betSlip-button">
                        <span>B-S
                            </span>
                    </Link>
                </SimpleBar>   
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




