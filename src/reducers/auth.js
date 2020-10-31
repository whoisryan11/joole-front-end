import * as ActionTypes from "../actions/type";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user ? { isLoggedIn: true, user, registered:false } : { isLoggedIn: false, user: null, registered: false };

const AuthReducer = (state= initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case ActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                registered: true
            }
        case ActionTypes.REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                registered: false
            }
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
                registered: false
            }
        case ActionTypes.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                registered: false,
            }
        case ActionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                registered:false
            }
        default:
            return state;
    }
}
export default AuthReducer;