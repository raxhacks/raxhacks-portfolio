export interface ITag {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

// Project tag interface (junction table)
export interface IProjectTag {
    id: string;
    project_id: string;
    tag_id: string;
    created_at: Date;
    updated_at: Date;
}
