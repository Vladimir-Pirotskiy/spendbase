import {describe, expect, it} from "vitest";
import {TFiles} from "../types";
import {filterFilesByName} from "../src/utils/filterFilesByName";

const files: TFiles = {
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

function collectNames(file: TFiles): string[] {
    const names = [file.name];
    if (file.children) {
        for (const child of file.children) {
            names.push(...collectNames(child));
        }
    }
    return names;
}

function generateQueries(names: string[], count: number): string[] {
    const queries: string[] = [];
    const maxIndex = names.length - 1;

    for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * maxIndex); // Generate random index
        queries.push(names[index]);
    }

    return queries;
}


const names = collectNames(files);
const testQueries = generateQueries(names, 10);


describe('#Search_Filter_Input', () => {
    testQueries.forEach((query) => {
        const result = filterFilesByName(files.children, query);
        console.log(result);
        it(`should process input: ${query}`, () => {
            expect(result?.every((i) => 'name' in i && 'children' in i)).toBe(true);
        });
        it(`should check that the result is an array`, () => {
            expect(Array.isArray(result)).toBe(true);
        });
        it(`should check that every item in the array is an object`, () => {
            expect(result?.every((i) => typeof i === 'object')).toBe(true);
        });
        it(`should check that every result have a name property`, () => {
            expect(result?.every((i) => 'name' in i)).toBe(true);
        });
        it(`should verify name property and children if present, as array in each object.`, () => {
            expect(result?.every((i) => 'name' in i && (!('children' in i) || Array.isArray(i.children)))).toBe(true);
        });

    });
});
//