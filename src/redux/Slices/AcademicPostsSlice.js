import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios';
import { BASE_URL } from '../../helper'


export const fetchPosts = createAsyncThunk('fetchPosts', async () => {
    const { data } = await axios.get(`${BASE_URL}/request/posts`)
    return data.Posts;
})

const PostsSlice = createSlice({
    name: "Post",
    initialState: {
        isLoading: false,
        IsError: false,
        Posts: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.Posts = action.payload;
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.IsError = true;
        });
    },

})

export default PostsSlice.reducer;