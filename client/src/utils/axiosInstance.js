import axios from "axios";
import dotenv from "dotenv";
// import { BASE_URL } from "./constants.js";

const axiosInstance = axios.create({
    // baseURL : BASE_URL,
    baseURL : REACT_APP_BASE_URL,
    timeout : 10000,
    headers : {
        "Content-Type" : "application/json"
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
        (error) => {
        return Promise.reject(error);
    }
);

export {axiosInstance};
