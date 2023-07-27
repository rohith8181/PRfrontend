import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios';
import { BASE_URL } from '../../helper'


export const fetchPetitions = createAsyncThunk('fetchpetitions', async () => {
    const { data } = await axios.get(`${BASE_URL}/request/petitions`)
    return data.petitions;
})

export const fetchfullpetition = createAsyncThunk('fetchfullpetition', async (petid) => {
    const { data } = await axios.get(`${BASE_URL}/request/petition`, {
        params: {
            Petitionid: petid,
        }
    })
    return data;
})

export const Signpetition = createAsyncThunk('Signpetition', async ({ petid, userid }) => {
    const { data } = await axios.post(`${BASE_URL}/request/petitionsign`, {
        userId: userid,
        petid: petid,
    })

    return data;
})

const PetitionSlice = createSlice({
    name: "Petition",
    initialState: {
        isLoading: false,
        isFLoading: false,
        isSLoading: false,
        IsError: false,
        Isexists: false,
        FullPetition: [],
        Petitions: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPetitions.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchPetitions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.Petitions = action.payload;
        });
        builder.addCase(fetchPetitions.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.IsError = true;
        });
        builder.addCase(fetchfullpetition.pending, (state, action) => {
            state.isFLoading = true;
        });
        builder.addCase(fetchfullpetition.fulfilled, (state, action) => {
            state.isFLoading = false
            state.Isexists = action.payload.Isexists
            state.FullPetition = action.payload.petition
        });
        builder.addCase(Signpetition.pending, (state, action) => {
            state.isSLoading = true
        });
        builder.addCase(Signpetition.fulfilled, (state, action) => {
            state.isSLoading = false
            state.FullPetition = action.payload.petition
        });
    },

})

export default PetitionSlice.reducer;