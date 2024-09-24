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
        },

        setIsLoggedIn(store, action) {
            store.isLoggedIn = action.payload
        }
    }
})

export const { setUser, setIsLoggedIn } = userSlice.actions
export default userSlice.reducer