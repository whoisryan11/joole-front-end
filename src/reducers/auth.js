import * as ActionTypes from "../actions/type";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

const AuthReducer = (state= initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case ActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            }
        case ActionTypes.REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            }
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user
            }
        case ActionTypes.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        case ActionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        default:
            return state;
    }
}
export default AuthReducer;