import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.baseUrl,
});

axiosClient.interceptors.request.use(function (config) {
    let accessToken = localStorage.getItem("accessToken");
    config.headers = {
        'Authorization': 'Bearer ' + accessToken
    }
    return config;
}
)

axiosClient.interceptors.response.use(
    (response) => response,
    (error) =>
        Promise.reject(
            error.response && error.response.data
        )
);
export default axiosClient;