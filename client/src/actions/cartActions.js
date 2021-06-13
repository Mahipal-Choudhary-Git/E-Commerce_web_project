import backend from "../apis/backend";
import {
    ADD_ITEM_TO_CART,
    ADD_SHIPPING_ADDRESS,
    FETCH_PRODUCT_FAILED,
    REMOVE_ITEM_FROM_CART,
} from "./types";

export const addItemToCart = (id, qty) => async (dispatch, getState) => {
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
        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().cart.cartItems)
        );
    } catch (err) {
        dispatch({
            type: FETCH_PRODUCT_FAILED,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        });
    }
};

export const removeItemFromCart = (productId) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_ITEM_FROM_CART,
        payload: productId,
    });
    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};

export const addShippingAddress = (data) => (dispatch, getState) => {
    dispatch({
        type: ADD_SHIPPING_ADDRESS,
        payload: data,
    });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
};
