import {SEARCH_SUCCESS, SET_MESSAGE, FINISH_SEARCH} from './type'
import searchService from '../services/search.service';

export const search = (type) => (dispatch) => {
    return searchService.search(type).then(
        (data) => {
            dispatch({
                type: SEARCH_SUCCESS,
                payload: { mechanicalList : data }
            });
            return Promise.resolve();
        },
        (error) => {
            const message = (
                error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: SET_MESSAGE,
                payload: message
            })
            return Promise.reject();
        }
    )
}

export const finishSearch = () => (dispatch) => {
    dispatch({
        type: FINISH_SEARCH
    })
}