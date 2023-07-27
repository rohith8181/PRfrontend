import React from 'react';
import { useSelector } from 'react-redux';

function Pagination({ handlePageChange }) {
    const currentPage = useSelector((state) => state.Questions.currentPage);
    const questioncount = useSelector((state) => state.Questions.data.questioncount);
    const totalPages = Math.ceil(questioncount / 10);

    const toRange = currentPage === totalPages ? questioncount : currentPage * 10;

    if (totalPages === 1) {
        return null;
    }

    return (
        <div className="flex flex-col items-center">
            <span className="text-sm text-gray-800">
                Showing <span className="font-semibold text-red-900">{((currentPage - 1) * 10) + 1}</span> to{' '}
                <span className="font-semibold text-red-900">{toRange}</span> of{' '}
                <span className="font-semibold text-red-900">{questioncount}</span> Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
                <button
                    onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    Prev
                </button>
                <button
                    onClick={() =>
                        handlePageChange(currentPage < totalPages ? currentPage + 1 : currentPage)
                    }
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    Next
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5 ml-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Pagination;