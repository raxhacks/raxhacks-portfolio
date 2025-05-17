import { TimelineLayout } from '@/components/timeline';
import { GitPullRequest, GitBranch } from 'lucide-react';

import OracleLogo from "@/public/OracleLogo"
import MicrosoftLogo from "@/public/MicrosoftLogo"

const Experience: React.FC = () => {
  return (
    <TimelineLayout
    animate
    className="w-full max-w-2xl mx-auto px-8 flex items-center justify-center"
    connectorColor="primary"
    iconColor="primary"
    items={[
        {
        color: "primary",
        date: '2023-09 to 2024-03',
        description: 'Software Engineer Intern',
        icon: <>Z</>,
        id: 1,
        status: 'completed',
        title: 'Zurii',
        },
        {
        color: "primary",
        date: '2024-07 to 2025-01',
        description: 'Software Engineer Intern',
        icon: <OracleLogo />,
        id: 2,
        status: 'in-progress',
        title: 'Oracle'
        },
        {
        color: "primary",
        date: '2025-02 to currently',
        description: 'Software Engineer Intern',
        icon: <MicrosoftLogo />,
        id: 3,
        status: 'pending',
        title: 'Microsoft'
        }
    ]}
    size="md"
    />
  );
}

export default Experience;