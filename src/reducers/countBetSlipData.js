
export default (state=[], action)=> {
    switch (action.type) {
        case 'COUNT_BET_SLIP_DATA':
            return action.payload
        default:
            return state;
    }
};
