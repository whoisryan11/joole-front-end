import axios from 'axios';

const API_URL = "http://localhost:8080/";

const search = async (type) => {
    return axios.get(API_URL + `getMechanicals?type=${type}`)
    .then( (response) => {
        localStorage.setItem("mechanicalList", JSON.stringify(response.data.mechanicalList));
        return response.data;
    })
}
export default {search}