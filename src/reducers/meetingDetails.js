export default (state=[], action)=> {
    switch (action.type) {
        case 'FETCH_MEETING_DETAILS':
            return action.payload
        default:
            return state;
    }
};
