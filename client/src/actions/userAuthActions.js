import { activateLoader, deactivateLoader } from ".";
import auth from "../apis/auth";
import {
    LOGIN_USER_FAILED,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REMOVE_ALL_FROM_CART,
    RESET_ORDERS,
} from "./types";

export const LoginUser = (email, password) => async (dispatch) => {
    dispatch(activateLoader());
    try {
        const { data } = await auth.post("/user/login", { email, password });
        dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
        dispatch(deactivateLoader());
    } catch (err) {
        dispatch({
            type: LOGIN_USER_FAILED,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        });
        dispatch(deactivateLoader());
    }
};

export const logoutUser = () => async (dispatch) => {
    dispatch({ type: LOGOUT_USER });
    dispatch({ type: REMOVE_ALL_FROM_CART });
    dispatch({ type: RESET_ORDERS });
};
