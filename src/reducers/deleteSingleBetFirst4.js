import { act } from "react-dom/test-utils";

export default (state=[], action)=> {
    switch (action.type) {
        case 'DELETE_SINGLE_BET_FIRST4':
            return [action.payload]
        default:
            return state;
    }
};
