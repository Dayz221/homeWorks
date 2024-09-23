import { LoginButton } from '@telegram-auth/react'
import '../styles/login.css'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import axios from '../utils/axios.js'

export default () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let user_data = {}
        if (window.Telegram.WebApp.initDataUnsafe.user !== undefined) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
            console.log(user)
        } else {
            setIsLoading(false)
        }
    }, [])

    // axios
    //     .post("/auth/login", data)
    //     .then((res) => {

    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })

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