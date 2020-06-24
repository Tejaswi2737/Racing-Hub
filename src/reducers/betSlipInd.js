
const initialUserState = {
    slip:[{name:"",age:""}]
  }
export default (state=[{name:"",age:""}], action)=> {
    switch (action.type) {
        case 'ADD_BET_SLIP_DATA':
            console.log(state)
            return [...state,action.payload]
        default:
            return state;
    }
};
