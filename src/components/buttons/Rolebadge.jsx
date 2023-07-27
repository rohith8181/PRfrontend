import React from 'react'

function Rolebadge({ role }) {
    return (
        <span className="bg-green-100 h-fit text-center text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-400">{role}</span>
    )
}

export default Rolebadge