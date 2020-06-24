import React from 'react';
const Context= React.createContext(
    {

    });

export class BetSlipStore extends React.Component {
    state={
        betSlipFormatWin:[]
    };
    onBetSlipChange=(betSlipFormat)=>{
        this.setState({betSlipFormat})
    };
    onBetSlipAdd=(betSlipFormat)=>{
        this.setState(...betSlipFormat,{betSlipFormat})
    };
    render() {
        return (
            <Context.Provider value=
                {{...this.state,
                    onBetSlipChange:this.onBetSlipChange,
                    onBetSlipAdd:this.onBetSlipAdd
                    }}>
                {this.props.children}
            </Context.Provider>
        )
    }
};
export default Context;