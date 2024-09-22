import { useRef, useState } from 'react'
import { LoginButton } from '@telegram-auth/react'
import '../styles/login.css'

export default () => {
    const [userPhotoUrl, setUserPhotoUrl] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_YBNzNGxrDL6LCMEtmMsJRK08flZj0JLOVA&s")

    const btnRef = useRef(null)

    const handleObjectClick = () => {
        if (btnRef.current) {
            btnRef.current.click(); // Вызов клика по кнопке
        }
    }

    return (
        <div style={{padding: "0 10px"}}>
            <div className="container">
                <h2 className="title">Войди через телеграмм</h2>
                
                <LoginButton
                    className = "telegram-widget"
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
    )
}