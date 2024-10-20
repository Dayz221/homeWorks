import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false,
    isUploading: false,
    edits: -1,
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
            store.edits += 1
        },

        addTask(store, action) {
            store.tasks.push(action.payload)
            store.edits += 1
        },

        patchTask(store, action) {
            store.tasks = store.tasks.map(task => (task._id === action.payload._id) ? action.payload : task)
            store.edits += 1
        },

        deleteTask(store, action) {
            store.tasks = store.tasks.filter(el => el._id !== action.payload)
            store.edits += 1
        },

        setTaskStatus(store, action) {
            store.tasks.find(el => el.utask_id === action.payload.utask_id).isCompleted = action.payload.status
        },

        deleteFile(store, action) {
            const task = store.tasks.find(el => el._id === action.payload.task_id)
            task.files = task.files.filter(el => el._id !== action.payload.file_id)
        },
        
        setEdits(store, action) {
            store.edits = action.payload
        }
    }
})

export const { setUser, setIsLoggedIn, setTasks, setTaskStatus, deleteFile, addTask, patchTask, deleteTask, setEdits, setIsUploading } = userSlice.actions
export default userSlice.reducer