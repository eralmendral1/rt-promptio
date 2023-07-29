'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const { data: session } = useSession()
    const isUserLoggedIn = session?.user

    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(true)


    useEffect(() => {
        const setupProviders = async () => {
            const response = await getProviders()
            setProviders(response)
        }

        setupProviders()
    }, [])

    return (
        <nav className="flex flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/assets/images/logo.svg"
                    width={32} height={32} alt="Promptio" className="object-contain" />
                <p className="logo_text">Promptio</p>
            </Link>

            <div className="sm:flex hidden">
                {isUserLoggedIn ? (
                    <div className='flex grap-3 md:gap-5'>
                        <Link className="black_btn" href="/create-prompt">
                            Create Prompt
                        </Link>

                        <button type="button" onClick={signOut} className="outline_btn">
                            Sign Out
                        </button>


                        <Link href="/profile">
                            <Image src={session?.user.image} width={37} height={37}
                                className='rounded-full' alt="Profile Photo" />
                        </Link>
                    </div>
                ) : <>
                    {
                        providers && Object.values(providers).map(provider => (
                            <button type="button" key={provider.name} onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                                Sign In
                            </button>
                        ))
                    }
                </>}
            </div>


            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {isUserLoggedIn ? (
                    <div >

                        <Image src={session?.user?.image}
                            width={37} height={37}
                            className="rounded-full z-10"
                            alt="profile"
                            onClick={() => setToggleDropdown(value => !value)}
                        />

                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link href="/profile" className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}>
                                    My Profile
                                </Link>

                                <Link href="/create-prompt" className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}>
                                    Create Prompt
                                </Link>

                                <button type="button" onClick={() => {
                                    setToggleDropdown(false)
                                    signOut()
                                }}
                                    className="mt-5 w-full black_btn">
                                    Signout
                                </button>
                            </div>


                        )}
                    </div>
                ) : <>
                    {
                        providers && Object.values(providers).map(provider => (
                            <button type="button"

                                key={provider.name} onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                                Sign In
                            </button>
                        ))
                    }
                </>}
            </div>
        </nav>
    )
}

export default Nav