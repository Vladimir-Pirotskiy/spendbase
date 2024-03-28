import {TFiles} from "../../types";

export const filterFilesByName = (files: TFiles[] | undefined, query: string): TFiles[] | undefined => {
    if (!query || !files) return files;

    const filteredFiles: TFiles[] = [];

    files.forEach(file => {
        if (file.name.includes(query.toLowerCase())) {
            filteredFiles.push({...file});
            return;
        }

        if (file.children) {
            const filteredChildren = filterFilesByName(file.children, query);

            if (filteredChildren && filteredChildren.length > 0) {
                filteredFiles.push({...file, children: filteredChildren});
            }
        }
    });

    return filteredFiles;
};