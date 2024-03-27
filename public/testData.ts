import {Folder} from "../types";

const exampleFolder: Folder = {
    id: "unique_folder_id",
    name: "Folder Name",
    type: "folder",
    children: [
        {
            id: "unique_file_id",
            name: "File Name",
            type: "file",
            extension: ".txt"
        },
        {
            id: "unique_folder_id_2",
            name: "Subfolder Name",
            type: "folder",
            children: []
        }
    ]
};

export default exampleFolder;
