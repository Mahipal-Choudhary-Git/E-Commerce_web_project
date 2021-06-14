import { activateLoader, deactivateLoader } from ".";
import backend from "../apis/backend";
import {
    ADD_ORDER_FAILED,
    ADD_ORDER_SUCCESS,
    REMOVE_ALL_ITEMS_FROM_CART,
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
