import {
    ADD_ORDER_FAILED,
    ADD_USER_FAILED,
    UPDATE_ORDER_FAILED,
    FETCH_ORDERS_FAILED,
    FETCH_ORDER_FAILED,
    FETCH_PRODUCTS_FAILED,
    FETCH_PRODUCT_FAILED,
    LOGIN_USER_FAILED,
    REMOVE_ERROR,
    SET_ERROR,
} from "../actions/types";

const errorReducer = (state = null, action) => {
    switch (action.type) {
        case SET_ERROR:
            return action.payload;
        case FETCH_PRODUCT_FAILED:
            return action.payload;
        case FETCH_PRODUCTS_FAILED:
            return action.payload;
        case LOGIN_USER_FAILED:
            return action.payload;
        case ADD_USER_FAILED:
            return action.payload;
        case FETCH_ORDER_FAILED:
            return action.payload;
        case FETCH_ORDERS_FAILED:
            return action.payload;
        case ADD_ORDER_FAILED:
            return action.payload;
        case UPDATE_ORDER_FAILED:
            return action.payload;
        case REMOVE_ERROR:
            return null;
        default:
            return state;
    }
};

export default errorReducer;
