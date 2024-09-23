import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false,
    user: {}
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(store, action) {
            store.user = action.payload
            store.isLoggedIn = true
        }
    }
})

export const  { setUser } = userSlice.actions
export default userSlice.reducer