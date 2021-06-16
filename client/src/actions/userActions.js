import backend from "../apis/backend";
import { activateLoader, deactivateLoader } from ".";
import {
    ADD_USER_FAILED,
    FETCH_USER_FAILED,
    FETCH_USER_SUCCESS,
    //  ADD_USER_SUCCESS,
    LOGIN_USER_SUCCESS,
    UPDATE_ORDER_FAILED,
    UPDATE_USER_SUCCESS,
} from "./types";

export const addUser = (name, email, password) => async (dispatch) => {
    dispatch(activateLoader());
    try {
        const { data } = await backend.post("/users", {
            name,
            email,
            password,
        });
        dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
        dispatch(deactivateLoader());
    } catch (error) {
        dispatch({
            type: ADD_USER_FAILED,
            payload: error.message,
        });
        dispatch(deactivateLoader());
    }
};

export const fetchUser = (user) => async (dispatch) => {
    dispatch(activateLoader());
    try {
        const { data } = await backend.get(`/users/${user._id}`, {
            headers: {
                Authorization: `bearer ${user.token}`,
            },
        });
        dispatch({ type: FETCH_USER_SUCCESS, payload: data });
        dispatch(deactivateLoader());
    } catch (err) {
        dispatch({
            type: FETCH_USER_FAILED,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        });
        dispatch(deactivateLoader());
    }
};

export const updateUser = (userToUpdate) => async (dispatch, getState) => {
    dispatch(activateLoader());
    try {
        const {
            auth: { userInfo },
        } = getState();
        const { data } = await backend.patch(
            `/users/${userToUpdate._id}`,
            userToUpdate,
            {
                headers: {
                    Authorization: `bearer ${userInfo.token}`,
                },
            }
        );
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
        dispatch(deactivateLoader());
    } catch (err) {
        dispatch({
            type: UPDATE_ORDER_FAILED,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        });
        dispatch(deactivateLoader());
    }
};
