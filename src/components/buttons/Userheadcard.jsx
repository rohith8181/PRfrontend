import React from 'react'
import { BASE_URL } from '../../helper'

function Userheadcard({ emailcolor, timecolor, item }) {

    return (
        <>
            <img className="w-10 h-10 rounded-full" src={`${BASE_URL}/images/defaultprofile.png`} />
            <div className="ml-2 mt-0.5 flex flex-col">
                <span className={`font-medium text-sm leading-snug text-${emailcolor}`}>{item.userId.email}</span>
                <span className={`text-xs text-${timecolor}-400 font-light leading-snug`}>{new Date(item.createdAt).toLocaleString()}</span>
            </div>
        </>
    )
}

export default Userheadcard