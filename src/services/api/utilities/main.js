import axios from "axios";
import { handleResponse, handleError } from "./response";

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const BASE_URL = "http://localhost:5000/api";

const getCollection = () => {
    return axios.get(`${BASE_URL}/main/`, { withCredentials: true }).then(handleResponse).catch(handleError);
};

const deleteResource = (id) => {
    return axios.delete(`${BASE_URL}/main/${id}`, { withCredentials: true }).then(handleResponse).catch(handleError);
};

const createResource = (payload) => {
    return axios.post(`${BASE_URL}/main/`, payload, { withCredentials: true }).then(handleResponse).catch(handleError);
};

const updateResource = (id, payload) => {
    return axios.put(`${BASE_URL}/main/${id}`, payload, { withCredentials: true }).then(handleResponse).catch(handleError);
};

export const apiMain = {
    getCollection,
    deleteResource,
    createResource,
    updateResource,
};
