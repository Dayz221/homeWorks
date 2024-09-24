import { Link } from "react-router-dom"

import axios from "../utils/axios.js"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setIsLoggedIn, setUser } from '../redux/slice.js'

export default () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)

  if (!isLoggedIn) {
    axios
      .get("/auth/me")
      .then((response) => {
          dispatch(setUser(response.data.user))
          dispatch(setIsLoggedIn(true))
        })
      .catch((err) => {
          navigate('/login')
      })    
  }

  return (
      <div>
          <h2>Main page</h2>
          <Link to="/login">Войти</Link>
          <Link to="/register">Зарегистрироваться</Link>
      </div>
  )
}