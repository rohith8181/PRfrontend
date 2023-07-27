import React, { useEffect } from 'react';
import QandAcard from '../QandAcard/QandAcard';
import "./Homepage.css"
import Sortbtn from '../Sortbutton/Sortbtn';
import Quesofday from '../Questionoftheday/Quesofday';
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestiondetails, setCurrentPage } from "../../redux/Slices/QuestionSlice";
import Pagination from './Pagination';
import Loading from '../LoadingComponent/Loading';
import Hastags from './Hastags';

const Home = () => {

  const dispatch = useDispatch();

  const currentPage = useSelector((state) => state.Questions.currentPage);
  const questions = useSelector((state) => state.Questions.data.Questions);

  const loading = useSelector((state) => state.Questions.isLoading);

  const Sort = useSelector((state) => state.Sort.sorttype);
  useEffect(() => {
    dispatch(fetchQuestiondetails({ page: currentPage, sorttype: Sort, hashtag: "" }));
    window.scrollTo(0, 0);
  }, [currentPage, Sort]);

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  return (
    <>
      <div className='mt-20 mx-3'>
        <Quesofday />
        <Sortbtn />
        <Hastags />
        {
          loading ? (
            <>
              <Loading />
            </>
          ) : (
            <div className='m-3'>

              {questions && questions.map((item) => (
                <QandAcard item={item} key={item._id} />
              ))}
            </div>
          )
        }

        <Pagination handlePageChange={handlePageChange} />
      </div>
    </>
  );
};

export default Home;
