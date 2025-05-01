import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {
        id: '',
        email: '',
        name: '',
        role: 0,
        image: '',
    },
    isAuth: false,
    isLoading: false,
    error: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    // eslint-disable-next-line no-unused-vars
    extraReducers: (builder) => { }
})

export default userSlice.reducer;