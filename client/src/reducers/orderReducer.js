import _ from "lodash";
import {
    ADD_ORDER_SUCCESS,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDER_SUCCESS,
    RESET_ORDERS,
    UPDATE_ORDER_SUCCESS,
} from "../actions/types";

const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_ORDER_SUCCESS:
            return {
                ...state,
                [action.payload._id]: action.payload,
            };
        case FETCH_ORDER_SUCCESS:
            return { ...state, [action.payload._id]: action.payload };
        case UPDATE_ORDER_SUCCESS:
            return { ...state, [action.payload._id]: action.payload };
        case FETCH_ORDERS_SUCCESS:
            return { ...state, ..._.mapKeys(action.payload, "_id") };
        case RESET_ORDERS:
            return {};
        default:
            return state;
    }
};

export default orderReducer;
