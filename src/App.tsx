import './App.css'
import 'antd/dist/reset.css'
import {Lamp} from "@/components/ui/lamp.tsx";
import { useSelector} from "react-redux";
import Entry from "@/components/ui/Entry.tsx";
import {useState} from "react";

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
                            children: [

                            ]
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
                    children: [

                    ]
                },
            ]
        }
    ]
}


function App() {
    const isBlurredBg = useSelector((state: {isBlurredBg: boolean}) => state.isBlurredBg)
    const [activeItem, setActiveItem] = useState('');


    return (
        <>
            <Lamp/>

            {isBlurredBg &&
                <div className='w-full h-full fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl'>
                    <div className='p-2.5'>
                        {files.children?.map((entry: TFiles) => (
                            <Entry entry={entry} depth={1} setActiveItem={setActiveItem}
                                   activeItem={activeItem} />
                        ))}
                    </div>
            </div>}


        </>
    )
}

export default App
