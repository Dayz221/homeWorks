import { Route, Routes } from "react-router-dom"
import Main from "./pages/main.jsx"
import Login from "./pages/login.jsx"
import Register from "./pages/register.jsx"

export default () => {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Main />} />
      </Routes>
  )
}