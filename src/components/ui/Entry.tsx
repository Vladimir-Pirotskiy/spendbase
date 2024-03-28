import { TFiles } from "../../../types";
import { FC, useState } from "react";
import { cn } from "@/utils/cn.ts";
import { AnimatePresence, motion } from "framer-motion";
import { FolderOutlined, FileOutlined } from '@ant-design/icons';


type EntryProps = {
    entry: TFiles;
    depth: number;
    activeItem: string;
    setActiveItem: (val: string) => void;
};

export const Entry: FC<EntryProps> = ({ entry, depth, activeItem, setActiveItem }: EntryProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    return (
        <div>
            <button onClick={() => {
                const entryName = isExpanded ? '' : entry.name;
                setActiveItem(entryName);
                setIsExpanded(prev => !prev);
            }}>
                {entry.children && (
                    <motion.div
                        animate={{rotate: isExpanded ? 45 : 0}}
                        className='pl-1.5 pr-1.5 w-5 inline-flex justify-center'
                    >
      <span
          className={cn(
              "text-black dark:text-white text-2xl font-medium tracking-tight text-transparent",
              activeItem === entry.name && "text-black dark:text-lime-500 opacity-100"
          )}
      >
        {entry.children.length > 0 ? '+' : ''}
      </span>
                    </motion.div>
                )}
                <span
                    className={cn(
                        "text-black dark:text-white text-2xl font-medium tracking-tight text-transparent",
                        activeItem === entry.name && "text-black dark:text-lime-500 opacity-100"
                    )}
                    // className={cn('name text-black dark:text-white text-2xl font-medium tracking-tight text-transparent md:text-2xl', {'pl-5': !entry.children})}
                >
                    {entry.name}
                    {entry.children ? (
                        <FolderOutlined className='pl-2' />
                    ) : (
                        <FileOutlined className='pl-2' />
                    )}
                </span>
            </button>
            <AnimatePresence>
            {isExpanded && (
                    <motion.div
                        className={cn(
                            "text-black dark:text-white pl-5 border-l text-2xl font-medium tracking-tight text-transparent",
                            activeItem === entry.name && "text-black dark:text-lime-500 opacity-100"
                        )}
                        // className='pl-5 border-l border-white m-1.5 text-black dark:text-white text-2xl font-medium tracking-tight text-transparent md:text-2xl overflow-hidden'
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {entry.children?.map(entryChild => (
                            <Entry entry={entryChild} depth={depth + 1} activeItem={activeItem} setActiveItem={setActiveItem} key={entryChild.name}  />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
};

export default Entry;