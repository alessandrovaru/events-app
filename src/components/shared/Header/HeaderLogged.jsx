'use client';

import Link from "next/link"
import Image from "next/image"
import Logout from "@/app/Logout";
import { useState } from "react";
import LogoLink from "./LogoLink";
import DesktopNavLinks from "./DesktopNavLinks";
import MobileMenuButton from "./MobileMenuButton";
import MobileDrawer from "./MobileDrawer";

export const HeaderLogged = ({tokens}) => {
  const  [isDrawerOpen, setIsDrawerOpen]  = useState(false);

  const handleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  }

  return (
    // <header className="px-4 lg:px-6 flex items-center h-[10dvh]">
    //   <Link className="flex items-center justify-center" href="#">
    //     <Image src="/images/logo.jpg" alt="Total Elite Training" width={40} height={40} />
    //     <span className="font-bold">Total Elite Training</span>
    //   </Link>
    //   <nav className="ml-auto flex gap-4 sm:gap-6">
    //     <Link className="py-2 px-4 rounded-lg text-sm font-medium hover:underline underline-offset-4" href="/dashboard">
    //       Dashboard
    //     </Link>
    //     <Logout email={tokens?.decodedToken.email}/>
    //   </nav>
      
    // </header>

    <>
      <div className="hidden relative py-6 sm:flex flex-col justify-center">
        <LogoLink />
        <DesktopNavLinks email={tokens?.decodedToken.email} />
      </div>
      <div className="sm:hidden relative flex flex-row my-4">
        <LogoLink />
        <MobileMenuButton onClick={handleDrawer} />
        <MobileDrawer isOpen={isDrawerOpen} onClose={handleDrawer} />
      </div>
    </>
  );
}