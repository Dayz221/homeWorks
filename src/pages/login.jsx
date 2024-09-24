import { LoginButton } from '@telegram-auth/react'
import '../styles/login.css'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import axios from '../utils/axios.js'
import { useNavigate } from 'react-router-dom'

export default () => {
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const useLoginRequest = (data) => {
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
        if (window.Telegram.WebApp.initDataUnsafe.user !== undefined) {
            const data = window.Telegram.WebApp.initDataUnsafe;
            console.log(window.Telegram.WebApp.initData)
            useLoginRequest({
                id: data.user.id,
                hash: data.hash,
                auth_date: data.user.auth_date,
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                photo_url: data.user.photo_url,
                username: data.user.username
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
                            console.log(data)
                            useLoginRequest(data)
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