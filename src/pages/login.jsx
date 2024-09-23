import { LoginButton } from '@telegram-auth/react'
import '../styles/login.css'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import axios from '../utils/axios.js'
import { useNavigate } from 'react-router-dom'

export default () => {
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const useLoginRequest = (user_id, hash) => {
        axios
        .post("/auth/login", {
            telegramId: user_id,
            hash
        })
        .then((res) => {
            window.localStorage.setItem("token", res.data.token)
            navigate('/')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (window.Telegram.WebApp.initDataUnsafe.user !== undefined) {
            const data = window.Telegram.WebApp.initDataUnsafe;
            useLoginRequest(data.user.id, data.hash)
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <>
            {isLoading ? <Loader/> : null}
            <div style={{padding: "0 15px"}}>
                <div className="container">
                    <h2 className="title">Войди через телеграмм</h2>

                    <LoginButton
                        botUsername="myHomeworkWithSiteBot"
                        onAuthCallback={(data) => useLoginRequest(data.id, data.hash)}
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