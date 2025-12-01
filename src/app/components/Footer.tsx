export default function Footer() {
    return (
        <footer className="w-full border-t bg-card/50 backdrop-blur-sm px-4 py-2 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Raxhacks. All rights reserved.
        </footer>
    );
}