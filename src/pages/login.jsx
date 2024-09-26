import { LoginButton } from '@telegram-auth/react'
import '../styles/login.css'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import axios from '../utils/axios.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/slice.js'

export default () => {
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loginRequest = (data, user) => {
        // console.log(user)
        dispatch(setUser(user))
        axios
        .post("/auth/login", data)
        .then((res) => {
            window.localStorage.setItem("token", res.data.token)
            navigate('/')
        })
        .catch((err) => {
            // console.log(err)
            navigate('/register')
        })
    }

    useEffect(() => {
        const f = async () => {
            if (window.Telegram.WebApp.initDataUnsafe.user !== undefined) {
                const { allows_write_to_pm, language_code, ...userData } = window.Telegram.WebApp.initDataUnsafe.user;
                
                const fileId = await getUserProfilePhotos(process.env.REACT_APP_BOT_TOKEN, userData.id)

                if (fileId) {
                    const fileUrl = await getFile(process.env.REACT_APP_BOT_TOKEN, fileId)
                    userData.photo_url = fileUrl
                } else {
                    userData.photo_url = "https://gb.ru/blog/wp-content/uploads/2022/07/gradienta-LeG68PrXA6Y-unsplash.jpg"
                }

                loginRequest({
                    id: userData.id,
                    type: "miniApp",
                    data: window.Telegram.WebApp.initData,
                }, userData)
            } else {
                setIsLoading(false)
            }
        }
        f()
    }, [])

    return (
        <>
            {isLoading ? <Loader/> : null}
            <div style={{padding: "0 15px"}}>
                <div className="container">
                    <h2 className="title">Войди через телеграмм</h2>

                    <LoginButton
                        botUsername={process.env.REACT_APP_BOT_NAME}
                        onAuthCallback={(data) => {
                            // console.log(data)
                            const { auth_date, hash, ...userData } = data;
                            loginRequest({
                                id: data.id,
                                type: "webApp",
                                data
                            }, userData)
                        }}
                        buttonSize="large"
                        cornerRadius={20}
                        showAvatar={false}
                        lang="ru"
                    />
                </div>
            </div>
        </>
    )
}

async function getUserProfilePhotos(botToken, userId) {
    const url = `https://api.telegram.org/bot${botToken}/getUserProfilePhotos?user_id=${userId}`

    try {
        const response = await axios.get(url)
        const photos = response.data.result.photos

        if (photos.length > 0) {
            const fileId = photos[0][0].file_id
            return fileId
        } else {
            return null
        }
    } catch (error) {
        console.error('Ошибка получения id фоторграфии')
    }
}

async function getFile(botToken, fileId) {
    const url = `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`

    try {
        const response = await axios.get(url)
        const filePath = response.data.result.file_path
        const fileUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`

        return fileUrl
    } catch (error) {
        console.error('Ошибка получения файла фоторграфии')
    }
}