import { LoginButton } from '@telegram-auth/react'
import '../styles/login.css'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import axios from '../utils/axios.js'
import { useNavigate } from 'react-router-dom'

export default () => {
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const loginRequest = (data, user) => {
        console.log(user)
        axios
        .post("/auth/login", data)
        .then((res) => {
            window.localStorage.setItem("token", res.data.token)
            navigate('/')
        })
        .catch((err) => {
            console.log(err)
            navigate('/register')
        })
    }

    useEffect(() => {
        const f = async () => {
            if (window.Telegram.WebApp.initDataUnsafe.user !== undefined) {
                const { allows_write_to_pm, language_code, ...userData } = window.Telegram.WebApp.initDataUnsafe.user;
                userData.photo_url = await getUserProfilePhoto(process.env.BOT_TOKEN, userData.id) || "https://svgpng.ru/wp-content/uploads/2021/07/rectangle-300x300.jpg"

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
                        botUsername="myHomeworkWithSiteBot"
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

async function getUserProfilePhoto(botToken, userId) {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/getUserProfilePhotos?user_id=${userId}`)
    const data = await response.json()

    if (data.total_count > 0) {
        const photo = data.photos[0][0]
        const fileId = photo.file_id

        const fileResponse = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`)
        const fileData = await fileResponse.json()

        const filePath = fileData.result.file_path
        const photoUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`

        return photoUrl;
    } else {
        return null;
    }
}