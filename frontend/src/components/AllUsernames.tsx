import React, { useState } from 'react'
import { API_URL } from '../../config/api'

const AllUsernames = () => {
    const [users, setUsers] = useState<{ name: string, role: string }[] | null>(null)
    const [tokenExpired, setTokenExpired] = useState(false)
    const [userInfo, setUserInfo] = useState<{ name: string, email: string, created_at: number, role: string } | null>(null)

    const seeAllUsers = async () => {
        // Get the token from the local storage to pass in the api request
        let token = localStorage.getItem('Access_Token')

        const res = await fetch(`${API_URL}/protected/seeUsers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()
        let allUsers = data.users?.map((item: { username: string, role: string }) => {
            return { name: item.username, role: `${item.username} is user` }
        })

        console.log(data.message);

        if (!res.ok) {
            return setTokenExpired(true)
        }

        setUsers(allUsers)
    }

    const seeUserInfo = async () => {
        // Get the token from the local storage to pass in the api request
        let token = localStorage.getItem('Access_Token')

        const res = await fetch(`${API_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        )
        const data = await res.json()

        setUserInfo(data.userInfo)
        console.log(data.message);
    }

    return (
        <>
            <div className='h-100 w-full flex px-5 gap-10'>
                <div className='h-full flex-1'>
                    <div className="h-full w-full rounded-2xl border border-zinc-200 bg-white px-10 py-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <header className="">
                            <div className='w-full flex justify-between items-center'>
                                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Accounts</p>
                                <button onClick={seeAllUsers} className='px-3 py-1 bg-black rounded-md text-xs font-semibold cursor-pointer hover:bg-black/30 text-white/70'>See all users</button>
                            </div>
                            <h1 className="text-3xl font-semibold tracking-tight">All users:</h1>
                        </header>

                        <div className='h-full max-h-70 mt-5 '>
                            <ul className='space-y-2'>
                                {users?.map((user, idx) => (
                                    <li key={idx} className='w-full flex min-h-15 items-center px-5 justify-between rounded-sm bg-white/10'>
                                        <h2 className='text-xl font-bold text-white/50'>{user.name}</h2>
                                        <p className='text-sm font-bold text-black/80'>{user.role}</p>
                                    </li>
                                )
                                )}
                            </ul>
                        </div>

                        {/* Render a message when token expires */}
                        <div className={`fixed top-0 left-0 max-w-screen max-h-screen flex justify-center items-center bg-black/70 z-100
                        ${tokenExpired
                                ? 'w-full h-full opacity-100 pointer-events-auto'
                                : 'w-0 h-0 opacity-0 pointer-events-none'}
                        `}>
                            <div className={`w-130 h-50 rounded-2xl bg-white/50 transition-transform duration-100 flex gap-3 flex-col justify-center items-center ${tokenExpired ? 'translate-y-0' : 'translate-y-20'}`}>
                                <h2 className='text-black text-3xl font-bold'>Please login again</h2>
                                <button onClick={() => setTokenExpired(false)} className='w-30 h-10 pb-1 text-white/70 text-xl rounded-lg cursor-pointer flex justify-center items-center font-bold bg-black'>Go back</button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='h-full flex-1'>
                    <div className="h-full w-full rounded-2xl border border-zinc-200 bg-white px-10 py-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <header className="">
                            <div className='w-full flex justify-between items-center'>
                                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Your Account</p>
                                <button onClick={seeUserInfo} className='px-3 py-1 bg-black rounded-md text-xs font-semibold cursor-pointer hover:bg-black/30 text-white/70'>See your profile</button>
                            </div>
                            <div className='space-y-2'>
                                <h2 className="text-xl font-semibold tracking-tight">Username:
                                    <span className='ml-2 text-white/70'>{userInfo ? userInfo?.name : '***'}</span>
                                </h2>
                                <h2 className="text-xl font-semibold tracking-tight">Email:
                                    <span className='ml-2 text-white/70'>{userInfo ? userInfo?.email : '***'}</span>
                                </h2>
                                <h2 className="text-xl font-semibold tracking-tight">Created at:
                                    <span className='ml-2 text-white/70'>{userInfo ? JSON.stringify(userInfo?.created_at).slice(1, 11) : '***'}</span>
                                </h2>
                            </div>
                        </header>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllUsernames