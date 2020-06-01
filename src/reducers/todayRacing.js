export default (state=[], action)=> {
    switch (action.type) {
        case 'FETCH_TODAY_RACING':
            return action.payload
        default:
            return state;
    }
};
