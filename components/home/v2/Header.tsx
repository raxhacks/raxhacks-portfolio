import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Contact from "./Contact";

interface CustomTabsTriggerProps {
    value: string;
    children: React.ReactNode;
}
const CustomTabsTrigger: React.FC<CustomTabsTriggerProps> = ({ value, children }) => {
    return (
        <TabsTrigger 
        value={value}
        className="w-full
        rounded-none
        data-[state=active]:text-black
        data-[state=active]:shadow-none
        data-[state=active]:bg-transparent
        data-[state=active]:border-b-2
        data-[state=active]:border-black
        ">
            {children}
        </TabsTrigger>
    );
}

const Header: React.FC = () => {
    const tabs = [
        {
            value: "about",
            label: "About",
            component: <About />
        },
        {
            value: "experience",
            label: "Experience",
            component: <Experience />
        },
        {
            value: "projects",
            label: "Projects",
            component: <Projects />
        },
        {
            value: "contact",
            label: "Contact",
            component: <Contact />
        }
    ]
    return (
        <header className="w-[600px]">
            <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full bg-transparent">
                    <CustomTabsTrigger value="about">
                        About
                    </CustomTabsTrigger>
                    <CustomTabsTrigger value="experience">Experience</CustomTabsTrigger>
                    <CustomTabsTrigger value="projects">Projects</CustomTabsTrigger>
                    <CustomTabsTrigger value="contact">Contact</CustomTabsTrigger>
                </TabsList>
                {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value}>
                        {tab.component}
                    </TabsContent>
                ))}
            </Tabs>
        </header>
    );
}

export default Header;