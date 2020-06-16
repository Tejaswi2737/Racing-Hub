import React,{useState,useEffect,useRef} from 'react';
import { connect } from 'react-redux';

import { fetchNextRace } from "../../actions";

import Header from '../Nav/Header';
import NextRace from '../Next/NextRace';
import NextList from '../Next/NextList';

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
        <div>
            <Header/>
            {/* {showLoading?<NextList next={props.next}/>:<NextList next={props.next}/>} */}
            <NextList next={props.next}/>
            <NextRace next={props.next}/>
        </div>
    )
}
// export default NextScreen;
const mapStateToProps=(state)=> {
    return{ next:state.next}
}
export default connect(mapStateToProps, { fetchNextRace } )(NextScreen);