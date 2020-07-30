export default (state=[], action)=> {
    switch (action.type) {
        case 'POST_WIN_PLACE_FIRST4':
            return action.payload
        default:
            return state;
    }
};
