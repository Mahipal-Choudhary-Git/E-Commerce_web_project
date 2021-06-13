import {
    ADD_ITEM_TO_CART,
    ADD_SHIPPING_ADDRESS,
    REMOVE_ALL_FROM_CART,
    REMOVE_ITEM_FROM_CART,
} from "../actions/types";

const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const shippingAddress = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

const cartReducer = (state = { cartItems, shippingAddress }, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            const itemToAdd = action.payload;
            const existItemToAdd = state.cartItems.find(
                (e) => e.productId === itemToAdd.productId
            );
            if (existItemToAdd)
                return {
                    ...state,
                    cartItems: state.cartItems.map((e) =>
                        e.productId === existItemToAdd.productId ? itemToAdd : e
                    ),
                };
            else
                return { ...state, cartItems: [...state.cartItems, itemToAdd] };
        case REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (e) => e.productId !== action.payload
                ),
            };
        case REMOVE_ALL_FROM_CART:
            return { ...state, cartItems: [], shippingAddress: {} };
        case ADD_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: action.payload };
        default:
            return state;
    }
};

export default cartReducer;
