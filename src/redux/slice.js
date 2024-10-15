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

        deleteFile(store, action) {
            const task = store.tasks.find(el => el._id === action.payload.task_id)
            task.files = task.files.filter(el => el._id !== action.payload.file_id)
        }
    }
})

export const { setUser, setIsLoggedIn, setTasks, setTaskStatus, deleteFile } = userSlice.actions
export default userSlice.reducer