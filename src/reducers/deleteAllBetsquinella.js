
export default (state=false, action)=> {
    switch (action.type) {
        case 'DELETE_All_BET_QUINELLA':
            return [action.payload]
        default:
            return state;
    }
};
