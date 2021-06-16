import {
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    UPDATE_USER_SUCCESS,
} from "../actions/types";

const userInfo = null;
const authReducer = (state = { userInfo }, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return { userInfo: action.payload };
        case LOGOUT_USER:
            return {};
        case UPDATE_USER_SUCCESS:
            if (state.userInfo._id === action.payload._id) {
                const updatedUserInfo = {
                    ...state.userInfo,
                    name: action.payload.name,
                };
                return { ...state, userInfo: updatedUserInfo };
            } else return state;
        default:
            return state;
    }
};

export default authReducer;
