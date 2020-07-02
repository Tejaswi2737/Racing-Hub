import React,{useState,useEffect,useRef} from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { fetchNextRace,allBetSlipData,betSlipScreen } from "../../actions";


import Header from '../Nav/Header'
import TodayDetails from '../Today/TodayDetails'
import NextList from '../Next/NextList'
import BetSlipHome from '../BetSlip/BetSlipHome';
import RespHeader from '../Nav/RespHeader';

const TodayG=(props)=> {
    props.fetchNextRace();
    props.betSlipScreen(false)
    // useEffect(() => {
    //   props.allBetSlipData([])
    // }, [props.next])
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
        })
    return (
        <>
          <MediaQuery query='(min-width: 800px)'>
          <SimpleBar style={{ maxHeight: '100vh' }}>

            <ui-view>
                <RespHeader/>
                <NextList next={props.next}/>
                <main className="page-content">
                    <div className="left-column">
                        <ui-view>
                            <nav className="menuItems">
                              <TodayDetails detail='G'/>
                            </nav>
                        </ui-view>
                    </div>
                    <BetSlipHome/>
                </main>
            </ui-view>    
            </SimpleBar>     
          </MediaQuery>
          <MediaQuery query='(max-width: 800px)'>
          <SimpleBar style={{ maxHeight: '100vh' }}>
              <Header/>
              <NextList next={props.next}/>
              <TodayDetails detail='G'/>
              </SimpleBar>
          </MediaQuery>
        </>
    );
}
const mapStateToProps=(state)=> {
    return{
      next:state.next,
      allBetSlip:state.allBetSlip,
      screenStatus:state.screenStatus,
    }
}
export default connect(mapStateToProps, { 
  fetchNextRace,
  allBetSlipData,
  betSlipScreen
 } )(TodayG);
// export default TodayG;