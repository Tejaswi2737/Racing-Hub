
export default (state=false, action)=> {
    switch (action.type) {
        case 'DELETE_All_BET_EXACTA':
            return [action.payload]
        default:
            return state;
    }
};
