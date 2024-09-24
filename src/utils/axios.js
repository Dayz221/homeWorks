import axios from "axios"

const instance = axios.create({
    baseURL: process.env.API
})

instance.interceptors.request.use(config => {
    if (window.localStorage.getItem("token")) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem("token")
    }

    return config
})

export default instance