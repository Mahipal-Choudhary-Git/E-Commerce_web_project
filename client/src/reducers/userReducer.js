import {
    FETCH_USER_SUCCESS,
    LOGOUT_USER,
    UPDATE_USER_SUCCESS,
} from "../actions/types";

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_USER_SUCCESS:
            return { ...state, [action.payload._id]: action.payload };
        case UPDATE_USER_SUCCESS:
            return { ...state, [action.payload._id]: action.payload };
        case LOGOUT_USER:
            return {};
        default:
            return state;
    }
};

export default userReducer;
