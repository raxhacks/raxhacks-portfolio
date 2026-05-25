"use client";

import { useState } from "react";

import Input from "@/components/input";
import ProfilePic from "@/components/profile-pic";
import Button from "@/components/button";

export default function Page() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    return (
        <div className="relative w-full h-screen">
            <div className="absolute top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-60 w-fit flex flex-col 
            items-center gap-4">
                <ProfilePic />
                <div className="">
                    <label>
                        Username
                    </label>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="">
                    <label>
                        Password
                    </label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button
                    label={"Log In"}
                />
            </div>
        </div>
    );
}   