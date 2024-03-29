import './App.css'
import 'antd/dist/reset.css'
import {Lamp} from "@/components/ui/lamp.tsx";
import {useDispatch, useSelector} from "react-redux";
import Entry from "@/components/ui/entry.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {filterFilesByName} from "@/utils/filterFilesByName.ts";
import {CloseOutlined, FileAddOutlined, FolderAddOutlined} from "@ant-design/icons";
import {TFiles} from "../types";
import {RootState} from "@reduxjs/toolkit/query";
import {fileData, removeBlur} from "@/slices/slice.ts";


function App() {
    // @ts-ignore
    const files = useSelector((state: RootState) => state.slice.fileData)
    // @ts-ignore
    const isBlurredBg = useSelector((state: RootState) => state.slice.isBlurredBg)
    // @ts-ignore
    const activeEntry = useSelector((state: RootState) => state.slice.isActive)
    const [activeItem, setActiveItem] = useState('');
    const [inputValue, setInputValue] = useState('')
    const [debouncedValue, setDebouncedValue] = useState('');
    // const [files, setFiles] = useState(filesData)
    const dispatch = useDispatch();


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue]);


    const insertIntoChildren = (data: TFiles, entryName: string, newChild: TFiles): boolean => {
        if (data.name === entryName) {
            if (data.children) {
                data.children.push(newChild);
            }
            return true;
        } else if (data.children) {
            for (const child of data.children) {
                const inserted = insertIntoChildren(child, entryName, newChild);
                if (inserted) {
                    return true;
                }
            }
        }
        return false;
    };

    const removeFromChildren = (data: TFiles, entryName: string): boolean => {
        if (data.children) {
            const index = data.children.findIndex(child => child.name === entryName);
            if (index !== -1) {
                data.children.splice(index, 1);
                return true;
            }
            for (const child of data.children) {
                if (removeFromChildren(child, entryName)) {
                    return true;
                }
            }
        }
        return false;
    };

    const handleFolderAdd = () => {
        const entryName = activeEntry.name
        const cloneDeep = JSON.parse(JSON.stringify(files));
        const newChild: TFiles = {name: `newDirectory(${Math.floor(Math.random() * 1010)})`, children: []};
        insertIntoChildren(cloneDeep, entryName, newChild);
        dispatch(fileData(cloneDeep))
    }

    const handleFileAdd = () => {
        const entryName = activeEntry.name
        const cloneDeep = JSON.parse(JSON.stringify(files));
        const newChild: TFiles = {name: `newFile(${Math.floor(Math.random() * 1010)})`};
        insertIntoChildren(cloneDeep, entryName, newChild);
        dispatch(fileData(cloneDeep))
    }

    const handleDeleteFileOrFolder = () => {
        const entryName = activeEntry.name
        const cloneDeep = JSON.parse(JSON.stringify(files));
        removeFromChildren(cloneDeep, entryName);
        dispatch(fileData(cloneDeep))
    }


    return (
        <>

            <Lamp/>
            {isBlurredBg &&
                <>
                    <div
                        className='w-full h-full fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl'>
                        <CloseOutlined
                            onClick={() => dispatch(removeBlur())}
                            className='p-2.5 absolute top-0 right-0 text-black dark:text-white text-2xl font-medium tracking-tight text-transparent'/>
                        <div className='w-80 flex flex-col gap-4'>
                            <Input onChange={handleInputChange} value={inputValue} id="firstname" placeholder="Search"
                                   type="text"/>
                            <div>
                                <div
                                    className='flex flex-row-reverse gap-2  text-black dark:text-white text-2xl font-medium tracking-tight text-transparent'>
                                    <FileAddOutlined
                                        onClick={handleFileAdd}
                                        className='cursor-pointer hover:text-black dark:hover:text-lime-500 hover:opacity-100'/>
                                    <FolderAddOutlined
                                        onClick={handleFolderAdd}
                                        className='cursor-pointer hover:text-black dark:hover:text-lime-500 hover:opacity-100'/>
                                </div>
                                {filterFilesByName(files.children, debouncedValue)?.map((entry: TFiles, index) => (
                                    <Entry entry={entry} depth={1} setActiveItem={setActiveItem}
                                           key={(entry.name + index)}
                                           activeItem={activeItem}
                                           file={files}
                                           handleDeleteFileOrFolder={handleDeleteFileOrFolder}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default App
