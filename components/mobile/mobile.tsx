export default function Mobile() {
    return (
        <div className="md:hidden absolute inset-0 h-screen w-full 
        flex flex-col items-center justify-center z-[999] bg-black text-white text-center p-4">
            <div className="text-2xl font-bold">Sorry, my website is not available on mobile. Working on it!</div>
        </div>
    );
}