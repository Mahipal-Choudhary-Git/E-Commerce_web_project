import _ from "lodash";
import {
    ADD_ORDER_RESET,
    ADD_ORDER_SUCCESS,
    EDIT_ORDER_SUCCESS,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDER_SUCCESS,
    RESET_ORDERS,
} from "../actions/types";

const orderReducer = (state = { success: false }, action) => {
    switch (action.type) {
        case ADD_ORDER_SUCCESS:
            return {
                ...state,
                [action.payload._id]: action.payload,
                success: action.payload._id,
            };
        case FETCH_ORDER_SUCCESS:
            return { ...state, [action.payload._id]: action.payload };
        case EDIT_ORDER_SUCCESS:
            return { ...state, [action.payload._id]: action.payload };
        case FETCH_ORDERS_SUCCESS:
            return { ...state, ..._.mapKeys(action.payload, "_id") };
        case ADD_ORDER_RESET:
            return { ...state, success: false };
        case RESET_ORDERS:
            return {};
        default:
            return state;
    }
};

export default orderReducer;
