import { LoginButton } from '@telegram-auth/react'
import '../styles/login.css'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import axios from '../utils/axios.js'
import { useNavigate } from 'react-router-dom'

export default () => {
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const useLoginRequest = (data, user) => {
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
        .finally(() => {
            
        })
    }

    useEffect(() => {
        if (window.Telegram.WebApp.initDataUnsafe.user !== undefined) {
            const data = window.Telegram.WebApp.initDataUnsafe
            useLoginRequest({
                id: data.user.id,
                type: "miniApp",
                data: window.Telegram.WebApp.initData,
            }, window.Telegram.WebApp.initDataUnsafe.user)
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
                            // console.log(data)
                            const { auth_date, hash, ...userData } = data;
                            useLoginRequest({
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