export default (state=[], action)=> {
    switch (action.type) {
        case 'FETCH_TODAY_HARNESS':
            return action.payload
        default:
            return state;
    }
};
