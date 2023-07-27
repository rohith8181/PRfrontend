import { configureStore } from "@reduxjs/toolkit";
import Userreducer from "./Slices/UserSlice";
import Questionreducer from "./Slices/QuestionSlice";
import Alluserreducer from "./Slices/AlluserSlice";
import Answerreducer from "./Slices/AnswerSlice";
import Searchuserreducer from "./Slices/SearchuserSlice";
import Petitionreducer from "./Slices/PetitionSlice";
import Postreducer from "./Slices/AcademicPostsSlice";
import Sortreducer from "./Slices/SortSlice";

export const store = configureStore({
    reducer: {
        UserInfo: Userreducer,
        Questions: Questionreducer,
        AllUserInfo: Alluserreducer,
        Answers: Answerreducer,
        SelectedUserInfo: Searchuserreducer,
        Petitions: Petitionreducer,
        Posts: Postreducer,
        Sort: Sortreducer,
    }
})