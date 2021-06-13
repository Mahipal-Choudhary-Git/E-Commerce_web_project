import { POP_LOADER, PUSH_LOADER, SET_ERROR, REMOVE_ERROR } from "./types";

export const activateLoader = () => ({ type: PUSH_LOADER });
export const deactivateLoader = () => ({ type: POP_LOADER });

export const showErrorMessage = (error) => ({
    type: SET_ERROR,
    payload: error.message,
});
export const removeErrorMessage = () => ({ type: REMOVE_ERROR });
