export default (state=[], action)=> {
    switch (action.type) {
        case 'FETCH_TODAY_GREY':
            return action.payload
        default:
            return state;
    }
};
