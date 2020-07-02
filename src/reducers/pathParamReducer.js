export default (state=[], action)=> {
    switch (action.type) {
        case 'FETCH_PATH_PARAMS':
            return action.payload
        default:
            return state;
    }
};
