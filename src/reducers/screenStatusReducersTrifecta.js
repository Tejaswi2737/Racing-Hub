
export default (state=[], action)=> {
    switch (action.type) {
        case 'BET_SLIP_SCREEN_TRIFECTA':
            return action.payload
        default:
            return state;
    }
};
