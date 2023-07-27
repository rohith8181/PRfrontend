import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from '../../helper'


export const fetchUserdetails = createAsyncThunk('fetchUserdetails', async () => {
    const { data } = await axios.get(`${BASE_URL}/request/userdetails`, {
        headers: {
            "x-access-token": Cookies.get('token'),
        }
    });
    return data.Userdetails[0];
})



const Userslice = createSlice({
    name: "User",
    initialState: {
        isLoading: false,
        isError: false,
        CurrentUserdetails: {},
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserdetails.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUserdetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.CurrentUserdetails = action.payload;
        });
        builder.addCase(fetchUserdetails.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        });
    }
});


export default Userslice.reducer;