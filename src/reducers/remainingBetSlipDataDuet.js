
export default (state=[], action)=> {
    switch (action.type) {
        case 'REMAINING_BET_SLIP_DATA_DUET':
            return action.payload
        default:
            return state;
    }
};
