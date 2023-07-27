import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from '../../helper'


export const Updatequestionstate = createAsyncThunk("Updatequestionstate",
    async ({ type, QuesID, userId }) => {
        switch (type) {
            case "QuesUp":
                const QuesUp = await axios.post(`${BASE_URL}/request/question/upvote`, {
                    QuesID: QuesID,
                    userId: userId,
                })
                if (QuesUp.data.success) {
                    const { data } = await axios.put(`${BASE_URL}/request/question/${QuesID}/reputation`)
                }
                return QuesUp.data.question;

            case "QuesDown":
                const QuesDown = await axios.post(`${BASE_URL}/request/question/downvote`, {
                    QuesID: QuesID,
                    userId: userId,
                })
                if (QuesDown.data.success) {
                    await axios.put(`${BASE_URL}/request/question/${QuesID}/reputation`)
                }
                return QuesDown.data.question;
            default:
                return [];
        }
    }
)


export const fetchQuestiondetails = createAsyncThunk(
    "fetchQuestiondetails",
    async ({ page, sorttype, hashtag }) => {
        const { data } = await axios.get(`${BASE_URL}/request/question`, {
            params: {
                page: page,
                sorttype: sorttype,
                hashtag: hashtag,
            },
        });
        return data;
    }
);

const QuestionSlice = createSlice({
    name: "Question",
    initialState: {
        isLoading: false,
        isError: false,
        data: {},
        currentPage: 1,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuestiondetails.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchQuestiondetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchQuestiondetails.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        });
        builder.addCase(Updatequestionstate.fulfilled, (state, action) => {
            const updatedQuestion = action.payload;
            state.data.Questions = state.data.Questions.map((item) =>
                item._id === updatedQuestion._id ? updatedQuestion : item
            );
        });
    },
});

export const { setCurrentPage } = QuestionSlice.actions;

export default QuestionSlice.reducer;
