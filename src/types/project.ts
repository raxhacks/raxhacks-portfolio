import { IImage } from './image';
import { ITag } from './tag';
import { ILink, IProjectLink } from './link';

export interface IProject {
    id: string;
    name: string;
    project_logo_url: string | null;
    year: number;
    description: string | null;
    created_at: Date;
    updated_at: Date;
}

export interface IProjectWithRelations extends IProject {
    images: Pick<IImage, 'id' | 'image_url'>[];
    tags: Pick<ITag, 'id' | 'name'>[];
    links: (Pick<IProjectLink, 'id' | 'url'> & Pick<ILink, 'name'>)[];
}