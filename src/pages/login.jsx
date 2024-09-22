import { useState } from 'react'
import { LoginButton } from '@telegram-auth/react'
import '../styles/login.css'

export default () => {
    const [userPhotoUrl, setUserPhotoUrl] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_YBNzNGxrDL6LCMEtmMsJRK08flZj0JLOVA&s")

    return (
        <div className="container">
            <h2 className="title">Войди через телеграмм</h2>
            <LoginButton
                botUsername="myHomeworkWithSiteBot"
                onAuthCallback={(data) => {
                    console.log(data)
                }}
                buttonSize="large"
                cornerRadius={20}
                showAvatar={true}
                lang="ru"
            />
        </div>
    )
}