import { Project } from "@/types/project";

interface ProjectContainerProps extends Project { }
export default function ProjectContainer({ projectName, personalTitle }: ProjectContainerProps) {

    return (
        <div className="w-full h-screen flex">
            <div className="w-[50%] h-full border border-[red] p-4">
                GG
            </div>
            <div className="w-[50%]  h-full border border-[blue] p-4">
                <div className="w-full">
                    <div className="">
                        {projectName}
                    </div>
                    <div className="w-full pl-[50px] text-3xl">
                        {personalTitle}
                    </div>
                </div>
            </div>
        </div>
    );
}