/**
 * The desktop header contains the current time, date,
 *  network status, and battery percentage.
 */
export default function DesktopHeader() {
    return (
        <div className="absolute top-4 left-4 w-full flex 
        items-center text-white text-2xl">
            <span className="border px-1 leading-none mr-[0.025em]">
                R
            </span>
            <span className="tracking-wide">
                axOS
            </span>
            &nbsp;
            <span className="text-sm">
                v1.0.0
            </span>
        </div>
    );
}