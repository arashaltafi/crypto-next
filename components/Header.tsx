"use client"

import Image from 'next/image'
import React from 'react'

const Header = () => {

    const handleTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark')
        } else {
            document.documentElement.classList.add('dark')
        }
    }

    return (
        <div className='w-full px-16 py-8 flex items-center justify-between'>
            <h1 className='text-center text-4xl font-bold'>Crypto App 334</h1>

            <Image
                onClick={handleTheme}
                className='cursor-pointer'
                src={'/icons/icon.png'}
                alt='crypto logo'
                width="78"
                height="78"
            />
        </div>
    )
}

export default Header