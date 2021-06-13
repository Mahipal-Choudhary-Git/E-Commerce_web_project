import backend from "../apis/backend";
import { activateLoader, deactivateLoader } from ".";
import {
    ADD_USER_FAILED,
    //  ADD_USER_SUCCESS,
    LOGIN_USER_SUCCESS,
} from "./types";

export const addUser = (name, email, password) => async (dispatch) => {
    dispatch(activateLoader());
    try {
        const { data } = await backend.post("/users", {
            name,
            email,
            password,
        });
        // dispatch({ type: ADD_USER_SUCCESS, payload: data });
        dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
        dispatch(deactivateLoader());
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: ADD_USER_FAILED,
            payload: error.message,
        });
        dispatch(deactivateLoader());
    }
};
