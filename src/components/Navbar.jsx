'use client'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { useSession } from 'next-auth/react'

const Navbar = () => {
    const { data } = useSession()

    const handleSignIn = () => {
        return signIn("google")
    }

    const handleSignOut = () => {
        return signOut()
    }

    return (
        <header className='flex items-center justify-between px-10 py-4 primary-bg'>
            <Link href={"/"} className='text-3xl font-extrabold '>ai<span className='text-orange-500'>tales</span></Link>
            <div className='flex gap-5 items-center'>
                <Link href={"/add"}>
                    add
                </Link>
                {data?.user ?
                    <button className='bg-orange-500 text-white py-2 px-3 rounded-lg'
                        onClick={handleSignOut}>
                        Log Out
                    </button>
                    :
                    <button className=' bg-orange-500 text-white py-2 px-3 rounded-lg'
                        onClick={handleSignIn}
                    >
                        Sign In
                    </button>}
            </div>
        </header>
    )
}

export default Navbar