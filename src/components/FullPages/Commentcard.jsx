import React from 'react'
import Time from '../buttons/Time'
import { BASE_URL } from '../../helper'

function Commentcard({ comment }) {
    return (
        <div className="p-6 mb-6 text-base border-t border-gray-700 rounded-lg bg-gray-900">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={`${BASE_URL}/${comment.userId.Profilepic}`}
                            alt="Michael Gough" />{comment.userId.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><Time time={comment.createdAt} /></p>
                </div>
            </div>
            <p>{comment.content}</p>
        </div>
    )
}

export default Commentcard