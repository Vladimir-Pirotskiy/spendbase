// type BaseItem = {
//     id: string;
//     name: string;
// };
//
// type File = BaseItem & {
//     type: 'file';
//     extension: string;
// };
//
// export type Folder = BaseItem & {
//     type: 'folder';
//     children: File[];
// };
//
export type TFiles = {
    name: string;
    children?: TFiles[]
}

export const files: TFiles = {
    name: "root",
    children: [
        {
            name: "node_modules",
            children: [
                {
                    name: ".bin"
                },
                {
                    name: ".cache"
                }
            ]
        },
        {
            name: "public",
            children: [
                {
                    name: "index.html"
                },
                {
                    name: "robots.tsx"
                }
            ]
        },
        {
            name: "src",
            children: [
                {
                    name: "components",
                },
            ]
        }
    ]
}

// export type Item = File | Folder;