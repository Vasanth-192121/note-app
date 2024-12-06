import axios from "axios";
import { REACT_APP_BASE_URL } from "./constants";

const axiosInstance = axios.create({
    baseURL: REACT_APP_BASE_URL,
    // baseURL : "https://note-app-server-seven.vercel.app/",
    // baseURL : "http://localhost:3000",
    // baseURL : "https://keeper-notes-app-server.vercel.app/",
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
