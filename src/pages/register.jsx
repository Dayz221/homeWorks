// import { useState } from 'react'
// import Loader from '../components/Loader/Loader'
import { useSelector } from 'react-redux'
import '../styles/register.css'
import { Navigate } from 'react-router-dom'

export default () => {
    // const [isLoading, setIsLoading] = useState(true)
    const user = useSelector(state => state.user.user)
    console.log(user)
    if (Object.keys(user).length == 0) {
        return <Navigate to="/login" />
    }

    return (
        <>
            {/* {isLoading ? <Loader/> : null} */}
            <div style={{padding: "0 15px"}}>
                <div className="register_container">
                    <h2 className="register_title">Регистрация</h2>
                    
                    <div className="user_info__container">
                        <div className="image_container">
                            <img src={user.photo_url} />
                        </div>
                        <div className="user_info">
                            <div className="full_name">{user.last_name + " " + user.first_name}</div>
                            <div className="user_username">{"@"+user.username}</div>
                        </div>
                    </div>

                    <div className="group_select__container">
                        <input className="register_input" type="text" />
                        <input className="register_input" type="password" />
                        
                        <button className="send_button">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 6L20 12M20 12L14 18M20 12H5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}