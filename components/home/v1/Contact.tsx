import { Button } from "../ui/button";

const Contact: React.FC = () => {
    return (
        <section id="contact" className="border-t border-zinc-800 py-20">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">Get In Touch</h2>
                    <p className="mb-8 text-zinc-400">
                        If you're interested in working together or making me an offer, please reach out.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button className="bg-zinc-100 text-black hover:bg-white">Send Message</Button>
                        <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:bg-zinc-900 hover:text-white">
                            raxhacksofficial@gmail.com
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;