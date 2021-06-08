import axios from "axios";
import { handleResponse, handleError } from "./response";

const BASE_URL = "http://localhost:5000/api";

const logout = () => {
    return axios.post(`${BASE_URL}/auth/logout`, null, { withCredentials: true }).then(handleResponse).catch(handleError);
};

const login = (payload) => {
    return axios.post(`${BASE_URL}/auth/login`, payload, { withCredentials: true }).then(handleResponse).catch(handleError);
};

const register = (payload) => {
    return axios.post(`${BASE_URL}/auth/register`, payload).then(handleResponse).catch(handleError);
};

const checkLoginStatus = () => {
    return axios.get(`${BASE_URL}/auth/login_status`, { withCredentials: true }).then(handleResponse).catch(handleError);
};

export const apiAuth = {
    login,
    logout,
    register,
    checkLoginStatus,
};
