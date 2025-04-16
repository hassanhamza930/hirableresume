"use client";

import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const NavOption = ({
  children,
  className,
  onClick
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return <button onClick={onClick} className={`transition-all duration-200 hover:text-white/90 hover:underline cursor-pointer w-max ${className || ''}`}>{children}</button>;
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav style={{fontFamily:"Geist Mono"}} className="fixed z-20 top-0 left-1/2 -translate-x-1/2 flex items-center justify-end md:justify-between shadow-md md:shadow-xl shadow-white/5 md:shadow-white/10 px-4 sm:px-10 pb-0 md:pb-3 pt-0 md:pt-2 text-sm font-medium text-white bg-white/5 md:border md:border-t-0 border-white/40 border-dashed transition-all duration-300 backdrop-blur-xl backdrop-brightness-50 rounded-none md:rounded-b-xl md:w-auto w-full">

      {/* Mobile menu button */}
      <button
        className="sm:hidden text-white p-2"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Desktop navigation */}
      <div className="hidden sm:flex items-center justify-center gap-x-10">
        <NavOption onClick={() => { }} >Features</NavOption>
        <NavOption onClick={() => { }} >Pricing</NavOption>
        <NavOption onClick={() => { }} >Affiliate</NavOption>
        <NavOption onClick={() => { }} >Login</NavOption>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 flex flex-col items-center gap-y-4 py-4 bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-b-xl sm:hidden">
          <NavOption onClick={() => { setIsMenuOpen(false); }} >Features</NavOption>
          <NavOption onClick={() => { setIsMenuOpen(false); }} >Pricing</NavOption>
          <NavOption onClick={() => { setIsMenuOpen(false); }} >Affiliate</NavOption>
          <NavOption onClick={() => { setIsMenuOpen(false); }} >Login</NavOption>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
