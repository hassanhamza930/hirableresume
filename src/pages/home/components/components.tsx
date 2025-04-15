import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userDataAtom } from "@/atoms";

function NavItem(props: { text: string, onClick: any }) {
    return <button onClick={() => { props.onClick() }} className="px-2 text-lg font-bold hover:text-yellow-400 md:hover:text-primary transition-all duration-100">{props.text}</button>;
}



function LoggedInNavBar() {
    const [expanded, setexpanded] = useState(false);
    const [userData, setuserData] = useRecoilState(userDataAtom);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <div style={{ fontFamily: "Bricolage Grotesque" }} className="top-0 w-full md:w-[60%] 2xl:w-3/5 text-black rounded-b-xl flex flex-row justify-between items-center pt-5 md:px-0 px-5">
            <button
                onClick={()=>{navigate("/")}}
                className="tracking-tighter text-2xl md:text-3xl opacity-80 font-bold flex justify-center items-center"
            >
                Hirable Now
            </button>


            <div className="relative flex flex-row justify-end items-center gap-2 md:gap-5">
                {
                    pathname == "/" && userData.onboarding==true &&
                    <button onClick={() => {
                        localStorage.removeItem("chathistory");
                        window.location.reload();

                    }} className="text-xs md:text-sm border-[1px] border-black px-2 py-1 md:px-4 md:py-2 hover:bg-black hover:text-white hover:shadow-xl">New Conversation</button>
                }
                <Menu>
                    <MenuButton>
                        <BiMenu size={40} />
                    </MenuButton>
                    <MenuItems
                        anchor="bottom"
                        transition
                        className="z-50 shadow-xl origin-top-right -ml-5 md:-ml-16 mt-2 transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 flex flex-col justify-start items-end bg-black/80"
                    >
                        <MenuItem>
                            <button onClick={() => { navigate("/profile") }} className="text-sm px-4 py-2 text-start w-48 border-2 border-black hover:text-white rounded-sm bg-black text-white hover:bg-primary hover:border-primary transition-all duration-300 mb-1">
                                Profile
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button onClick={() => { navigate("/billing") }} className="text-sm px-4 py-2 text-start w-48 border-2 border-black hover:text-white rounded-sm bg-black text-white hover:bg-primary hover:border-primary transition-all duration-300 mb-1">
                                Billing
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button onClick={() => { window.open("mailto:hassanhamza930@gmail.com?subject=Hirable Now Support&body=Explain here..") }} className="text-sm px-4 py-2 text-start w-48 border-2 border-black hover:text-white rounded-sm bg-black text-white hover:bg-primary hover:border-primary transition-all duration-300 mb-1">
                                Support
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button onClick={() => {
                                localStorage.clear();
                                window.location.href = "/";
                            }} className="text-sm px-4 py-2 text-start w-48 border-2 border-black hover:text-white rounded-sm bg-black text-white hover:bg-primary hover:border-primary transition-all duration-300">
                                Logout
                            </button>
                        </MenuItem>

                    </MenuItems>
                </Menu>
            </div>


        </div>
    );
}

export default LoggedInNavBar;