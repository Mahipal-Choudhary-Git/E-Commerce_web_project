import { activateLoader, deactivateLoader } from ".";
import backend from "../apis/backend";
import {
    ADD_ITEM_TO_CART,
    ADD_SHIPPING_ADDRESS,
    FETCH_PRODUCT_FAILED,
    REMOVE_ITEM_FROM_CART,
} from "./types";

export const addItemToCart = (id, qty) => async (dispatch) => {
    dispatch(activateLoader());
    try {
        const { data } = await backend.get(`/product/${id}`);
        dispatch({
            type: ADD_ITEM_TO_CART,
            payload: {
                productId: id,
                qty: Number(qty),
                productName: data.name,
                productImage: data.image,
                productPrice: data.price,
                productStock: data.countInStock,
            },
        });
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

export const removeItemFromCart = (productId) => (dispatch) => {
    dispatch({
        type: REMOVE_ITEM_FROM_CART,
        payload: productId,
    });
};

export const addShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: ADD_SHIPPING_ADDRESS,
        payload: data,
    });
};
