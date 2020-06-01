export default (state=[], action)=> {
    switch (action.type) {
        case 'FETCH_NEXT_RACE':
            return action.payload
        default:
            return state;
    }
};
