import { createSlice } from "@reduxjs/toolkit";
import { authUser, registerUser } from "./thunkFunctions";
import { loginUser } from "./thunkFunctions";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    extraReducers: (builder) => { 
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false;
            toast.info('회원가입을 완료하였습니다.')
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })

        .addCase(loginUser.pending,(state) => {
            state.isLoading = true;
        })

        .addCase(loginUser.fulfilled,(state, action) => {
            state.isLoading = false;
            state.userData = action.payload;
            state.isAuth = true;
            localStorage.setItem('accessToken', action.payload.accessToken);
            toast.info('로그인되었습니다.');
        })

        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })

        .addCase(authUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(authUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload;
            state.isAuth = true;
            toast.info('토큰 인증 완료');
        })
        .addCase(authUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.userData = initialState.userData;
            state.isAuth = false;
            localStorage.removeItem('accessToken');
        })
     }
})

export default userSlice.reducer;