'use client'

import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "../../config/api";
import { useForm } from 'react-hook-form'

export function SignupForm() {

    interface SignupFormValues {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
        acceptTerms: boolean;
    }

    const [error, setError] = useState<string | null>();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<SignupFormValues>()

    const fetchFunction = async (email: string, pass: string, username: string) => {
        let res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.trim(),
                pass: pass.trim(),
                username: username.trim()
            })
        })
        let data = await res.json()
        // if (data.message.endsWith('exists')) {
        //     setError(data.message)
        // } else {
        //     setError(null)
        // }
        console.log(data.message)
    }

    const handleFormSubmit = async (data: any) => {
        await fetchFunction(data.email, data.password, data.name)
        error === null && reset()
    }

    return (
        <form
            className="grid gap-5"
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <div>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">Create you account</h1>
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Full name</label>
                <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full rounded-lg border border-white/50 px-3 py-2 text-sm"
                />
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

            <div>
                <label className="mb-1 block text-sm font-medium">
                    Confirm password
                </label>
                <input
                    {...register('confirmPassword', { required: 'Password is required' })}
                    className="w-full rounded-lg border border-white/50 px-3 py-2 text-sm"
                />
            </div>

            <label className="flex items-start gap-2 text-sm">
                <input
                    type="checkbox"
                    name="checkbox"
                    required
                />
                I agree to the Terms & Privacy Policy
            </label>

            <button
                className="rounded-lg bg-black py-2 text-sm font-semibold text-white disabled:opacity-60 cursor-pointer hover:bg-black/50   "
            >
                Create account
            </button>
        </form>
    )
}
