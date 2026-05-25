import Link from "../link";

export default function Mobile() {
    return (
        <div className="md:hidden absolute inset-0 
        h-screen w-full font-fira-code
        flex flex-col items-center justify-center z-999
         bg-black text-white text-center p-4">
            <div className="text-base font-bold">
                <span className="text-terminal-aqua">RaxOS</span> <span className="text-terminal-red">v1.0.0</span> is not currently supported on mobile due to its advanced AI features.
                I'm currently working on how to optimize the model to run on no GPU at all.
                <br />
                <br />
                Here's my contact info if interested:
                <br />
                - <Link
                    text="github.com/raxhacks"
                    href="https://github.com/raxhacks"
                />
                <br />
                - <Link
                    text="raxhacksofficial@gmail.com"
                    href="mailto:raxhacksofficial@gmail.com"
                />
                <br />
                - <Link
                    text="linkedin.com/in/rgzmn"
                    href="https://linkedin.com/in/rgzmn"
                />
            </div>
        </div>
    );
}