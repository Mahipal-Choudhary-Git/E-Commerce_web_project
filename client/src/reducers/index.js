import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import errorReducer from "./errorReducer";
import loaderReducer from "./loaderReducer";
import productReducer from "./productsReducer";

export default combineReducers({
    products: productReducer,
    error: errorReducer,
    loader: loaderReducer,
    cart: cartReducer,
    auth: authReducer,
});
