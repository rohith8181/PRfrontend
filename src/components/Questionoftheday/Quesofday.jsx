import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
function Quesofday() {
    const params = useParams();
    const [question, setquestion] = useState('');

    const getquestion = async () => {
        const randomNumber = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
        const { data } = await axios.get(`https://dummyjson.com/quotes/${randomNumber}`);
        setquestion(data.quote);
    }
    useEffect(() => {
        getquestion();
    }, [params])

    return (
        <div className="qofthday pt-5 pb-5">
            <div className="qandacard sm:max-w-xl w-[100%] shadow-lg rounded text-center text-white  p-4 bg-gradient-to-r from-[#363636] to-[#a00f0f] m-auto">
                <span className='font-bold text-2xl font-mono'>Quote of the Day</span>
                <div className="question text-center pb-2">
                    <span className='text-[16px] font-semibold hover:border-b border-white cursor-pointer'>
                        {question}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Quesofday