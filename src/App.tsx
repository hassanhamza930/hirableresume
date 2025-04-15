import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import LandingPage from "./pages/landingpage/landingpage";
import { useRecoilState } from "recoil";
import { loadingAtom } from "./atoms";
import { initializeApp } from "firebase/app";
import { motion } from "framer-motion";
import { useUser } from "./utils";
import Imprint from "./pages/imprint";
import DataProtection from "./pages/dataprotection";
import Print from "./pages/home/subpages/print";
import path from "path";
import Profile from "./pages/home/subpages/Profile/profile";
import Billing from "./pages/home/subpages/Billing/billing";
import Cookies from 'js-cookie';

const firebaseConfig = {
  apiKey: "AIzaSyCj3WCBSAj93yhHVfPBiQwi8vuNnm6iif4",
  authDomain: "hirablenow.firebaseapp.com",
  projectId: "hirablenow",
  storageBucket: "hirablenow.appspot.com",
  messagingSenderId: "872640031094",
  appId: "1:872640031094:web:4b89d8f53fd8279bddb257",
  measurementId: "G-23W6C0T1D9"
};

function App() {

  const [loading, setloading] = useRecoilState(loadingAtom);
  const app = initializeApp(firebaseConfig);
  const { userData } = useUser();
  const location = useLocation();
  const { pathname } = location;

  return (

    <>
      {
        pathname.includes("print") == false &&
        <button onClick={() => {

          const clearCookie = (name: string) => {
            Cookies.remove(name);
          };
          const clearAllCookies = () => {
            const allCookies = Cookies.get();
            for (let cookie in allCookies) {
              Cookies.remove(cookie);
            }
          };

          clearAllCookies();
          window.location.reload();
        }} id="open_preferences_center"
          className="z-50 fixed hover:scale-105 transition-all duration-300 text-sm md:text-lg bottom-0 right-0 rounded-tl-md bg-black/90 text-white/90 px-3 py-1">
          Manage Cookies
        </button>
      }
      {
        localStorage.getItem("uid") != undefined ?
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/print" element={<Print />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/billing" element={<Billing />} />
          </Routes>
          :
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/demo" element={<LandingPage />} />
            <Route path="/print" element={<Print />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/imprint" element={<Imprint />} />
            <Route path="/dataprotection" element={<DataProtection />} />
          </Routes>
      }

      {
        loading == true &&
        <div className="fixed z-[9999] top-0 flex flex-none h-screen w-full bg-black/80 backdrop-blur-md justify-center items-center">
          <motion.div
            whileInView={{
              y: [10, 0, 10]
            }}
            transition={{
              repeat: Infinity,
              duration: 3
            }}
            className="tracking-tight text-6xl md:text-8xl text-white font-bold flex justify-center items-center -mt-5" >
            Hirable Now
          </motion.div>
        </div>
      }

    </>
  );
}

export default App;