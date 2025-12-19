import React, { useCallback, useId, useMemo, useState } from "react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignUpForm";

export default function AuthShell() {

    const [authMode, setAuthMode] = useState('login')

    const title = authMode === "login" ? 'Login' : 'Sign Up'

    return (
        <main className="min-h-100 h-full bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
            <div className="mx-auto w-full h-full max-w-6xl px-4 pt-20">
                <div className="grid items-stretch h-full gap-8 lg:grid-cols-2">
                    {/* Left: Value props */}
                    <section className="hidden lg:block">
                        <div className="h-full rounded-2xl border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <header className="max-w-md">
                                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Account</p>
                                <h1 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h1>
                            </header>

                            <div className="mt-8">
                                <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">What you get</h2>
                            </div>

                            <div className="mt-10 rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
                                <p className="text-sm text-zinc-700 dark:text-zinc-200">
                                    Tip: Keep auth errors generic to avoid leaking whether an email exists.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Right: Auth card */}
                    <section aria-label="Authentication" className="flex items-center flex-col">
                        <div className="flex h-15 w-full gap-5 mb-5">
                            <button onClick={() => setAuthMode('signup')}
                                className={`w-full h-full bg-black rounded-lg ${authMode === 'signup' ? 'border' : ''}`}
                            >Sign up</button>
                            <button onClick={() => setAuthMode('login')}
                                className={`w-full h-full bg-black rounded-lg ${authMode === 'login' ? 'border' : ''}`}
                            >Login</button>
                        </div>
                        <div
                            className="w-full rounded-2xl border px-7 pb-7 border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                        >

                            {authMode === 'login'
                                ? <LoginForm />
                                : <SignupForm />
                            }

                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

