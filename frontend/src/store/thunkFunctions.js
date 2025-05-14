import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

// 회원가입
export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (body, thunkAPI) => {
        try {
          const response = await axiosInstance.post(`/users/register`,body)
          return response.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.response.data || err.message);
        } 
    }
)

// 로그인
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (body, thunkAPI) => {
        try {
          const response = await axiosInstance.post(`/users/login`,body)
          return response.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.response.data || err.message);
        } 
    }
)

// 회원 auth 확인 
export const authUser = createAsyncThunk(
    "user/authUser",
    // 받고 있는 내용이 없기 때문에 _ 표시, thunkAPI는 두 번째로 와야함
    async(_, thunkAPI) => {
        try {
           const response = await axiosInstance.get(`users/auth`);
           return response.data; 
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.response.data || err.message);
        }
    }
  )