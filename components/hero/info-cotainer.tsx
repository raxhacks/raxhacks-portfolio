import { ReactNode } from "react"

interface InfoContianerParams {
    children: ReactNode;
}
export default function InfoContainer(
    { children }: InfoContianerParams
) {
    return (
        <div className="w-full h-screen text-9xl relative border border-[red]">
            <div className="absolute w-[50%] border border-[blue] right-0 h-full p-4">
                {children}
            </div>
        </div>
    );
}