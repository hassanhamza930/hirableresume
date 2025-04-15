import { useEffect } from "react";
import LoggedInNavBar from "./components/components";
import { userDataAtom } from "@/atoms";
import { useRecoilState } from "recoil";
import Profile from "./subpages/Profile/profile";
import ResumeChat from "./subpages/ResumeChat/resumechat";
import { useLocation } from "react-router-dom";

function Home() {
    const [userData, setuserData] = useRecoilState(userDataAtom);
    const { pathname } = useLocation();


    return (
        <div className="flex flex-col h-screen w-full justify-start items-center">
            {
                userData.onboarding == true &&
                <LoggedInNavBar />
            }
            {
                userData.onboarding != undefined &&
                <div className=" h-full w-full overflow-y-auto py-5 pb-10">
                    {
                        userData.onboarding == false &&
                        <Profile />
                    }
                    {
                        userData.onboarding == true &&
                        <ResumeChat />
                    }
                </div>
            }
            {
                userData.onboarding == undefined &&
                <div className="h-full w-full bg-white flex justify-center items-center">
                    <div className="bg-black h-10 w-10 animate-bounce">
                    </div>
                </div>
            }
        </div>
    );
}

export default Home;