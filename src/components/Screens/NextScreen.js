import React,{useState,useEffect,useRef} from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import { fetchNextRace } from "../../actions";

import Header from '../Nav/Header';
import NextRace from '../Next/NextRace';
import NextList from '../Next/NextList';
import BetSlipHome from '../BetSlip/BetSlipHome';
import RespHeader from '../Nav/RespHeader';
import "../Next/NextRace.css"
const NextScreen=(props) =>{
    props.fetchNextRace();

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
     )
  
     setTimeout(()=>{
        setShowLoading(false)
        return () => {
            clearInterval(timerToClearSomewhere.current)
          }
     },1000)
    return (
            <>
                <MediaQuery query='(min-width: 800px)'>
                    <ui-view>
                        <RespHeader/>
                        <NextList next={props.next}/>
                        <main className="page-content">
                            <div className="left-column">
                                <ui-view>
                                    <nav className="menuItems">
                                        <NextRace next={props.next}/>
                                    </nav>
                                </ui-view>
                            </div>
                            <BetSlipHome/>
                        </main>
                    </ui-view>          
                </MediaQuery>
                <MediaQuery query='(max-width: 800px)'>
                    <Header/>
                    <main className="page-items">
                        <NextList next={props.next}/>
                        <NextRace next={props.next}/>
                    </main>

                </MediaQuery>
            </>
    )
}
// export default NextScreen;
const mapStateToProps=(state)=> {
    return{ next:state.next}
}
export default connect(mapStateToProps, { fetchNextRace } )(NextScreen);