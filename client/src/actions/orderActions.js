import { activateLoader, deactivateLoader } from ".";
import backend from "../apis/backend";
import {
    ADD_ORDER_FAILED,
    ADD_ORDER_SUCCESS,
    FETCH_ORDERS_FAILED,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDER_FAILED,
    FETCH_ORDER_SUCCESS,
    REMOVE_ALL_ITEMS_FROM_CART,
    UPDATE_ORDER_FAILED,
    UPDATE_ORDER_SUCCESS,
} from "./types";

export const createOrder = (order) => async (dispatch) => {
    dispatch(activateLoader());
    try {
        const { data } = await backend.post("/order", order, {
            headers: {
                Authorization: `Bearer ${order.userInfo.token}`,
            },
        });
        dispatch({ type: ADD_ORDER_SUCCESS, payload: data.order });
        dispatch({ type: REMOVE_ALL_ITEMS_FROM_CART });
        dispatch(deactivateLoader());
    } catch (err) {
        dispatch({
            type: ADD_ORDER_FAILED,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        });
        dispatch(deactivateLoader());
    }
};

export const fetchOrder = (orderId) => async (dispatch, getState) => {
    dispatch(activateLoader());
    try {
        const {
            auth: { userInfo },
        } = getState();
        const { data } = await backend.get(`/order/${orderId}`, {
            headers: {
                Authorization: `bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: FETCH_ORDER_SUCCESS, payload: data });
        dispatch(deactivateLoader());
    } catch (err) {
        dispatch({
            type: FETCH_ORDER_FAILED,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        });
        dispatch(deactivateLoader());
    }
};

export const updateOrder = (order, toUpdate) => async (dispatch, getState) => {
    dispatch(activateLoader());
    try {
        const {
            auth: { userInfo },
        } = getState();
        const { data } = await backend.patch(`/order/${order._id}`, toUpdate, {
            headers: {
                Authorization: `bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.order });
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

export const fetchOrders = (user) => async (dispatch) => {
    dispatch(activateLoader());
    try {
        const { data } = await backend.get("/order", {
            headers: {
                Authorization: `bearer ${user.token}`,
            },
        });
        dispatch({ type: FETCH_ORDERS_SUCCESS, payload: data });
        dispatch(deactivateLoader());
    } catch (err) {
        dispatch({
            type: FETCH_ORDERS_FAILED,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        });
        dispatch(deactivateLoader());
    }
};
