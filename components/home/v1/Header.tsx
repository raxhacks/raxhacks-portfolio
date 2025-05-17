import Link from 'next/link';
import { Button } from '../ui/button';

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-10 border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="text-xl font-bold">
                    <span className="text-zinc-100">Raxhacks</span>
                </Link>
                <nav className="hidden md:block">
                    <ul className="flex space-x-8">
                        <li>
                            <Link href="#about" className="text-sm text-zinc-400 transition-colors hover:text-white">
                            About
                            </Link>
                        </li>
                        <li>
                            <Link href="#projects" className="text-sm text-zinc-400 transition-colors hover:text-white">
                            Projects
                            </Link>
                        </li>
                        <li>
                            <Link href="#skills" className="text-sm text-zinc-400 transition-colors hover:text-white">
                            Skills
                            </Link>
                        </li>
                        <li>
                            <Link href="#contact" className="text-sm text-zinc-400 transition-colors hover:text-white">
                            Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-zinc-700 text-zinc-400 hover:bg-zinc-900 hover:text-white"
                >
                    Resume
                </Button>
            </div>
        </header>
    );
}

export default Header;