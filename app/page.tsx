import Header from "@/components/home/v2/Header"

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-white text-black">
            <main className="flex-1">
                <div className="container mt-20">
                    <h1 className="text-4xl underline 
                    mb-10 w-[600px]">
                        Raymundo Guzmán
                    </h1>
                    <Header />
                </div>  
            </main>
        </div>
    )
}
