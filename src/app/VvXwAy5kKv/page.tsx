"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
            });
            if (error) {
                console.error("Login error:", error);
                return;
            }
            router.push("/VvXwAy5kKv/main");
        } catch (error) {
            console.error("Error during login:", error);
        }
    };
    return (
        <div className="text-white w-screen h-screen
        flex flex-col items-center justify-center">
            <h1>Admin Page</h1>
            <p>Hi Bro! You discovered this mf page! Wow! Good Luck!</p>
            <form onSubmit={handleSubmit} className="flex flex-col
            p-6 rounded-lg w-[320px] 
            backdrop-blur-sm">
                <input type="text" placeholder="Enter admin mail"
                className="mt-4 px-4 py-2 rounded-md bg-white/10 border border-white/20
                focus:outline-none focus:ring-2 focus:ring-blue-500
                placeholder:text-gray-400 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Enter admin password"
                className="mt-4 px-4 py-2 rounded-md bg-white/10 border border-white/20
                focus:outline-none focus:ring-2 focus:ring-blue-500
                placeholder:text-gray-400 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
                <button 
                type="submit"
                className="mt-6 px-6 py-2 bg-blue-600 rounded-md
                hover:bg-blue-700 transition-colors">
                    Login
                </button>
            </form>
        </div>
    );
}