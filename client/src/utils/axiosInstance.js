import axios from "axios";
import { REACT_APP_BASE_URL } from "./constants";

const axiosInstance = axios.create({
    baseURL : REACT_APP_BASE_URL || "http://localhost:3000/",
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
