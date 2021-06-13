import { mapKeys } from "lodash";
import {
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCT_SUCCESS,
} from "../actions/types";

const productReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_SUCCESS:
            return { ...state, [action.payload._id]: action.payload };
        case FETCH_PRODUCTS_SUCCESS:
            return { ...state, ...mapKeys(action.payload, "_id") };
        default:
            return state;
    }
};

export default productReducer;
