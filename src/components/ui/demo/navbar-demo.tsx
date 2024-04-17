"use client";
import {cn} from "@/utils/cn";
import {Menu, MenuItem} from "@/components/ui/navbar-menu.tsx";
import {useState} from "react";
import {useTonConnect} from "@/hooks/useTonConnect.ts";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">


    </div>
  );
}

export function Navbar({className}: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const {network} = useTonConnect();
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-lg mx-auto z-50 justify-center ", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={null} item="Dashboard">

        </MenuItem>
        <MenuItem setActive={setActive} active={null} item="Rounds">

        </MenuItem> <MenuItem setActive={setActive} active={null} item="Support">

      </MenuItem> <MenuItem setActive={setActive} active={active} item="Account">
        {network}
      </MenuItem>
        <MenuItem isIcon setActive={setActive} active={null} item="Connect">

        </MenuItem>
      </Menu>
    </div>
  );
}
