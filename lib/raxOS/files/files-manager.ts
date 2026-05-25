import { about } from "./static-files";

export function getStaticFileContent(absPath: string): string | null {
    switch (absPath) {
        case "/about.txt":
            return about.content;
        default:
            return null;
    }
}

export function listFilesInPath(path: string): string[] {
    switch (path) {
        case "/":
            return ["about.txt"];
        default:
            return [];
    }
}