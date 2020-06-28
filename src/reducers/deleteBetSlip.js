
export default (state=[], action)=> {
    switch (action.type) {
        case 'DELETE_BET_SLIP_DATA':
            return [...state,action.payload]
        default:
            return state;
    }
};
