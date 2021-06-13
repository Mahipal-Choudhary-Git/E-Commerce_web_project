import { activateLoader, deactivateLoader } from ".";
import auth from "../apis/auth";
import {
    LOGIN_USER_FAILED,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REMOVE_ALL_FROM_CART,
} from "./types";

export const LoginUser = (email, password) => async (dispatch) => {
    dispatch(activateLoader());
    try {
        const { data } = await auth.post("/user/login", { email, password });
        dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
        dispatch(deactivateLoader());
        localStorage.setItem("userInfo", JSON.stringify(data));
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
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    dispatch({ type: LOGOUT_USER });
    dispatch({ type: REMOVE_ALL_FROM_CART });
};
