import React from 'react'
import WebcamCapture from './WebCamComponent'

// npm i react-webcam
const WebcamSample = () => {
    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-start gap-16 p-8'>
            <h1 className='text-5xl'>Webcam</h1>

            <WebcamCapture />
        </div>
    )
}

export default WebcamSample