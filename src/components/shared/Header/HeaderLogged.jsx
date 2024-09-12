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
    <>
      <div className="hidden relative py-6 sm:flex flex-col justify-center">
        <LogoLink />
        <DesktopNavLinks email={tokens?.decodedToken.email} uid={tokens?.decodedToken.uid} />
      </div>
      <div className="sm:hidden relative flex flex-row my-4">
        <LogoLink />
        <MobileMenuButton onClick={handleDrawer} />
        <MobileDrawer isOpen={isDrawerOpen} onClose={handleDrawer} />
      </div>
    </>
  );
}