import { useSelector } from 'react-redux'
import '../styles/register.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from '../utils/axios.js'
import classNames from 'classnames'

export default () => {
    const navigate = useNavigate()

    const [groupName, setGroupName] = useState("")
    const [groupPassword, setGroupPassword] = useState("")

    const [error, setError] = useState(false)

    const user = useSelector(state => state.user.user)
    if (Object.keys(user).length == 0) {
        return <Navigate to="/login" />
    }

    const sendData = () => {
        axios
            .post("/auth/register", { groupName, groupPassword, ...user })
            .then((res) => {
                window.localStorage.setItem("token", res.data.token)
                navigate('/')
            })
            .catch((err) => {
                setError(true)
            })
    }

    const clearErrors = () => {
        setError(false)
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
                        <input className={classNames("register_input", {err: error})} placeholder="Группа" type="text" value={groupName} onInput={(e) => {
                                setGroupName(String(e.target.value).toUpperCase())
                                clearErrors()
                            }} />
                        <input className={classNames("register_input", {err: error})} placeholder="Пароль" type="text" value={groupPassword} onInput={(e) => {
                                setGroupPassword(e.target.value)
                                clearErrors()
                            }} />
                        
                        <button className={classNames("send_button", {err: error})} onClick={() => sendData()}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 6L20 12M20 12L14 18M20 12H5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}