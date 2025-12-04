import supabase from '@/lib/supabase';

export async function uploadFile(file: File, path: string) {
    try {
        const { data, error } = await supabase.storage
            .from('portfolio')
            .upload(path, file);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}

export async function getFileUrl(path: string) {
    try {
        const { data } = supabase.storage
            .from('portfolio')
            .getPublicUrl(path);

        return data.publicUrl;
    } catch (error) {
        console.error('Error getting file URL:', error);
        throw error;
    }
}

export async function getFilesInFolder(folderPath: string) {
    try {
        const { data, error } = await supabase.storage
            .from('portfolio')
            .list(folderPath);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error listing files in folder:', error);
        throw error;
    }
}

export async function deleteFile(path: string) {
    try {
        const { data, error } = await supabase.storage
            .from('portfolio')
            .remove([path]);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error deleting file:', error);
        throw error;
    }
}