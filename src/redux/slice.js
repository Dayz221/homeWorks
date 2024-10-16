import { createSlice } from "@reduxjs/toolkit"

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

        addTask(store, action) {
            store.tasks.push(action.payload)
        },

        patchTask(store, action) {
            store.tasks = store.tasks.map(task => (task._id === action.payload._id) ? action.payload : task)
        },

        deleteTask(store, action) {
            store.tasks = store.tasks.filter(el => el._id !== action.payload)
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

export const { setUser, setIsLoggedIn, setTasks, setTaskStatus, deleteFile, addTask, patchTask, deleteTask } = userSlice.actions
export default userSlice.reducer