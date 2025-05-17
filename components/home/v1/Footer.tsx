const Footer: React.FC = () => {
    return (
        <footer className="border-t border-zinc-800 py-8">
            <div className="container text-center text-sm text-zinc-500">
                <p>© {new Date().getFullYear()} Raxhacks. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;