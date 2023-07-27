import { createSlice } from "@reduxjs/toolkit";


const SortSlice = createSlice({
    name: "sortSlice",
    initialState: {
        sorttype: 'latest',
    },
    reducers: {
        setsorttype: (state, action) => {
            state.sorttype = action.payload;
        }
    }
})

export const { setsorttype } = SortSlice.actions;

export default SortSlice.reducer;