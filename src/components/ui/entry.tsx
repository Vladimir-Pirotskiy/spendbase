import {TFiles} from "../../../types";
import {FC, useState,} from "react";
import {cn} from "@/utils/cn.ts";
import {AnimatePresence, motion} from "framer-motion";
import {FolderOutlined, FileOutlined, DeleteOutlined} from '@ant-design/icons';
import {useDispatch} from "react-redux";
import {setIsActive} from "@/main.tsx";


type EntryProps = {
    entry: TFiles;
    depth: number;
    activeItem: string;
    setActiveItem: (val: string) => void;
    setFile: (val: TFiles) => void;
    file: TFiles;
    handleDeleteFileOrFolder: () => void;
};

export const Entry: FC<EntryProps> = ({
                                          entry,
                                          depth,
                                          activeItem,
                                          setActiveItem,
                                          setFile,
                                          file,
                                          handleDeleteFileOrFolder
                                      }: EntryProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);

    const handleDeleteClick = (event: any) => {
        event.stopPropagation();
        handleDeleteFileOrFolder();
    }

    const handleMouseEnter = () => {
        setTimeout(() => setIsHovered(true), 500)
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setTimeout(() => setIsHovered(false), 1000);
    };
    return (
        <div className='pt-2 '>
            <button onClick={() => {
                const entryName = isExpanded ? '' : entry.name;
                setActiveItem(entryName);
                setIsExpanded(prev => !prev);
                dispatch(setIsActive(entry))
            }}>
                {entry.children && (
                    <motion.div
                        animate={{rotate: isExpanded ? 45 : 0}}
                        className='pl-1.5 pr-1.5 w-5 inline-flex justify-center'
                    >
      <span
          className={cn(
              "text-black dark:text-white text-2xl font-medium tracking-tight text-transparent ",
              activeItem === entry.name && "text-black dark:text-lime-500 opacity-100"
          )}
      >
        {entry.children.length > 0 ? '+' : ''}
      </span>
                    </motion.div>
                )}
                <div className='inline-block' onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}>
                    <span
                        className={cn(
                            "text-black dark:text-white text-2xl font-medium tracking-tight text-transparent",
                            activeItem === entry.name && "text-black dark:text-lime-500 opacity-100"
                        )}

                    >
                    {entry.name}
                        {entry.children ? (
                            <FolderOutlined className='pl-2'/>

                        ) : (
                            <FileOutlined className='pl-2'/>
                        )}
                        {isHovered && activeItem === entry.name &&
                            <DeleteOutlined onClick={handleDeleteClick} className='pl-2 dark:text-red-500'/>}
                </span></div>
            </button>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className={cn(
                            "text-black dark:text-white pl-5 border-l text-2xl font-medium tracking-tight text-transparent",
                            activeItem === entry.name && "text-black dark:text-lime-500 opacity-100"
                        )}
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        transition={{duration: 0.3}}
                    >
                        {entry.children?.map(entryChild => (

                            <Entry
                                entry={entryChild}
                                depth={depth + 1}
                                activeItem={activeItem}
                                setActiveItem={setActiveItem}
                                setFile={setFile}
                                file={file}
                                key={entryChild.name}
                                handleDeleteFileOrFolder={handleDeleteFileOrFolder}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
};

export default Entry;