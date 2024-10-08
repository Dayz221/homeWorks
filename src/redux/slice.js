import { createSlice } from "@reduxjs/toolkit"
import axios from '../utils/axios.js'

const initialState = {
    isLoggedIn: false,
    tasks: [],
    user: {}
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(store, action) {
            store.user = action.payload
        },

        setIsLoggedIn(store, action) {
            store.isLoggedIn = action.payload
        },

        setTasks(store, action) {
            store.tasks = action.payload
        },

        setTaskStatus(store, action) {
            store.tasks.find(el => el.utask_id === action.payload.utask_id).isCompleted = action.payload.status
        },
    }
})

export const { setUser, setIsLoggedIn, setTasks, setTaskStatus } = userSlice.actions
export default userSlice.reducer