'use client'
import React from 'react'
import { Oval } from 'react-loader-spinner'

const loading = () => {
    return (
        <div className='h-screen w-full flex items-center justify-center p-5'>
            <Oval
                height={80}
                width={80}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}

            />
        </div>
    )
}

export default loading