import React from 'react';
const Context= React.createContext(
    {

    });

export class BetSlipStore extends React.Component {
    state={betSlipFormatWin:
        {
          "bet_fh": "tk_integ_",
          "bet_pool_fh": "",
          "stake_cents": 0,
          "combinations":[
          {
          "place":1,
          "runners":[]
          }
          ]
        },
        betSlipFormatPlace:
        {
          "bet_fh": "tk_integ_",
          "bet_pool_fh": "",
          "stake_cents": 0,
          "combinations":[
          {
          "place":2,
          "runners":[]
          }
          ]
        }
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