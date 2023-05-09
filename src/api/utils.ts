import axios from "axios";
const API_URL: string = 'http://192.168.0.106:8000';
export const axiosPublic = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" }
})


export const $api = axios.create({
    baseURL: API_URL,
    // headers: {'X-Custom-Header': 'foobar'}
    headers: { "Content-Type": "application/json" }
});

$api.interceptors.request.use(async function (config) {
    // config.headers.Authorization = `Bearer ${sessionStorage.getItem("token")}`;
    console.log(config.data)
    return config;
}, (error) => Promise.reject(error))

$api.interceptors.response.use(function (config) {
    return config;
}, async (error) => {
    // ....
    return Promise.reject(error);
})


