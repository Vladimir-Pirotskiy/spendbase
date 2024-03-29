import {TFiles} from "./types";

export const filesData: TFiles = {
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
                    name: "comp",
                    children: [
                        {
                            name: "ui",
                            children: [
                                {
                                    name: "lamp",
                                },
                            ]
                        },
                        {
                            name: "utils",
                            children: []
                        },
                    ]
                }

            ]
        },
        {
            name: "assets",
            children: [
                {
                    name: "img",
                    children: []
                },
            ]
        }
    ]
}