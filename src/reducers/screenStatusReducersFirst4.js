
export default (state=[], action)=> {
    switch (action.type) {
        case 'BET_SLIP_SCREEN_FIRST4':
            return action.payload
        default:
            return state;
    }
};
