import React, { useState, useEffect } from 'react';

function SupportAnimation({ Support }) {
    const [count, setCount] = useState(0);
    let delay = 20;
    if (Support > 50 && Support < 200) {
        delay = 10;
    }
    else if (Support > 200) {
        delay = 1;
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount >= Support) {
                    clearInterval(interval); // Stop the interval when count reaches the maximum value
                    return prevCount;
                } else {
                    return prevCount + 1; // Increment count by 1
                }
            });
        }, delay); // Delay between each count increment (1 second)

        return () => {
            clearInterval(interval); // Clean up the interval on component unmount
        };
    }, [Support]);

    return (
        <div className='w-16 h-16 cursor-default rounded-full bg-gradient-to-r from-red-900 to-blue-900 text-center items-center flex'>
            <span className='stats-number text-white text-3xl font-mono w-[100%]'>{count}</span>
        </div>
    );
}

export default SupportAnimation