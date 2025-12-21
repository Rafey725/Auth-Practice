'use client'

import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "../../config/api";
import { useForm } from 'react-hook-form'

export function LoginForm() {

    interface SignupFormValues {
        email: string;
        password: string;
    }

    const [error, setError] = useState<string | null>();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<SignupFormValues>()

    const fetchFunction = async (email: string, pass: string) => {
        let res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.trim(),
                pass: pass.trim(),
            })
        })
        let data = await res.json()
        if (data.message.endsWith('exists')) {
            setError(data.message)
        } else {
            setError(null)
        }

        if (!res.ok) return

        // Store the access token in local storage
        localStorage.setItem('Access_Token', data.token)

        console.log('Your Token:', data.token);

        console.log(data.message)

    }

    const handleFormSubmit = async (data: any) => {
        await fetchFunction(data.email, data.password)
        // error === null && reset()
    }

    return (
        <form
            className="grid gap-5"
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <div>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">Login</h1>
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                    {...register('email', { required: 'Email is required' })}
                    className="w-full rounded-lg border border-white/50 px-3 py-2 text-sm"
                />
                {error && <p className="text-red-500 text-sm pl-2">*{error}</p>}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Password</label>
                <input
                    {...register('password', { required: 'Password is required' })}
                    className="w-full rounded-lg border border-white/50 px-3 py-2 text-sm"
                />
            </div>

            <button
                className="rounded-lg bg-black py-2 text-sm font-semibold text-white disabled:opacity-60 cursor-pointer hover:bg-black/50   "
            >
                Login
            </button>
        </form>
    )
}
