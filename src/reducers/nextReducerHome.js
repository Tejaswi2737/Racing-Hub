export default (state=[], action)=> {
    switch (action.type) {
        case 'FETCH_NEXT_RACE_HOME':
            return action.payload
        default:
            return state;
    }
};
