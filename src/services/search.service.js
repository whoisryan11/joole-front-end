import axios from 'axios';

import authHeader from './auth-header';

const API_URL = "http://localhost:8080/";


const search = async (type) => {
    
    return axios.get(API_URL + `getMechanicals?type=${type}`, {headers: authHeader()})
    .then( (response) => {
        localStorage.setItem("mechanicalList", JSON.stringify(response.data.mechanicalList));
        return response.data;
    })
}
export default {search}