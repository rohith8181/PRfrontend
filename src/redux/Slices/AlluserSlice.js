import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from '../../helper'


export const fetchAlluserdetails = createAsyncThunk('fetchAlluserdetails', async (useremail) => {
    const { data } = await axios.get(`${BASE_URL}/request/usersearch`, {
        params: {
            useremail: useremail,
        },
    });

    return data;
})

const Alluserslice = createSlice({
    name: "Alluser",
    initialState: {
        isLoading: false,
        isError: false,
        AllUserdetails: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAlluserdetails.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAlluserdetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.AllUserdetails = action.payload.users;
        });
        builder.addCase(fetchAlluserdetails.rejected, (state, action) => {
            console.log("Error", action.payload)
            state.isLoading = false
            state.isError = true
        });
    }
});


export default Alluserslice.reducer;

