
export default (state={}, action)=> {
    switch (action.type) {
        case 'ALL_BET_SLIP_DATA_QUINELLA':
            return action.payload
        default:
            return state;
    }
};
