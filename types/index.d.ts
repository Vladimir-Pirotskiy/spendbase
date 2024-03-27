type BaseItem = {
    id: string;
    name: string;
};

type File = BaseItem & {
    type: 'file';
    extension: string;
};

export type Folder = BaseItem & {
    type: 'folder';
    children: File[];
};

// export type Item = File | Folder;