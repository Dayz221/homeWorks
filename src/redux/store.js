import { configureStore, createSlice } from "@reduxjs/toolkit"
import slice from "./slice.js"

export default configureStore({
    reducer: {
        user: slice
    }
})