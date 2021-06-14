import { LOGIN_USER_SUCCESS, LOGOUT_USER } from "../actions/types";

const userInfo = null;
const authReducer = (state = { userInfo }, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return { userInfo: action.payload };
        case LOGOUT_USER:
            return {};
        default:
            return state;
    }
};

export default authReducer;
