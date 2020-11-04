import axios from 'axios';


const API_URL = "http://localhost:8080/authenticate/";

const register = (username, password, email) => {
    return axios.post(API_URL + "register", {
        username,
        email,
        password
    });
}

const login = async (username, password) => {
    return axios.post(API_URL + "login", {
        username,
        password
    }).then((response) => {
        if(response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
        }
        return response.data;
    })
};

const logout = () => {
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
}
export default {
    register, login, logout
}