export default (state=[], action)=> {
    switch (action.type) {
        case 'FETCH_WIN_PLACE_BET':
            return action.payload
        default:
            return state;
    }
};
