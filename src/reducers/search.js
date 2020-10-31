import * as ActionTypes from '../actions/type';

const mechanicalList = localStorage.getItem("mechanicalList");

const initialState = mechanicalList ? {mechanicalList, searched: false} : {mechanicalList: null, searched: false};

const SearchReducer = (state = initialState, action) => {
    const {type, payload} = action;
    
    switch(type) {
        case ActionTypes.SEARCH_SUCCESS: 
            return {
                ...state,
                mechanicalList: payload.mechanicalList,
                searched: true
            }
        case ActionTypes.FINISH_SEARCH:
            return {
                ...state,
                searched: false
            }
        default: 
            return state;
    }
}

export default SearchReducer;