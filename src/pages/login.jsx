import { useState } from 'react'
import '../styles/login.css'

export default () => {
    const [userPhotoUrl, setUserPhotoUrl] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_YBNzNGxrDL6LCMEtmMsJRK08flZj0JLOVA&s")
    
    function onTelegramAuth(user) {
        alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
    }

    return (
        <div className="container">
            
        </div>
    )
}