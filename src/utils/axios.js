import axios from "axios"

const instance = axios.create({
    baseURL: "http://127.0.0.1:8080/api"
})

instance.interceptors.request.use(config => {
    if (window.localStorage.getItem("token")) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem("token")
    }

    return config
})

export default instance