
interface ButtonProps {
    label: string;
}
export default function Button({
    label
}: ButtonProps) {
    return (
        <button className="border border-white h-10 w-64 
        flex items-center relative px-2 justify-center 
        hover:bg-white hover:text-black
        cursor-pointer font-fira-code text-white overflow-hidden">
            {label}
        </button>
    );
}