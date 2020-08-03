import React, {useState,useEffect,useRe} from 'react';
import { connect } from 'react-redux';

import _, { isInteger, indexOf, isObject, isArray } from "lodash"
import "./BetSlip.css"
import { RiDeleteBin6Line } from "react-icons/ri";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { 
    addBetSlipData,
    deleteBetSlipData,

    allBetSlipData,
    remainingBetSlipData,
    betSlipScreen,
    postWinPlaceBets,
    deleteSingleBet,
    deleteAllBets,

    allBetSlipDataQuinella,
    remainingBetSlipDataQuinella,
    betSlipScreenQuinella,
    postWinPlaceBetsQuinella,
    deleteSingleBetQuinella,
    deleteAllBetsQuinella,

    
    allBetSlipDataTrifecta,
    remainingBetSlipDataTrifecta,
    betSlipScreenTrifecta,
    postWinPlaceBetsTrifecta,
    deleteSingleBetTrifecta,
    deleteAllBetsTrifecta,

    allBetSlipDataFirst4,
    remainingBetSlipDataFirst4,
    betSlipScreenFirst4,
    postWinPlaceBetsFirst4,
    deleteSingleBetFirst4,
    deleteAllBetsFirst4,

    allBetSlipDataExacta,
    remainingBetSlipDataExacta,
    betSlipScreenExacta,
    postWinPlaceBetsExacta,
    deleteSingleBetExacta,
    deleteAllBetsExacta,

    allBetSlipDataDuet,
    remainingBetSlipDataDuet,
    betSlipScreenDuet,
    postWinPlaceBetsDuet,
    deleteSingleBetDuet,
    deleteAllBetsDuet
} from "../../actions";

const BetSlipHome=(props) =>{
    const [poolFinalList, setpoolFinalList] = useState([]);
    const [mobileRemaining, setmobileRemaining] = useState([]);
    const [desktopRemin, setdesktopRemin] = useState([]);
    const [deletedBets, setdeletedBets] = useState([]);

    const [placeWinPlaceBetList, setplaceWinPlaceBetList] = useState([]);
    const [placeWinPlaceBetListQuinella, setplaceWinPlaceBetListQuinella] = useState([]);
    const [placeWinPlaceBetListDuet, setplaceWinPlaceBetListDuet] = useState([])
    const [placeWinPlaceBetListTrifecta, setplaceWinPlaceBetListTrifecta] = useState([])
    const [placeWinPlaceBetListFirst4, setplaceWinPlaceBetListFirst4] = useState([])
    const [placeWinPlaceBetListExacta, setplaceWinPlaceBetListExacta] = useState([])

    const [showCurrency, setshowCurrency] = useState(false)
    const [BetSlipDoneJson, setBetSlipDoneJson] = useState();
    const [deleted,setdeleted]=useState(false)
    const [startSlip, setstartSlip] = useState(false)
    const [WinMoney, setWinMoney] = useState(null);
    const [PlaceMoney, setPlaceMoney] = useState(null);
    const [typeBet, settypeBet] = useState('');
    const [localRemaining, setlocalRemaining] = useState([]);

    const [poolFinalListQuienlla, setpoolFinalListQuienlla] = useState([]);

    const [RemainingBets, setRemainingBets] = useState([]);
    const [RemainingBetsQuienlla, setRemainingBetsQuienlla] = useState([]);
    const [RemainingBetsTrifecta, setRemainingBetsTrifecta] = useState([]);
    const [RemainingBetsFirst4, setRemainingBetsFirst4] = useState([]);
    const [RemainingBetsExacta, setRemainingBetsExacta] = useState([]);
    const [RemainingBetsDuet, setRemainingBetsDuet] = useState([]);
    
    const [finalRemainingBets, setfinalRemainingBets] = useState([]);
    const [finalRemainingBetsQuienlla, setfinalRemainingBetsQuienlla] = useState([]);
    const [finalRemainingBetsTrifecta, setfinalRemainingBetsTrifecta] = useState([]);
    const [finalRemainingBetsFirst4, setfinalRemainingBetsFirst4] = useState([]);
    const [finalRemainingBetsExacta, setfinalRemainingBetsExacta] = useState([]);
    const [finalRemainingBetsDuet, setfinalRemainingBetsDuet] = useState([]);

    useEffect(() => {
        var users;
        props.postWinPlaceBets([]);
        if(window.innerWidth>980 && performance.navigation.type >=1 ) {
            var users=props.allBetSlip;
            var rem=props.remainingBetSlip.length<1?JSON.parse(window.localStorage.getItem('betSlip')):props.remainingBetSlip
            if(props.screenStatus) {
                users = [users, ...rem];
            } else {
                if(rem){
                    users=[...rem]
                }
            }        
        }
        if(window.innerWidth>980 && performance.navigation.type == 0 ) {
            var users=props.allBetSlip;
            var rem=props.remainingBetSlip.length<1?JSON.parse(window.localStorage.getItem('betSlip')):props.remainingBetSlip
            if(props.screenStatus) {
                if(rem) {
                    users = [users, ...rem];
                }
                
            } else {
                if(rem){
                    users=[...rem]
                }
            }
        }
        if (performance.navigation.type >= 1 && window.innerWidth<980) {
            props.remainingBetSlipData(JSON.parse(window.localStorage.getItem('betSlip')))
            users=JSON.parse(window.localStorage.getItem('betSlip'))
        } 
        if(performance.navigation.type == 0 && window.innerWidth<980) {
            var users=props.remainingBetSlip;
        }
        if(props.remainingBetSlip) {
            users=Object.values(users)
        };

        var grouped = _.reduce(users, (result, user) => {
            if(user){
                    (result[user.name] || (result[user.name] = [])).push(user);  
                    return result;
            }    
        }, {});
        var poolList=[];
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
                setRemainingBets(poolList);
                setstartSlip(true)
            }
        };

    }, [props.allBetSlip]);

    useEffect(() => {
        var users;
        props.postWinPlaceBetsQuinella([]);
        if(window.innerWidth>980 && performance.navigation.type >=1 ) {
            var users=props.allBetSlipQuinella;
            var rem=props.remainingBetSlipQuinella.length<1?
            JSON.parse(window.localStorage.getItem('betSlipQuinella')):props.remainingBetSlipQuinella
            if(props.screenStatus) {
                users = [users, ...rem];
            } else {
                if(rem){
                    users=[...rem]
                }
            }        
        }
        if(window.innerWidth>980 && performance.navigation.type == 0 ) {
            var users=props.allBetSlipQuinella;
            var rem=props.remainingBetSlipQuinella.length<1?
            JSON.parse(window.localStorage.getItem('betSlipQuinella')):props.remainingBetSlipQuinella
            if(props.screenStatusQuinella) {
                if(rem) {
                    users = [users, ...rem];
                }
            } else {
                    if(rem){
                        users=[...rem]
                    }
                }
        }
        if (performance.navigation.type >= 1 && window.innerWidth<980) {
            props.remainingBetSlipDataQuinella(JSON.parse(window.localStorage.getItem('betSlipQuinella')))
            users=JSON.parse(window.localStorage.getItem('betSlipQuinella'))
        } 
        if(performance.navigation.type == 0 && window.innerWidth<980) {
            var users=props.remainingBetSlipQuinella;
        }
        if(props.remainingBetSlipQuinella) {
            users=Object.values(users)
        };

        var grouped = _.reduce(users, (result, user) => {
            if(user){
                    (result[user.name] || (result[user.name] = [])).push(user);  
                    return result;
            }    
        }, {});
        var poolList=[];
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
                        var quinellaList=null;
                        for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                            if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                    var pos=(_.findIndex(users, {runners: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                    itemList.push(users[pos].runners)
                                    quinellaList=grouped[poolname][grouped[poolname].length-1].quinella
                                } 
                            }
                            }
                        if (itemList.length){
                            var itemPool={"name":poolname,"runners":itemList, "quinella": quinellaList }
                        }
                        if(poolFinalList){
                            poolList.push(itemPool)
                        } else {
                            poolList=itemPool
                        }
                    }     
                })
                setRemainingBetsQuienlla(poolList);
                setstartSlip(true)
            }
        };

    }, [props.allBetSlipQuinella]);

    useEffect(() => {
        var users;
        props.postWinPlaceBetsDuet([]);
        if(window.innerWidth>980 && performance.navigation.type >=1 ) {
            var users=props.allBetSlipDuet;
            var rem=props.remainingBetSlipDuet.length<1?
            JSON.parse(window.localStorage.getItem('betSlipDuet')):props.remainingBetSlipDuet
            if(props.screenStatus) {
                users = [users, ...rem];
            } else {
                if(rem){
                    users=[...rem]
                }
            }        
        }
        if(window.innerWidth>980 && performance.navigation.type == 0 ) {
            var users=props.allBetSlipDuet;
            var rem=props.remainingBetSlipDuet.length<1?
            JSON.parse(window.localStorage.getItem('betSlipDuet')):props.remainingBetSlipDuet
            if(props.screenStatusDuet) {
                if(rem) {
                    users = [users, ...rem];
                }
            } else {
                    if(rem){
                        users=[...rem]
                    }
                }
        }
        if (performance.navigation.type >= 1 && window.innerWidth<980) {
            props.remainingBetSlipDataDuet(JSON.parse(window.localStorage.getItem('betSlipDuet')))
            users=JSON.parse(window.localStorage.getItem('betSlipDuet'))
        } 
        if(performance.navigation.type == 0 && window.innerWidth<980) {
            var users=props.remainingBetSlipDuet;
        }
        if(props.remainingBetSlipDuet) {
            users=Object.values(users)
        };

        var grouped = _.reduce(users, (result, user) => {
            if(user){
                    (result[user.name] || (result[user.name] = [])).push(user);  
                    return result;
            }    
        }, {});
        var poolList=[];
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
                        var duetList=null;
                        for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                            if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                    var pos=(_.findIndex(users, {runners: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                    itemList.push(users[pos].runners)
                                    duetList=grouped[poolname][grouped[poolname].length-1].duet
                                } 
                            }
                            }
                        if (itemList.length){
                            var itemPool={"name":poolname,"runners":itemList, "duet": duetList }
                        }
                        if(poolFinalList){
                            poolList.push(itemPool)
                        } else {
                            poolList=itemPool
                        }
                    }     
                })
                setRemainingBetsDuet(poolList);
                setstartSlip(true)
            }
        };

    }, [props.allBetSlipDuet]);



    useEffect(() => {
        var users;
        props.postWinPlaceBetsFirst4([]);
        if(window.innerWidth>980 && performance.navigation.type >=1 ) {
            var users=props.allBetSlipFirst4;
            var rem=props.remainingBetSlipFirst4.length<1?
            JSON.parse(window.localStorage.getItem('betSlipFirst4')):props.remainingBetSlipFirst4
            if(props.screenStatus) {
                users = [users, ...rem];
            } else {
                if(rem){
                    users=[...rem]
                }
            }        
        }
        if(window.innerWidth>980 && performance.navigation.type == 0 ) {
            var users=props.allBetSlipFirst4;
            var rem=props.remainingBetSlipFirst4.length<1?
            JSON.parse(window.localStorage.getItem('betSlipFirst4')):props.remainingBetSlipFirst4
            if(props.screenStatusFirst4) {
                if(rem) {
                    users = [users, ...rem];
                }
            } else {
                    if(rem){
                        users=[...rem]
                    }
                }
        }
        if (performance.navigation.type >= 1 && window.innerWidth<980) {
            props.remainingBetSlipDataFirst4(JSON.parse(window.localStorage.getItem('betSlipFirst4')))
            users=JSON.parse(window.localStorage.getItem('betSlipFirst4'))
        } 
        if(performance.navigation.type == 0 && window.innerWidth<980) {
            var users=props.remainingBetSlipFirst4;
        }
        if(props.remainingBetSlipFirst4) {
            users=Object.values(users)
        };

        var grouped = _.reduce(users, (result, user) => {
            if(user){
                    (result[user.name] || (result[user.name] = [])).push(user);  
                    return result;
            }    
        }, {});
        var poolList=[];
        if(grouped) {
            if(Object.keys(grouped)){
                Object.keys(grouped).map(poolname=>{
                    if(poolname!="undefined") {
                        var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                            if(user){
                                    (result[user.name] || (result[user.name] = [])).push(user.selection1);  
                                    
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
                        var itemList1=[];
                        var first4List=null;
                        for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                            if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                    var pos=(_.findIndex(users, {selection1: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                    itemList1.push(users[pos].selection1)
                                    first4List=grouped[poolname][grouped[poolname].length-1].first4
                                } 
                            }
                        }

                        var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                            if(user){
                                    (result[user.name] || (result[user.name] = [])).push(user.selection2);  
                                    
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
                        var itemList2=[];
                        var first4List=null;
                        for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                            if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                    var pos=(_.findIndex(users, {selection2: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                    itemList2.push(users[pos].selection2)
                                    first4List=grouped[poolname][grouped[poolname].length-1].first4
                                } 
                            }
                        }
                          


                        var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                            if(user){
                                    (result[user.name] || (result[user.name] = [])).push(user.selection3);  
                                    
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
                        var itemList3=[];
                        var first4List=null;
                        for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                            if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                    var pos=(_.findIndex(users, {selection3: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                    itemList3.push(users[pos].selection3)
                                    first4List=grouped[poolname][grouped[poolname].length-1].first4
                                } 
                            }
                        }     


                        var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                            if(user){
                                    (result[user.name] || (result[user.name] = [])).push(user.selection4);  
                                    
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
                        var itemList4=[];
                        var first4List=null;
                        for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                            if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                    var pos=(_.findIndex(users, {selection4: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                    itemList4.push(users[pos].selection4)
                                    first4List=grouped[poolname][grouped[poolname].length-1].first4
                                } 
                            }
                        }     



                        if (itemList1.length || itemList2.length ||itemList3.length ||itemList4.length){
                            var itemPool={"name":poolname,"selection1":itemList1,"selection2":itemList2,"selection3":itemList3,"selection4":itemList4,"first4": first4List}
                        }
                        if(poolFinalList){
                            poolList.push(itemPool)
                        } else {
                            poolList=itemPool
                        }
                    }     
                })
                setRemainingBetsFirst4(poolList)
            }
        };

    }, [props.allBetSlipFirst4]);



    useEffect(() => {
        var users;
        props.postWinPlaceBetsTrifecta([]);
        if(window.innerWidth>980 && performance.navigation.type >=1 ) {
            var users=props.allBetSlipTrifecta;
            var rem=props.remainingBetSlipTrifecta.length<1?
            JSON.parse(window.localStorage.getItem('betSlipTrifecta')):props.remainingBetSlipTrifecta
            if(props.screenStatus) {
                users = [users, ...rem];
            } else {
                if(rem){
                    users=[...rem]
                }
            }        
        }
        if(window.innerWidth>980 && performance.navigation.type == 0 ) {

            var users=props.allBetSlipTrifecta;
            var rem=props.remainingBetSlipTrifecta.length<1?
            JSON.parse(window.localStorage.getItem('betSlipTrifecta')):props.remainingBetSlipTrifecta
            if(props.screenStatusTrifecta) {
                if(rem) {
                    users = [users, ...rem];
                }
            } else {
                    if(rem){
                        users=[...rem]
                    }
                }
        }
        if (performance.navigation.type >= 1 && window.innerWidth<980) {
            props.remainingBetSlipDataTrifecta(JSON.parse(window.localStorage.getItem('betSlipTrifecta')))
            users=JSON.parse(window.localStorage.getItem('betSlipTrifecta'))
        } 
        if(performance.navigation.type == 0 && window.innerWidth<980) {
            var users=props.remainingBetSlipTrifecta;
        }
        if(props.remainingBetSlipTrifecta) {
            users=Object.values(users)
        };

        var grouped = _.reduce(users, (result, user) => {
            if(user){
                    (result[user.name] || (result[user.name] = [])).push(user);  
                    return result;
            }    
        }, {});
        var poolList=[];

        if(grouped) {
            if(Object.keys(grouped)){
                Object.keys(grouped).map(poolname=>{
                    if(poolname!="undefined") {
                        var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                            if(user){
                                    (result[user.name] || (result[user.name] = [])).push(user.selection1);  
                                    
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
                        var itemList1=[];
                        var trifectaList=null;
                        for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                            if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                    var pos=(_.findIndex(users, {selection1: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                    itemList1.push(users[pos].selection1)
                                    trifectaList=grouped[poolname][grouped[poolname].length-1].trifecta
                                } 
                            }
                        }

                        var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                            if(user){
                                    (result[user.name] || (result[user.name] = [])).push(user.selection2);  
                                    
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
                        var itemList2=[];
                        var trifectaList=null;
                        for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                            if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                    var pos=(_.findIndex(users, {selection2: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                    itemList2.push(users[pos].selection2)
                                    trifectaList=grouped[poolname][grouped[poolname].length-1].trifecta
                                } 
                            }
                        }
                          


                        var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                            if(user){
                                    (result[user.name] || (result[user.name] = [])).push(user.selection3);  
                                    
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
                        var itemList3=[];
                        var trifectaList=null;
                        for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                            if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                    var pos=(_.findIndex(users, {selection3: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                    itemList3.push(users[pos].selection3)
                                    trifectaList=grouped[poolname][grouped[poolname].length-1].trifecta
                                } 
                            }
                        }     

                        if (itemList1.length || itemList2.length ||itemList3.length ){
                            var itemPool={"name":poolname,"selection1":itemList1,"selection2":itemList2,"selection3":itemList3,"trifecta": trifectaList}
                        }
                        if(poolFinalList){
                            poolList.push(itemPool)
                        } else {
                            poolList=itemPool
                        }
                    }     
                })
                setRemainingBetsTrifecta(poolList)
            }
        };

    }, [props.allBetSlipTrifecta]);

    useEffect(() => {
        var users;
        props.postWinPlaceBetsExacta([]);
        if(window.innerWidth>980 && performance.navigation.type >=1 ) {
            var users=props.allBetSlipExacta;
            var rem=props.remainingBetSlipExacta.length<1?
            JSON.parse(window.localStorage.getItem('betSlipExacta')):props.remainingBetSlipExacta
            if(props.screenStatus) {
                users = [users, ...rem];
            } else {
                if(rem){
                    users=[...rem]
                }
            }        
        }
        if(window.innerWidth>980 && performance.navigation.type == 0 ) {
            var users=props.allBetSlipExacta;
            var rem=props.remainingBetSlipExacta.length<1?
            JSON.parse(window.localStorage.getItem('betSlipExacta')):props.remainingBetSlipExacta
            if(props.screenStatusExacta) {
                if(rem) {
                    users = [users, ...rem];
                }
            } else {
                    if(rem){
                        users=[...rem]
                    }
                }
        }

        if (performance.navigation.type >= 1 && window.innerWidth<980) {
            props.remainingBetSlipDataExacta(JSON.parse(window.localStorage.getItem('betSlipExacta')))
            users=JSON.parse(window.localStorage.getItem('betSlipExacta'))
        } 
        if(performance.navigation.type == 0 && window.innerWidth<980) {
            var users=props.remainingBetSlipExacta;
        }
        if(props.remainingBetSlipExacta) {
            users=Object.values(users)
        };

        var grouped = _.reduce(users, (result, user) => {
            if(user){
                    (result[user.name] || (result[user.name] = [])).push(user);  
                    return result;
            }    
        }, {});
        var poolList=[];

        if(grouped) {
            if(Object.keys(grouped)){
                Object.keys(grouped).map(poolname=>{
                    if(poolname!="undefined") {
                        var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                            if(user){
                                    (result[user.name] || (result[user.name] = [])).push(user.selection1);  
                                    
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
                        var itemList1=[];
                        var exactaList=null;
                        for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                            if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                    var pos=(_.findIndex(users, {selection1: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                    itemList1.push(users[pos].selection1)
                                    exactaList=grouped[poolname][grouped[poolname].length-1].exacta
                                } 
                            }
                        }

                        var groupedRunners = _.reduce(grouped[poolname], (result, user) => {
                            if(user){
                                    (result[user.name] || (result[user.name] = [])).push(user.selection2);  
                                    
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
                        var itemList2=[];
                        var exactaList=null;
                        for (var i=0;i<Object.keys(groupedRunnersNo).length;i=i+1){
                            if(Object.values(groupedRunnersNo)[i]%2!=0) {
                                if(isInteger(parseInt(Object.keys(groupedRunnersNo)[i]))) {
                                    var pos=(_.findIndex(users, {selection2: parseInt(Object.keys(groupedRunnersNo)[i])}));      
                                    itemList2.push(users[pos].selection2)
                                    exactaList=grouped[poolname][grouped[poolname].length-1].exacta
                                } 
                            }
                        }
                          


                        if (itemList1.length || itemList2.length  ){
                            var itemPool={"name":poolname,"selection1":itemList1,"selection2":itemList2,"exacta": exactaList}
                        }
                        if(poolFinalList){
                            poolList.push(itemPool)
                        } else {
                            poolList=itemPool
                        }
                    }     
                })
                setRemainingBetsExacta(poolList)
            }
        };

    }, [props.allBetSlipExacta]);




    const deleteSingleBetfun=(item)=>{
            if (RemainingBets.length==1 && !RemainingBetsQuienlla[0]  && !RemainingBetsDuet[0] && !RemainingBetsFirst4[0] && !RemainingBetsExacta[0] &&!RemainingBetsTrifecta[0]){
                setstartSlip(false)
                setRemainingBets([])
                localStorage.setItem('betSlip',JSON.stringify([]));
            }
            var obje=RemainingBets.filter(e1=> { return e1 != item })
            setRemainingBets(obje)
            localStorage.setItem('betSlip',JSON.stringify(obje))
            props.deleteSingleBet([])
            if(item.runners.length>1) {
                item.runners.map(runnnerInd=>{
                    setdeletedBets(oldArray => [...oldArray, {"name":item.name,"runners":parseInt(runnnerInd),"win": item.win ,"place": item.place}]); 
                })
            } else {
                setdeletedBets(oldArray => [...oldArray, {"name":item.name,"runners":parseInt(item.runners),"win": item.win ,"place": item.place}]);
            }
    };
    const deleteSingleBetfunQuinella=(item)=>{
        if (RemainingBetsQuienlla.length==1  && !RemainingBets[0] && !RemainingBetsDuet[0] && !RemainingBetsFirst4[0] && !RemainingBetsExacta[0]  &&!RemainingBetsTrifecta[0]){
            setstartSlip(false)
            setRemainingBetsQuienlla([])
            localStorage.setItem('betSlipQuinella',JSON.stringify([]));
        }
        var obje=RemainingBetsQuienlla.filter(e1=> { return e1 != item })
        setRemainingBetsQuienlla(obje)
        localStorage.setItem('betSlipQuinella',JSON.stringify(obje))
        props.deleteSingleBetQuinella([])
        if(item.runners.length>1) {
            item.runners.map(runnnerInd=>{
                setdeletedBets(oldArray => [...oldArray, {"name":item.name,"runners":parseInt(runnnerInd),"win": item.win ,"place": item.place}]); 
            })
        } else {
            setdeletedBets(oldArray => [...oldArray, {"name":item.name,"runners":parseInt(item.runners),"win": item.win ,"place": item.place}]);
        }
    };
    const deleteSingleBetfunDuet=(item)=>{
        if (RemainingBetsDuet.length==1  && !RemainingBets[0] && !RemainingBetsQuienlla[0] && !RemainingBetsFirst4[0] && !RemainingBetsExacta[0]  &&!RemainingBetsTrifecta[0]){
            setstartSlip(false)
            setRemainingBetsDuet([])
            localStorage.setItem('betSlipDuet',JSON.stringify([]));
        }
        var obje=RemainingBetsDuet.filter(e1=> { return e1 != item })
        setRemainingBetsDuet(obje)
        localStorage.setItem('betSlipDuet',JSON.stringify(obje))
        props.deleteSingleBetDuet([])
    };
    const deleteSingleBetfunFirst4=(item)=>{
        if (RemainingBetsFirst4.length==1  && !RemainingBets[0] && !RemainingBetsQuienlla[0]  && !RemainingBetsDuet[0] && !RemainingBetsExacta[0]  &&!RemainingBetsTrifecta[0]){
            setstartSlip(false)
            setRemainingBetsFirst4([])
            localStorage.setItem('betSlipFirst4',JSON.stringify([]));
        }
        var obje=RemainingBetsFirst4.filter(e1=> { return e1 != item })
        setRemainingBetsFirst4(obje)
        localStorage.setItem('betSlipFirst4',JSON.stringify(obje))
        props.deleteSingleBetFirst4([])
    };

    const deleteSingleBetfunTrifecta=(item)=>{
        if (RemainingBetsTrifecta.length==1  && !RemainingBets[0] && !RemainingBetsQuienlla[0]  && !RemainingBetsDuet[0] && !RemainingBetsExacta[0]  &&!RemainingBetsFirst4[0]){
            setstartSlip(false)
            setRemainingBetsTrifecta([])
            localStorage.setItem('betSlipTrifecta',JSON.stringify([]));
        }
        var obje=RemainingBetsTrifecta.filter(e1=> { return e1 != item })
        setRemainingBetsTrifecta(obje)
        localStorage.setItem('betSlipTrifecta',JSON.stringify(obje))
        props.deleteSingleBetTrifecta([])
    };

    const deleteSingleBetfunExacta=(item)=>{
        if (RemainingBetsTrifecta.length==1  && !RemainingBets[0] && !RemainingBetsQuienlla[0]  && !RemainingBetsDuet[0] && !RemainingBetsTrifecta[0]  &&!RemainingBetsFirst4[0]){
            setstartSlip(false)
            setRemainingBetsExacta([])
            localStorage.setItem('betSlipExacta',JSON.stringify([]));
        }
        var obje=RemainingBetsExacta.filter(e1=> { return e1 != item })
        setRemainingBetsExacta(obje)
        localStorage.setItem('betSlipExacta',JSON.stringify(obje))
        props.deleteSingleBetExacta([])
    };

    const handleDeleteAll=()=>{
            if (RemainingBets.length==1){
                setstartSlip(false)
                setRemainingBets([])
                localStorage.setItem('betSlip',JSON.stringify([]))
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
            setRemainingBets([]);
            setRemainingBetsQuienlla([]);
            setRemainingBetsDuet([]);
            setRemainingBetsFirst4([]);
            setRemainingBetsQuienlla([]);
            setRemainingBetsTrifecta([]);
            setRemainingBetsExacta([]);
            localStorage.setItem('betSlip',JSON.stringify([]));
            localStorage.setItem('betSlipQuinella',JSON.stringify([]));
            localStorage.setItem('betSlipDuet',JSON.stringify([]));
            localStorage.setItem('betSlipFirst4',JSON.stringify([]));
            localStorage.setItem('betSlipTrifecta',JSON.stringify([]));
            localStorage.setItem('betSlipExacta',JSON.stringify([]));
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
        if (RemainingBetsQuienlla) {
            setfinalRemainingBetsQuienlla([])
            RemainingBetsQuienlla.map(items=>{
                if(items) {
                    if(items.runners.length>1) {
                        items.runners.map(runnnerInd=>{
                            setfinalRemainingBetsQuienlla(oldArray => [...oldArray, 
                                {"name":items.name,"runners":runnnerInd,
                                "quinella": items.quinella }]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsQuienlla(oldArray => [...oldArray,
                            {"name":items.name,"runners":items.runners[0],
                            "quinella": items.quinella }])
                    }
                }
            })
        }

    }, [RemainingBetsQuienlla]);

    useEffect(() => {
        if (RemainingBetsDuet) {
            setfinalRemainingBetsDuet([])
            RemainingBetsDuet.map(items=>{
                if(items) {
                    if(items.runners.length>1) {
                        items.runners.map(runnnerInd=>{
                            setfinalRemainingBetsDuet(oldArray => [...oldArray, 
                                {"name":items.name,"runners":runnnerInd,
                                "duet": items.duet }]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsDuet(oldArray => [...oldArray,
                            {"name":items.name,"runners":items.runners[0],
                            "duet": items.duet }])
                    }
                }
            })
        }

    }, [RemainingBetsDuet]);

    
    useEffect(() => {
        if (RemainingBetsFirst4 && window.innerWidth) {
            setfinalRemainingBetsFirst4([])
            RemainingBetsFirst4.map(items=>{
                if(items) {
                    if(items.selection1.length>1) {
                        items.selection1.map(runnnerInd=>{
                            setfinalRemainingBetsFirst4(oldArray => [...oldArray, 
                                {"name":items.name,"selection1":runnnerInd,
                                "first4": items.first4}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsFirst4(oldArray => [...oldArray,
                            {"name":items.name,"selection1":items.selection1[0],
                            "first4": items.first4}])
                    }
                }
                if(items) {
                    if(items.selection2.length>1) {
                        items.selection2.map(runnnerInd=>{
                            setfinalRemainingBetsFirst4(oldArray => [...oldArray, 
                                {"name":items.name,"selection2":runnnerInd,
                                "first4": items.first4}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsFirst4(oldArray => [...oldArray,
                            {"name":items.name,"selection2":items.selection2[0],
                            "first4": items.first4}])
                    }
                }
                if(items) {
                    if(items.selection3.length>1) {
                        items.selection3.map(runnnerInd=>{
                            setfinalRemainingBetsFirst4(oldArray => [...oldArray, 
                                {"name":items.name,"selection3":runnnerInd,
                                "first4": items.first4}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsFirst4(oldArray => [...oldArray,
                            {"name":items.name,"selection3":items.selection3[0],
                            "first4": items.first4}])
                    }
                }
                if(items) {
                    if(items.selection4.length>1) {
                        items.selection4.map(runnnerInd=>{
                            setfinalRemainingBetsFirst4(oldArray => [...oldArray, 
                                {"name":items.name,"selection4":runnnerInd,
                                "first4": items.first4}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsFirst4(oldArray => [...oldArray,
                            {"name":items.name,"selection4":items.selection4[0],
                            "first4": items.first4}])
                    }
                }
            })
        }
    }, [RemainingBetsFirst4]);


    useEffect(() => {
        if (RemainingBetsTrifecta && window.innerWidth) {
            setfinalRemainingBetsTrifecta([])
            RemainingBetsTrifecta.map(items=>{
                if(items) {
                    if(items.selection1.length>1) {
                        items.selection1.map(runnnerInd=>{
                            setfinalRemainingBetsTrifecta(oldArray => [...oldArray, 
                                {"name":items.name,"selection1":runnnerInd,
                                "trifecta": items.trifecta}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsTrifecta(oldArray => [...oldArray,
                            {"name":items.name,"selection1":items.selection1[0],
                            "trifecta": items.trifecta}])
                    }
                }
                if(items) {
                    if(items.selection2.length>1) {
                        items.selection2.map(runnnerInd=>{
                            setfinalRemainingBetsTrifecta(oldArray => [...oldArray, 
                                {"name":items.name,"selection2":runnnerInd,
                                "trifecta": items.trifecta}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsTrifecta(oldArray => [...oldArray,
                            {"name":items.name,"selection2":items.selection2[0],
                            "trifecta": items.trifecta}])
                    }
                }
                if(items) {
                    if(items.selection3.length>1) {
                        items.selection3.map(runnnerInd=>{
                            setfinalRemainingBetsTrifecta(oldArray => [...oldArray, 
                                {"name":items.name,"selection3":runnnerInd,
                                "trifecta": items.trifecta}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsTrifecta(oldArray => [...oldArray,
                            {"name":items.name,"selection3":items.selection3[0],
                            "trifecta": items.trifecta}])
                    }
                }
            })
        }
    }, [RemainingBetsTrifecta]);

    useEffect(() => {
        if (RemainingBetsExacta && window.innerWidth) {
            setfinalRemainingBetsExacta([])
            RemainingBetsExacta.map(items=>{
                if(items) {
                    if(items.selection1.length>1) {
                        items.selection1.map(runnnerInd=>{
                            setfinalRemainingBetsExacta(oldArray => [...oldArray, 
                                {"name":items.name,"selection1":runnnerInd,
                                "exacta": items.exacta}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsExacta(oldArray => [...oldArray,
                            {"name":items.name,"selection1":items.selection1[0],
                            "exacta": items.exacta}])
                    }
                }
                if(items) {
                    if(items.selection2.length>1) {
                        items.selection2.map(runnnerInd=>{
                            setfinalRemainingBetsExacta(oldArray => [...oldArray, 
                                {"name":items.name,"selection2":runnnerInd,
                                "exacta": items.exacta}]);
                        })
                    } 
                    else 
                    {   
                        setfinalRemainingBetsExacta(oldArray => [...oldArray,
                            {"name":items.name,"selection2":items.selection2[0],
                            "exacta": items.exacta}])
                    }
                }
            })
        }
    }, [RemainingBetsExacta]);


    useEffect(() => {
        if (finalRemainingBets) {
            setplaceWinPlaceBetList([]);
            if(window.innerWidth) {
                localStorage.setItem('betSlip',JSON.stringify(finalRemainingBets))
                props.remainingBetSlipData(finalRemainingBets)
            }
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
                                "runners":items.runners
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
                                "runners":items.runners
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
        if (finalRemainingBetsQuienlla) {
            setplaceWinPlaceBetListQuinella([]);
            if(window.innerWidth) {
                localStorage.setItem('betSlipQuinella',JSON.stringify(finalRemainingBetsQuienlla))
                props.remainingBetSlipDataQuinella(finalRemainingBetsQuienlla)
            }
            finalRemainingBetsQuienlla.map(items=>{
                if(items) {
                    if( items.quinella>0)  {
                        setplaceWinPlaceBetListQuinella(oldArray => [...oldArray,
                            {
                                "bet_fh": "tk_integ_"+Date.now()+"_"+items.name,
                                "bet_pool_fh": items.name+'q',
                                "stake_cents": items.quinella,
                                "combinations":
                                {
                                "runners":items.runners
                                }
                                
                            }                          
                        ])
                        
                    }
                }
            })
        }
    }, [finalRemainingBetsQuienlla]);

    useEffect(() => {
        if (finalRemainingBetsDuet) {
            setplaceWinPlaceBetListDuet([]);
            if(window.innerWidth) {
                localStorage.setItem('betSlipDuet',JSON.stringify(finalRemainingBetsDuet))
                props.remainingBetSlipDataDuet(finalRemainingBetsDuet)
            }
            RemainingBetsDuet.map(items=>{
                if(items) {
                    if( items.duet>0)  {
                        setplaceWinPlaceBetListDuet(oldArray => [...oldArray,
                            {
                                "bet_fh": "tk_integ_"+Date.now()+"_"+items.name,
                                "bet_pool_fh": items.name+'d',
                                "stake_cents": items.duet,
                                "combinations":{
                                "runners":items.runners
                                }
                            }                          
                        ])
                        
                    }
                }
            })
        }
    }, [finalRemainingBetsDuet]);

    useEffect(() => {
        if (finalRemainingBetsFirst4) {
            setplaceWinPlaceBetListFirst4([]);
            if(window.innerWidth) {
                localStorage.setItem('betSlipFirst4',JSON.stringify(finalRemainingBetsFirst4))
                props.remainingBetSlipDataFirst4(finalRemainingBetsFirst4)
            }
            RemainingBetsFirst4.map(items=>{
                console.log(items)
                if(items) {
                    if( items.first4>0)  {
                        setplaceWinPlaceBetListFirst4(oldArray => [...oldArray,
                            {
                                "bet_fh": "tk_integ_"+Date.now()+"_"+items.name,
                                "bet_pool_fh": items.name+'f',
                                "stake_cents": items.first4,
                                "combinations":[
                                
                                    {
                                        "place":1,
                                        "runners":items.selection1,
                                    },{
                                        "place":2,
                                        "runners":items.selection2,                      
                                    },{
                                        "place":3,
                                        "runners":items.selection3,
                                    },{
                                        "place":4,
                                        "runners":items.selection4,
                                    }

                                ]
                            }                          
                        ])
                        
                    }
                }
            })
        }
    }, [finalRemainingBetsFirst4]);



    useEffect(() => {
        if (finalRemainingBetsTrifecta) {
            setplaceWinPlaceBetListTrifecta([]);
            if(window.innerWidth) {
                localStorage.setItem('betSlipTrifecta',JSON.stringify(finalRemainingBetsTrifecta))
                props.remainingBetSlipDataTrifecta(finalRemainingBetsTrifecta)
            }
            RemainingBetsTrifecta.map(items=>{
                if(items) {
                    if( items.trifecta>0)  {
                        setplaceWinPlaceBetListTrifecta(oldArray => [...oldArray,
                            {
                                "bet_fh": "tk_integ_"+Date.now()+"_"+items.name,
                                "bet_pool_fh": items.name+'t',
                                "stake_cents": items.trifecta,
                                "combinations":[
                                
                                    {
                                        "place":1,
                                        "runners":items.selection1,
                                    },{
                                        "place":2,
                                        "runners":items.selection2,                      
                                    },{
                                        "place":3,
                                        "runners":items.selection3,
                                    }

                                ]
                            }                          
                        ])
                        
                    }
                }
            })
        }
    }, [finalRemainingBetsTrifecta]);


    useEffect(() => {
        if (finalRemainingBetsExacta) {
            setplaceWinPlaceBetListExacta([]);
            if(window.innerWidth) {
                localStorage.setItem('betSlipExacta',JSON.stringify(finalRemainingBetsExacta))
                props.remainingBetSlipDataExacta(finalRemainingBetsExacta)
            }
            RemainingBetsExacta.map(items=>{
                if(items) {
                    if( items.exacta>0)  {
                        setplaceWinPlaceBetListExacta(oldArray => [...oldArray,
                            {
                                "bet_fh": "tk_integ_"+Date.now()+"_"+items.name,
                                "bet_pool_fh": items.name+'e',
                                "stake_cents": items.exacta,
                                "combinations":[
                                
                                    {
                                        "place":1,
                                        "runners":items.selection1,
                                    },{
                                        "place":2,
                                        "runners":items.selection2,                      
                                    }

                                ]
                            }                          
                        ])
                        
                    }
                }
            })
        }
    }, [finalRemainingBetsExacta]);


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

    const betSlipPlaceInputQuinella=(item)=>{
        var pos=(_.findIndex(RemainingBetsQuienlla, item));
        const updateFieldChanged = (e,item) => {
            e.preventDefault();
            var pos=(_.findIndex(RemainingBetsQuienlla, item))
            var newArr = [...RemainingBetsQuienlla]; 
            newArr[pos][e.target.name] = parseInt(e.target.value); 
            newArr[pos][e.target.name]=newArr[pos][e.target.name]
            setRemainingBetsQuienlla(newArr); 
        }
        return(
            <>
                <form className="common-form bet-card-form ng-valid ng-dirty ng-valid-parse">
                    <ul className="">
                        <li className="">
                            <div className="bet-card-info">
                                <label className="bet-info-value">
                                    Quinella
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
                                                    settypeBet('quinella')
                                                }} 
                                                key={RemainingBetsQuienlla[pos]['name']+'quinella'}
                                                name='quinella'
                                                placeholder={null}
                                                value={RemainingBetsQuienlla[pos]['quienlla']}
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
                                <bet-cost className="">
                                    <label className="bet-info-label">
                                        Bet Cost
                                    </label>
                                    <span className="bet-info-value">
                                        ${(!(RemainingBetsQuienlla[pos]['quinella']))?0:
                                        (RemainingBetsQuienlla[pos]['quinella'])
                                        }
                                    </span>
                                </bet-cost>
                            </div>
                        </li>
                    </ul>
                </form>
            </>
        )
    };

    const betSlipPlaceInputDuet=(item)=>{
        var pos=(_.findIndex(RemainingBetsDuet, item));
        const updateFieldChanged = (e,item) => {
            e.preventDefault();
            var pos=(_.findIndex(RemainingBetsDuet, item))
            var newArr = [...RemainingBetsDuet]; 
            newArr[pos][e.target.name] = parseInt(e.target.value); 
            newArr[pos][e.target.name]=newArr[pos][e.target.name]
            setRemainingBetsDuet(newArr); 
        }
        return(
            <>
                <form className="common-form bet-card-form ng-valid ng-dirty ng-valid-parse">
                    <ul className="">
                        <li className="">
                            <div className="bet-card-info">
                                <label className="bet-info-value">
                                    Duet
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
                                                    settypeBet('duet')
                                                }} 
                                                key={RemainingBetsDuet[pos]['name']+'duet'}
                                                name='duet'
                                                placeholder={null}
                                                value={RemainingBetsDuet[pos]['duet']}
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
                                <bet-cost className="">
                                    <label className="bet-info-label">
                                        Bet Cost
                                    </label>
                                    <span className="bet-info-value">
                                        ${(!(RemainingBetsDuet[pos]['duet']))?0:
                                        (RemainingBetsDuet[pos]['duet'])
                                        }
                                    </span>
                                </bet-cost>
                            </div>
                        </li>
                    </ul>
                </form>
            </>
        )
    };

    const betSlipPlaceInputFirst4=(item)=>{
        var pos=(_.findIndex(RemainingBetsFirst4, item));
        const updateFieldChanged = (e,item) => {
            e.preventDefault();
            var pos=(_.findIndex(RemainingBetsFirst4, item))
            var newArr = [...RemainingBetsFirst4]; 
            newArr[pos][e.target.name] = parseInt(e.target.value); 
            newArr[pos][e.target.name]=newArr[pos][e.target.name]
            setRemainingBetsFirst4(newArr); 
        }
        return(
            <>
                <form className="common-form bet-card-form ng-valid ng-dirty ng-valid-parse">
                    <ul className="">
                        <li className="">
                            <div className="bet-card-info">
                                <label className="bet-info-value">
                                    First4
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
                                                    settypeBet('first4')
                                                }} 
                                                key={RemainingBetsFirst4[pos]['name']+'first4'}
                                                name='first4'
                                                placeholder={null}
                                                value={RemainingBetsFirst4[pos]['first4']}
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
                                <bet-cost className="">
                                    <label className="bet-info-label">
                                        Bet Cost
                                    </label>
                                    <span className="bet-info-value">
                                        ${(!(RemainingBetsFirst4[pos]['first4']))?0:
                                        (RemainingBetsFirst4[pos]['first4'])
                                        }
                                    </span>
                                </bet-cost>
                            </div>
                        </li>
                    </ul>
                </form>
            </>
        )
    };



    const betSlipPlaceInputTrifecta=(item)=>{
        var pos=(_.findIndex(RemainingBetsTrifecta, item));
        const updateFieldChanged = (e,item) => {
            e.preventDefault();
            var pos=(_.findIndex(RemainingBetsTrifecta, item))
            var newArr = [...RemainingBetsTrifecta]; 
            newArr[pos][e.target.name] = parseInt(e.target.value); 
            newArr[pos][e.target.name]=newArr[pos][e.target.name]
            setRemainingBetsTrifecta(newArr); 
        }
        return(
            <>
                <form className="common-form bet-card-form ng-valid ng-dirty ng-valid-parse">
                    <ul className="">
                        <li className="">
                            <div className="bet-card-info">
                                <label className="bet-info-value">
                                    Trifecta
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
                                                    settypeBet('trifecta')
                                                }} 
                                                key={RemainingBetsTrifecta[pos]['name']+'trifecta'}
                                                name='trifecta'
                                                placeholder={null}
                                                value={RemainingBetsTrifecta[pos]['trifecta']}
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
                                <bet-cost className="">
                                    <label className="bet-info-label">
                                        Bet Cost
                                    </label>
                                    <span className="bet-info-value">
                                        ${(!(RemainingBetsTrifecta[pos]['trifecta']))?0:
                                        (RemainingBetsTrifecta[pos]['trifecta'])
                                        }
                                    </span>
                                </bet-cost>
                            </div>
                        </li>
                    </ul>
                </form>
            </>
        )
    };

    const betSlipPlaceInputExacta=(item)=>{
        var pos=(_.findIndex(RemainingBetsExacta, item));
        const updateFieldChanged = (e,item) => {
            e.preventDefault();
            var pos=(_.findIndex(RemainingBetsExacta, item))
            var newArr = [...RemainingBetsExacta]; 
            newArr[pos][e.target.name] = parseInt(e.target.value); 
            newArr[pos][e.target.name]=newArr[pos][e.target.name]
            setRemainingBetsExacta(newArr); 
        }
        return(
            <>
                <form className="common-form bet-card-form ng-valid ng-dirty ng-valid-parse">
                    <ul className="">
                        <li className="">
                            <div className="bet-card-info">
                                <label className="bet-info-value">
                                    Exacta
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
                                                    settypeBet('exacta')
                                                }} 
                                                key={RemainingBetsExacta[pos]['name']+'exacta'}
                                                name='exacta'
                                                placeholder={null}
                                                value={RemainingBetsExacta[pos]['exacta']}
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
                                <bet-cost className="">
                                    <label className="bet-info-label">
                                        Bet Cost
                                    </label>
                                    <span className="bet-info-value">
                                        ${(!(RemainingBetsExacta[pos]['exacta']))?0:
                                        (RemainingBetsExacta[pos]['exacta'])
                                        }
                                    </span>
                                </bet-cost>
                            </div>
                        </li>
                    </ul>
                </form>
            </>
        )
    };


    const betSlipBetDetail =()=>{
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
                                            <p className="bet-status">
                                                {item.win +item.place ==0?"Incomplete Bet":""}
                                            </p>                                           
                                            <button className="bet-card-remove">
                                                <i onClick={()=>{
                                                            props.deleteSingleBet(item)
                                                            {deleteSingleBetfun(item)}                                                           
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
    const betSlipBetDetailQuinella =()=>{
        return(
            <>
            {RemainingBetsQuienlla?(startSlip)?RemainingBetsQuienlla.map(item=>{
                return(
                    item?item.name?
                        <div className="card">
                        <div className="">
                            <parimutuel className="">
                                <section className="bet-card">
                                    <header className="bet-card-header">
                                        <h1 className="bet-card-title">
                                            Quinella
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
                                        {betSlipPlaceInputQuinella(item)}
                                    </div>
                                    <footer className="bet-card-footer">
                                        <div className="bet-card-footer-actions">
                                            <p className="bet-status">
                                                {item.quinella==0 || !item.quinella || item.runners.length<2?"Incomplete Bet":""}
                                            </p>                                           
                                            <button className="bet-card-remove">
                                                <i onClick={()=>{props.deleteSingleBetQuinella(item)
                                                            {deleteSingleBetfunQuinella(item)}
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

    const betSlipBetDetailDuet =()=>{
        return(
            <>
            {RemainingBetsDuet?(startSlip)?RemainingBetsDuet.map(item=>{
                return(
                    item?item.name?
                        <div className="card">
                        <div className="">
                            <parimutuel className="">
                                <section className="bet-card">
                                    <header className="bet-card-header">
                                        <h1 className="bet-card-title">
                                            Duet
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
                                        {betSlipPlaceInputDuet(item)}
                                    </div>
                                    <footer className="bet-card-footer">
                                        <div className="bet-card-footer-actions">
                                            <p className="bet-status">
                                                {item.duet==0 || !item.duet || item.runners.length<2?"Incomplete Bet":""}
                                            </p>                                           
                                            <button className="bet-card-remove">
                                                <i onClick={()=>{
                                                            props.deleteSingleBetDuet(item)
                                                            {deleteSingleBetfunDuet(item)}
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

    const betSlipBetDetailFirst4 =()=>{
        return(
            <>
            {RemainingBetsFirst4?(startSlip)?RemainingBetsFirst4.map(item=>{
                return(
                    item?item.name?
                        <div className="card">
                        <div className="">
                            <parimutuel className="">
                                <section className="bet-card">
                                    <header className="bet-card-header">
                                        <h1 className="bet-card-title">
                                            First4
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
                                                        Selection1
                                                    </p>
                                                    <span className="bet-card-selection">
                                                        {item.selection1.map(no=>{
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
                                                <li>
                                                    <p className="bet-card-label">
                                                        Selection2
                                                    </p>
                                                    <span className="bet-card-selection">
                                                        {item.selection2.map(no=>{
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
                                                <li>
                                                    <p className="bet-card-label">
                                                        Selection3
                                                    </p>
                                                    <span className="bet-card-selection">
                                                        {item.selection3.map(no=>{
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
                                                <li>
                                                    <p className="bet-card-label">
                                                        Selection4
                                                    </p>
                                                    <span className="bet-card-selection">
                                                        {item.selection4.map(no=>{
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
                                        {betSlipPlaceInputFirst4(item)}
                                    </div>
                                    <footer className="bet-card-footer">
                                        <div className="bet-card-footer-actions">
                                            <p className="bet-status">
                                                {item.first4==0 || !item.first4 || (item.selection1.length<1 || 
                                                item.selection2.length<1 || item.selection3.length<1 ||
                                                item.selection4.length<1 )
                                                ?"Incomplete Bet":""}
                                            </p>                                           
                                            <button className="bet-card-remove">
                                                <i onClick={()=>{
                                                            props.deleteSingleBet(item)
                                                            {deleteSingleBetfunFirst4(item)}  
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


    const betSlipBetDetailTrifecta =()=>{
        return(
            <>
            {RemainingBetsTrifecta?(startSlip)?RemainingBetsTrifecta.map(item=>{
                return(
                    item?item.name?
                        <div className="card">
                        <div className="">
                            <parimutuel className="">
                                <section className="bet-card">
                                    <header className="bet-card-header">
                                        <h1 className="bet-card-title">
                                            Trifecta
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
                                                        Selection1
                                                    </p>
                                                    <span className="bet-card-selection">
                                                        {item.selection1.map(no=>{
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
                                                <li>
                                                    <p className="bet-card-label">
                                                        Selection2
                                                    </p>
                                                    <span className="bet-card-selection">
                                                        {item.selection2.map(no=>{
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
                                                <li>
                                                    <p className="bet-card-label">
                                                        Selection3
                                                    </p>
                                                    <span className="bet-card-selection">
                                                        {item.selection3.map(no=>{
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
                                        {betSlipPlaceInputTrifecta(item)}
                                    </div>
                                    <footer className="bet-card-footer">
                                        <div className="bet-card-footer-actions">
                                            <p className="bet-status">
                                                {item.trifecta==0 || !item.trifecta || (item.selection1.length<1 || 
                                                item.selection2.length<1 || item.selection3.length<1 )
                                                ?"Incomplete Bet":""}
                                            </p>                                           
                                            <button className="bet-card-remove">
                                                <i onClick={()=>{
                                                            props.deleteSingleBet(item)
                                                            {deleteSingleBetfunTrifecta(item)}  
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

    const betSlipBetDetailExacta =()=>{
        return(
            <>
            {RemainingBetsExacta?(startSlip)?RemainingBetsExacta.map(item=>{
                return(
                    item?item.name?
                        <div className="card">
                        <div className="">
                            <parimutuel className="">
                                <section className="bet-card">
                                    <header className="bet-card-header">
                                        <h1 className="bet-card-title">
                                            Exacta
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
                                                        Selection1
                                                    </p>
                                                    <span className="bet-card-selection">
                                                        {item.selection1.map(no=>{
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
                                                <li>
                                                    <p className="bet-card-label">
                                                        Selection2
                                                    </p>
                                                    <span className="bet-card-selection">
                                                        {item.selection2.map(no=>{
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
                                        {betSlipPlaceInputExacta(item)}
                                    </div>
                                    <footer className="bet-card-footer">
                                        <div className="bet-card-footer-actions">
                                            <p className="bet-status">
                                                {item.exacta==0 || !item.exacta || (item.selection1.length<1 || 
                                                item.selection2.length<1 )
                                                ?"Incomplete Bet":""}
                                            </p>                                           
                                            <button className="bet-card-remove">
                                                <i onClick={()=>{
                                                            props.deleteSingleBet(item)
                                                            {deleteSingleBetfunExacta(item)}  
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
                            ${_.sumBy(finalRemainingBets, 'win')+_.sumBy(finalRemainingBets, 'place')
                            +_.sumBy(RemainingBetsDuet, 'duet')+_.sumBy(RemainingBetsExacta, 'exacta')
                            +_.sumBy(RemainingBetsTrifecta, 'trifecta')+_.sumBy(RemainingBetsQuienlla, 'quinella') 
                            +_.sumBy(RemainingBetsFirst4, 'first4')}
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
                            props.postWinPlaceBetsQuinella(placeWinPlaceBetListQuinella)
                            props.postWinPlaceBetsTrifecta(placeWinPlaceBetListTrifecta)
                            props.postWinPlaceBetsFirst4(placeWinPlaceBetListFirst4)
                            props.postWinPlaceBetsExacta(placeWinPlaceBetListExacta)
                            props.postWinPlaceBetsDuet(placeWinPlaceBetListDuet)
                            
                            setRemainingBets([])
                            setRemainingBetsQuienlla([])
                            setRemainingBetsDuet([])
                            setRemainingBetsFirst4([])
                            setRemainingBetsTrifecta([])
                            setRemainingBetsExacta([])
                            props.deleteAllBets(true)
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
                                        {betSlipBetDetail()}
                                        {betSlipBetDetailQuinella()}
                                        {betSlipBetDetailDuet()}
                                        {betSlipBetDetailFirst4()}
                                        {betSlipBetDetailTrifecta()}
                                        {betSlipBetDetailExacta()}
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
        deleteBetSlip:state.deleteBetSlip,

        allBetSlip:state.allBetSlip,
        remainingBetSlip:state.remainingBetSlip,
        screenStatus:state.screenStatus,
        postWinPlace:state.postWinPlace,
        deleteSingleBetData:state.deleteSingleBet,
        deleteAllBetData:state.deleteAllBet,

        allBetSlipQuinella: state.allBetSlipQuinella,
        screenStatusQuinella: state.screenStatusQuinella,
        remainingBetSlipQuinella: state.remainingBetSlipQuinella,
        postWinPlaceQuinella: state.postWinPlaceQuinella,
        deleteSingleBetQuinella: state.deleteSingleBetQuinella,
        deleteAllBetQuinella: state.deleteAllBetQuinella,

        
        allBetSlipTrifecta: state.allBetSlipTrifecta,
        screenStatusTrifecta: state.screenStatusTrifecta,
        remainingBetSlipTrifecta: state.remainingBetSlipTrifecta,
        postWinPlaceTrifecta: state.postWinPlaceTrifecta,
        deleteSingleBetTrifecta: state.deleteSingleBetTrifecta,
        deleteAllBetTrifecta: state.deleteAllBetTrifecta,

        allBetSlipFirst4: state.allBetSlipFirst4,
        screenStatusFirst4: state.screenStatusFirst4,
        remainingBetSlipFirst4: state.remainingBetSlipFirst4,
        postWinPlaceFirst4: state.postWinPlaceFirst4,
        deleteSingleBetFirst4: state.deleteSingleBetFirst4,
        deleteAllBetFirst4: state.deleteAllBetFirst4,


        allBetSlipExacta: state.allBetSlipExacta,
        screenStatusExacta: state.screenStatusExacta,
        remainingBetSlipExacta: state.remainingBetSlipExacta,
        postWinPlaceExacta: state.postWinPlaceExacta,
        deleteSingleBetExacta: state.deleteSingleBetExacta,
        deleteAllBetExacta: state.deleteAllBetExacta,

        allBetSlipDuet: state.allBetSlipDuet,
        screenStatusDuet: state.screenStatusDuet,
        remainingBetSlipDuet: state.remainingBetSlipDuet,
        postWinPlaceDuet: state.postWinPlaceDuet,
        deleteSingleBetDuet: state.deleteSingleBetDuet,
        deleteAllBetDuet: state.deleteAllBetDuet,
    }
}
export default connect(mapStateToProps, 
    { 
        addBetSlipData,
        deleteBetSlipData,

        allBetSlipData,
        remainingBetSlipData,
        betSlipScreen,
        postWinPlaceBets,
        deleteSingleBet,
        deleteAllBets,

        allBetSlipDataQuinella,
        remainingBetSlipDataQuinella,
        betSlipScreenQuinella,
        postWinPlaceBetsQuinella,
        deleteSingleBetQuinella,
        deleteAllBetsQuinella,
        


        
        allBetSlipDataTrifecta,
        remainingBetSlipDataTrifecta,
        betSlipScreenTrifecta,
        postWinPlaceBetsTrifecta,
        deleteSingleBetTrifecta,
        deleteAllBetsTrifecta,


        
        allBetSlipDataFirst4,
        remainingBetSlipDataFirst4,
        betSlipScreenFirst4,
        postWinPlaceBetsFirst4,
        deleteSingleBetFirst4,
        deleteAllBetsFirst4,

        
        allBetSlipDataExacta,
        remainingBetSlipDataExacta,
        betSlipScreenExacta,
        postWinPlaceBetsExacta,
        deleteSingleBetExacta,
        deleteAllBetsExacta,

        
        allBetSlipDataDuet,
        remainingBetSlipDataDuet,
        betSlipScreenDuet,
        postWinPlaceBetsDuet,
        deleteSingleBetDuet,
        deleteAllBetsDuet
    })
    (BetSlipHome);