import React from 'react'

function Time({ time }) {
    const options = { day: 'numeric', year: 'numeric', month: 'long' };
    return (
        <span>
            {new Date(time).toLocaleString(undefined, options)}
        </span>
    )
}

export default Time