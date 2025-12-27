"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { serviceItems } from '@/constants/services.constants'
import { navLinks } from "@/constants/navlinks.constants";
import Link from "next/link";
import DesktopNav from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>

      {/* Desktop Navbar  */}
      <DesktopNav
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Fullscreen Mobile Menu */}
      <MobileMenu
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      />
    </>
  );
};

export default Navbar;