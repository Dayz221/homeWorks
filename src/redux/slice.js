import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {}
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(store, action) {
            store.user = action.payload
        }
    }
})

export const  { setUser } = userSlice.actions
export default userSlice.reducer