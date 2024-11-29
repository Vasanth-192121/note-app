import axios from "axios";

const axiosInstance = axios.create({
    baseURL : "https://keeper-notes-app-server.vercel.app/",
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
