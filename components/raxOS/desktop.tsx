import RaxOSHeader from "../header";
import Terminal from "../terminal/terminal";

export default function Desktop() {
    return (
        <div className="w-full h-screen flex flex-col
        items-center justify-center text-white">
            <Terminal />
        </div>
    );
}