import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function NavItem(props: { text: string,onClick:any }) {
  return <button onClick={()=>{props.onClick()}} className="px-2 text-lg font-bold hover:text-yellow-400 md:hover:text-primary transition-all duration-100">{props.text}</button>;
}



function NavBar() {

  const [expanded, setexpanded] = useState(false);
  const navigate=useNavigate();

  return (
    <div style={{fontFamily:"Bricolage Grotesque"}} className="top-0 w-full md:w-4/5 2xl:w-3/5 text-black rounded-b-xl flex flex-row justify-between items-center pt-5 md:pt-16 px-5">
      <a
        href={"/"}
        className="tracking-tighter text-2xl md:text-3xl opacity-80 font-bold flex justify-center items-center"
      >
        Hirable Now
      </a>

      <div className="flex-row justify-end items-center gap-8 md:flex hidden">
        <NavItem onClick={()=>{document.getElementById("features")?.scrollIntoView({behavior:"smooth"})}} text="Explore Features" />
        <NavItem onClick={()=>{document.getElementById("pricing")?.scrollIntoView({behavior:"smooth"})}} text="See Pricing" />
      </div>

      <div className="flex-row justify-end items-center gap-2 md:flex hidden">
        {/* <button className=" text-md font-normal rounded-md transition-all duration-200 outline-none hover:scale-105 hover:shadow-md hover:font-medium bg-white border-black border-[1px] border-dashed text-black px-8 py-[5px]">Login</button> */}
        <button onClick={()=>{navigate("signup")}} className=" text-md font-normal rounded-md transition-all duration-200 outline-none hover:scale-105 hover:shadow-md hover:bg-black bg-primary text-white px-10 py-[5px]">Signup</button>
      </div>

      <div className="relative flex md:hidden">
        <button className="relative" onClick={() => { setexpanded(true); }}>
          <BiMenu size={30} />
        </button>
        {
          expanded == true &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed z-[9999] flex flex-col justify-start items-end px-5 gap-3 bg-black/90 backdrop-blur-xl h-screen right-0 top-0 text-white">

            <button onClick={() => {
              console.log(expanded);
              setexpanded(false);
              console.log("closing");
            }} className="mt-12 mb-5 p-1 rounded-lg bg-white text-black z-50">
              <MdClose size={25} />
            </button>

            <NavItem onClick={()=>{document.getElementById("features")?.scrollIntoView({behavior:"smooth"})}} text="Features" />
            <NavItem onClick={()=>{document.getElementById("pricing")?.scrollIntoView({behavior:"smooth"})}} text="Pricing" />
            <div className="w-full h-[1px] border-t-[2px] my-4 border-dashed"></div>
            <NavItem onClick={()=>{navigate("signup")}} text="Signup" />


          </motion.div>
        }
      </div>


    </div>
  );
}

export default NavBar;
