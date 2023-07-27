import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from '../../helper'


export const fetchuserrecords = createAsyncThunk('fetchuserrecords', async (userid) => {
    const { data } = await axios.get(`${BASE_URL}/request/fetchuserrecords`, {
        params: {
            userid: userid,
        }
    })

    return data;
})
export const fetchsubed = createAsyncThunk('fetchsubed', async ({ userID, subID }) => {
    const { data } = await axios.get(`${BASE_URL}/request/checksubed`, {
        params: {
            userID: userID,
            subID: subID,
        }
    })

    return data;

})
export const fetchSelecteduserdetails = createAsyncThunk('fetchAlluserdetails', async (userid) => {
    const { data } = await axios.get(`${BASE_URL}/request/selectedusersearch`, {
        params: {
            userid: userid,
        },
    });

    return data;
})

const Selecteduserslice = createSlice({
    name: "Selecteduser",
    initialState: {
        isLoading: false,
        isRLoading: false,
        isSloading: false,
        isSubed: false,
        isexists: false,
        isError: false,
        SelectedUserdetails: [],
        Userrecords: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSelecteduserdetails.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchSelecteduserdetails.fulfilled, (state, action) => {
            state.isLoading = false
            state.SelectedUserdetails = action.payload.user
            state.isexists = action.payload.success
        });
        builder.addCase(fetchSelecteduserdetails.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
            state.isLoading = false
        });
        builder.addCase(fetchuserrecords.pending, (state, action) => {
            state.isRLoading = true
        })
        builder.addCase(fetchuserrecords.fulfilled, (state, action) => {
            state.isRLoading = false
            state.Userrecords = action.payload.records;
        })
        builder.addCase(fetchsubed.pending, (state, action) => {
            state.isSloading = true
        })
        builder.addCase(fetchsubed.fulfilled, (state, action) => {
            state.isSloading = false
            state.isSubed = action.payload.success
        })
    }
});


export default Selecteduserslice.reducer;

