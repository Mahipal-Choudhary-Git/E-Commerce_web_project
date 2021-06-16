import {
    ADD_ITEM_TO_CART,
    ADD_ORDER_RESET,
    ADD_ORDER_SUCCESS,
    ADD_SHIPPING_ADDRESS,
    PAYMENT_SUCCESS,
    PAYMENT_SUCCESS_RESET,
    REMOVE_ALL_FROM_CART,
    REMOVE_ALL_ITEMS_FROM_CART,
    REMOVE_ITEM_FROM_CART,
} from "../actions/types";

const cartReducer = (
    state = {
        cartItems: [],
        shippingAddress: {},
        newOrderCreated: false,
        newPaymentSuccess: false,
    },
    action
) => {
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
        case REMOVE_ALL_ITEMS_FROM_CART:
            return { ...state, cartItems: [] };
        case ADD_ORDER_SUCCESS:
            return { ...state, newOrderCreated: action.payload._id };
        case ADD_ORDER_RESET:
            return { ...state, newOrderCreated: false };
        case PAYMENT_SUCCESS:
            return { ...state, newPaymentSuccess: action.payload._id };
        case PAYMENT_SUCCESS_RESET:
            return { ...state, newPaymentSuccess: false };
        default:
            return state;
    }
};

export default cartReducer;
