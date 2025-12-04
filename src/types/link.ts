// Link type interface (the link types like GitHub, Demo, etc.)
export interface ILink {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

// Project link interface (junction table with URL)
export interface IProjectLink {
    id: string;
    project_id: string;
    link_id: string;
    url: string;
    created_at: Date;
    updated_at: Date;
}
