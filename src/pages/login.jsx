import { LoginButton } from '@telegram-auth/react'
import '../styles/login.css'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import axios from '../utils/axios.js'
import { useNavigate } from 'react-router-dom'

export default () => {
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (window.Telegram.WebApp.initDataUnsafe.user !== undefined) {
            const data = window.Telegram.WebApp.initDataUnsafe;
            console.log(data)
            axios
                .post("/auth/login", {
                    telegramId: data.user.id,
                    hash: data.hash
                })
                .then((res) => {
                    window.localStorage.setItem("token", res.data.token)
                    navigate("/")
                })
                .catch((err) => {
                    console.log(err)
                })
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
                        onAuthCallback={(data) => {
                            axios
                                .post("/auth/login", {
                                    telegramId: data.id,
                                    hash: data.hash
                                })
                                .then((res) => {
                                    window.localStorage.setItem("token", res.data.token)
                                    navigate("/")
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
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