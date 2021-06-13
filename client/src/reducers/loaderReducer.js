import { POP_LOADER, PUSH_LOADER } from "../actions/types";

const loaderReducer = (state = false, action) => {
    switch (action.type) {
        case PUSH_LOADER:
            return true;
        case POP_LOADER:
            return false;
        default:
            return state;
    }
};

export default loaderReducer;
