import Sidebar from './Sidebar';
import { Timeline } from './Timeline';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function Experiences({ className }: { className?: string }) {
    return (
        <div className={`${className} border bg-card rounded-lg h-full flex flex-col 
        overflow-hidden p-4`}>
            <div className="text-2xl font-bold flex items-center">
                <span>
                    Some Projects
                </span>
                <span className="ml-2 text-[10px] text-white border border-white rounded-full
                w-4 h-4 inline-flex items-center justify-center">
                    i
                </span>
            </div>
        </div>
    );
}
