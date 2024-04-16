"use client";
import {cn} from "@/utils/cn";
import {Menu, MenuItem} from "@/components/ui/navbar-menu.tsx";
import {useState} from "react";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">


    </div>
  );
}

export function Navbar({className}: { className?: string }) {
  const [, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-lg mx-auto z-50 justify-center ", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={null} item="Blank">

        </MenuItem>
        <MenuItem setActive={setActive} active={null} item="Connect Wallet">

        </MenuItem>
        <MenuItem setActive={setActive} active={null} item="Blank">

        </MenuItem>
      </Menu>
    </div>
  );
}