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
  return <button onClick={onClick} className={"transition-all duration-200 hover:text-white/90 hover:underline cursor-pointer w-max"}>{children}</button>;
};


const Navbar: React.FC = () => {
  return (
    <nav style={{fontFamily:"Geist Mono"}} className="fixed z-20 top-0 left-1/2 -translate-x-1/2 flex items-center justify-center w-min shadow-xl shadow-white/10 px-10 pb-2 pt-2 gap-x-10 text-sm font-medium text-white bg-white/5 border border-t-0 border-white transition-all duration-300 backdrop-blur-3xl rounded-b-xl">


      <NavOption onClick={() => { }} >Features</NavOption>
      <NavOption onClick={() => { }} >Pricing</NavOption>
      <NavOption onClick={() => { }} >Affiliate</NavOption>
      <NavOption onClick={() => { }} >Login</NavOption>

    </nav>
  );
};

export default Navbar;
