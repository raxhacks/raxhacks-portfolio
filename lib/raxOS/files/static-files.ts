import { File, FileType } from "@/types/raxOS/file";

export const about: File = {
    name: "about.txt",
    type: FileType.TEXT,
    content: "Thanks for your interest in my work. Bye!",
    path: "/",
    createdAt: new Date(),
    updatedAt: new Date()
}