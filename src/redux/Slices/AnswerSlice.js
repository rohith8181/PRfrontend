import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../helper'


export const UpdateAnswerQstate = createAsyncThunk("UpdateAnswerQstate",
    async ({ type, QuesID, userId }) => {
        switch (type) {
            case "QuesUp":
                const QuesUp = await axios.post(`${BASE_URL}/request/question/upvote`, {
                    QuesID: QuesID,
                    userId: userId,
                })
                if (QuesUp.data.success) {
                    await axios.put(`${BASE_URL}/request/question/${QuesID}/reputation`)
                }
                return QuesUp.data;

            case "QuesDown":

                const QuesDown = await axios.post(`${BASE_URL}/request/question/downvote`, {
                    QuesID: QuesID,
                    userId: userId,
                })
                if (QuesDown.data.success) {
                    await axios.put(`${BASE_URL}/request/question/${QuesID}/reputation`)
                }
                return QuesDown.data;
            default:
                return [];
        }
    }
)
export const UpdateAnswerAstate = createAsyncThunk("UpdateAnswerAstate",
    async ({ type, AnsID, userId }) => {
        switch (type) {
            case "AnsUp":
                const AnsUp = await axios.post(`${BASE_URL}/request/answer/upvote`, {
                    AnsID: AnsID,
                    userId: userId,
                })
                if (AnsUp.data.success) {
                    await axios.put(`${BASE_URL}/request/answer/${AnsID}/reputation`);
                }
                return AnsUp.data.answer;

            case "AnsDown":

                const AnsDown = await axios.post(`${BASE_URL}/request/answer/downvote`, {
                    AnsID: AnsID,
                    userId: userId,
                })
                if (AnsDown.data.success) {
                    await axios.put(`${BASE_URL}/request/answer/${AnsID}/reputation`);
                }
                return AnsDown.data.answer;
            default:
                return [];
        }
    }
)
export const fetchfullQues = createAsyncThunk('fetchfullQues', async ({ QuesId }) => {
    const { data } = await axios.get(`${BASE_URL}/request/fullquestion`, {
        params: {
            questionid: QuesId
        },
    })
    return data;
})
export const fetchAnswers = createAsyncThunk('fetchAnswers', async ({ QuesId, sortType }) => {
    const { data } = await axios.get(`${BASE_URL}/request/answers`, {
        params: {
            questionid: QuesId,
            sortType: sortType,
        },
    })
    return data;
})


const AnswerSlice = createSlice({
    name: "Answers",
    initialState: {
        isQLoading: false,
        isALoading: false,
        Isexists: false,
        question: [],
        answers: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchfullQues.fulfilled, (state, action) => {
            state.isQLoading = false;
            state.Isexists = action.payload.Isexists
            state.question = action.payload.question;
        })
        builder.addCase(fetchfullQues.pending, (state, action) => {
            state.isQLoading = true;
        })
        builder.addCase(fetchAnswers.pending, (state, action) => {
            state.isALoading = true;
        });
        builder.addCase(fetchAnswers.fulfilled, (state, action) => {
            state.isALoading = false;
            state.answers = action.payload.answers;
        });
        builder.addCase(fetchAnswers.rejected, (state, action) => {
            state.isError = true;
        });
        builder.addCase(UpdateAnswerQstate.fulfilled, (state, action) => {
            state.question = action.payload.question;
        });
        builder.addCase(UpdateAnswerAstate.fulfilled, (state, action) => {
            state.answers = state.answers.map((item) =>
                item._id === action.payload._id ? action.payload : item
            )
        })
    }
})


export default AnswerSlice.reducer;