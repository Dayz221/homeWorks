import axios from "axios"

const instance = axios.create({
    baseURL: "https://home-work-api.ru/api"
})

instance.interceptors.request.use(config => {
    if (window.localStorage.getItem("token")) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem("token")
    }

    return config
})

export default instance