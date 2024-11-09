'use client';

import Link from "next/link"
import Image from "next/image"
import Logout from "@/app/Logout";
import {  useEffect, useState } from "react";
import LogoLink from "./LogoLink";
import DesktopNavLinks from "./DesktopNavLinks";
import MobileMenuButton from "./MobileMenuButton";
import MobileDrawer from "./MobileDrawer";
import { NotificationHandler } from "@/components/NotificationHandler";
import { messaging } from "@/lib/firebaseClient";

import { onMessage } from "firebase/messaging";

export const HeaderLogged = ({tokens}) => {
  const  [isDrawerOpen, setIsDrawerOpen]  = useState(false);



  const handleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  }

  useEffect(() => {
    if (typeof window !== "undefined" && messaging) {  // Asegúrate de estar en el cliente
      onMessage(messaging, (payload) => {
        console.log('Message received: ', payload);
        // Maneja el mensaje como necesites
      });
    }
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registrado con éxito:", registration);
        })
        .catch((error) => {
          console.error("Error al registrar el Service Worker:", error);
        });
    }
  }, []);

  return (
    <>
    <NotificationHandler />
      <div className="hidden relative py-6 sm:flex flex-col justify-center">
        <LogoLink />
        <DesktopNavLinks email={tokens?.decodedToken.email} uid={tokens?.decodedToken.uid} />
      </div>
      <div className="sm:hidden relative flex flex-row my-4 align-center justify-between p-6">
        <LogoLink />
        <MobileMenuButton onClick={handleDrawer} />
        <MobileDrawer isOpen={isDrawerOpen} onClose={handleDrawer} />
      </div>
    </>
  );
}