import { Project } from "@/types/project";
import ProjectContainer from "./project-container";

export default function Projects() {
    const projects: Project[] = [
        {
            projectName: <div className="text-[100px] font-space-grotesk font-bold tracking-tighter leading-none text-[#EE5D28]">Scholarvy</div>,
            personalTitle: "Co-Founder & CTO"
        },
        {
            projectName: <div className="text-[80px] font-family-special-elite tracking-tighter leading-none">Off the Record</div>,
            personalTitle: "Co-Founder"
        }
    ]
    return (
        <div className="w-full">
            {
                projects.map((project, i) => (
                    <ProjectContainer
                        key={i}
                        projectName={project.projectName}
                        personalTitle={project.personalTitle}
                    />
                ))
            }
        </div>
    );
}