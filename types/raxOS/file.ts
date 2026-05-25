export enum FileType {
    TEXT = "text",
    MARKDOWN = "markdown",
    BINARY = "binary"
}

export interface File {
    name: string;
    content: string;
    type: FileType;
    path: string;
    createdAt: Date;
    updatedAt: Date;
}
