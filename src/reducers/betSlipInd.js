
export default (state=[], action)=> {
    switch (action.type) {
        case 'ADD_BET_SLIP_DATA':
            return [...state,action.payload]
        default:
            return state;
    }
};
