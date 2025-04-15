"use client";

import React from "react";


const NavOption = ({
  children,
  className,
  onClick
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return <button onClick={onClick} className={"transition-all duration-200 hover:text-yellow-400 hover:scale-[1.02] cursor-pointer"}>{children}</button>;
};


const Navbar: React.FC = () => {
  return (
    <nav style={{fontFamily:"Geist Mono"}} className="fixed z-20 top-0 left-1/2 -translate-x-1/2 flex items-center justify-center w-min shadow-xl shadow-white/10 px-10 pb-2 pt-2 gap-x-16 text-md font-semibold text-white bg-white/5 border border-t-0 border-white transition-all duration-300 backdrop-blur-3xl rounded-b-xl">


      <NavOption onClick={() => { }} >Home</NavOption>
      <NavOption onClick={() => { }} >About</NavOption>
      <NavOption onClick={() => { }} >Contact</NavOption>

    </nav>
  );
};

export default Navbar;
