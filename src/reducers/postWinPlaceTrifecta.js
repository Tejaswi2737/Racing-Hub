export default (state=[], action)=> {
    switch (action.type) {
        case 'POST_WIN_PLACE_TRIFECTA':
            return action.payload
        default:
            return state;
    }
};
