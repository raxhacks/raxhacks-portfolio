"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function SignupPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { data, error } = await authClient.signUp.email({
                email,
                password,
                name,
            })

            if (error) {
                console.error("Signup error:", error)
                setError(error.message || "Signup failed")
                return
            }

            // Redirect to admin main page on success
            router.push("/VvXwAy5kKv/main")
        } catch (err: any) {
            console.error("Unexpected error during signup:", err)
            setError(err.message || "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">    
            <h1 className="text-4xl font-bold mb-8 text-gray-900">Sign Up</h1>
            <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                    <a
                        href="/VvXwAy5kKv"
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    >
                        Already have an account?
                    </a>
                </div>
            </form>
        </div>
    );
}