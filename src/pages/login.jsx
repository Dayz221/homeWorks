import { LoginButton } from '@telegram-auth/react'
import '../styles/login.css'

export default () => {
    return (
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
    )
}