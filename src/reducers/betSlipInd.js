import { act } from "react-dom/test-utils";

export default (state=[], action)=> {
    switch (action.type) {
        case 'ADD_BET_SLIP_DATA':
            return action.payload
        default:
            return state;
    }
};
