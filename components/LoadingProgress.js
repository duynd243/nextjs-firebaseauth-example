import React from 'react'

export default function LoadingProgress() {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white flex flex-col justify-center items-center h-screen">
            <progress class="progress progress-primary w-56"></progress>
            <div className='mt-4 font-medium'>Loading...</div>
        </div>
    )
}
