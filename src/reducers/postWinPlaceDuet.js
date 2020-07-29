export default (state=[], action)=> {
    switch (action.type) {
        case 'POST_WIN_PLACE_DUET':
            return action.payload
        default:
            return state;
    }
};
