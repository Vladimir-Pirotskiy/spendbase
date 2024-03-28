import './App.css'
import 'antd/dist/reset.css'
import {Lamp} from "@/components/ui/lamp.tsx";
import {useSelector} from "react-redux";
import Entry from "@/components/ui/entry.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {filterFilesByName} from "@/utils/filterFilesByName.ts";

type TFiles = {
    name: string;
    children?: TFiles[]
}

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


function App() {
    const isBlurredBg = useSelector((state: { isBlurredBg: boolean }) => state.isBlurredBg)
    const [activeItem, setActiveItem] = useState('');
    const [inputValue, setInputValue] = useState('')
    const [debouncedValue, setDebouncedValue] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value.toLowerCase)
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue]);


    return (
        <>
            <Lamp/>

            {isBlurredBg &&
                <>


                    <div
                        className='w-full h-full fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl'>

                        <div className='w-80 flex flex-col gap-4'>
                            <Input onChange={handleInputChange} value={inputValue} id="firstname" placeholder="Search"
                                   type="text"/>


                            <div>
                                {filterFilesByName(files.children, debouncedValue)?.map((entry: TFiles) => (
                                    <Entry entry={entry} depth={1} setActiveItem={setActiveItem}
                                           activeItem={activeItem}/>
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
