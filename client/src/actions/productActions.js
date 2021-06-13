import { activateLoader, deactivateLoader } from ".";
import backend from "../apis/backend";
import {
    FETCH_PRODUCTS_FAILED,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCT_FAILED,
    FETCH_PRODUCT_SUCCESS,
} from "./types";
export const fetchProducts = () => async (dispatch) => {
    dispatch(activateLoader());
    try {
        const { data } = await backend.get("/products");
        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
        dispatch(deactivateLoader());
    } catch (err) {
        dispatch({
            type: FETCH_PRODUCTS_FAILED,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        });
        dispatch(deactivateLoader());
    }
};
export const fetchProduct = (id) => async (dispatch) => {
    dispatch(activateLoader());
    try {
        const { data } = await backend.get(`/product/${id}`);
        if (data) dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: data });
        dispatch(deactivateLoader());
    } catch (err) {
        dispatch({
            type: FETCH_PRODUCT_FAILED,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        });
        dispatch(deactivateLoader());
    }
};
