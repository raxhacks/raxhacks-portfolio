import ExperienceTable from "./components/ExperienceTable";
import LinksTable from "./components/LinksTable";
import ProjectsTable from "./components/ProjectsTable";
import TagsTable from "./components/TagsTable";

export default function MainAdminPage() {
    return (
        <div className="p-8 shadow text-white">
            <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
            <p>Welcome to the admin panel mf. GG!</p>
            <ExperienceTable />
            <ProjectsTable />
            <TagsTable />
            <LinksTable />
        </div>
    );
}