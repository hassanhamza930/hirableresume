import { BsStars } from "react-icons/bs";
import { motion } from "framer-motion";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

function Onboarding() {
    return (
        <div id="demo" style={{fontFamily:"Inter"}} className={` relative bg-cover bg-center w-full flex flex-col justify-start items-center text-black/90 overflow-hidden`} >
            <motion.div 
            whileInView={{
                rotate:[0,360,0],
                scale:[0.,1,0.5],
            }}
            transition={{
                repeat:9999,
                duration:10
            }}
            className="absolute z-0 h-full w-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url('https://media.istockphoto.com/id/1344704908/vector/abstract-pastel-neon-blurred-circle-grainy-gradient-on-white.jpg?s=612x612&w=0&k=20&c=z6oUm-JihQDLkwnXaEAt-PhwC-nNEOoC4PYlApPdLDA=')` }}></motion.div>

            <div className="z-10 h-full w-full bg-white/80 backdrop-blur-[50px]  py-24 flex flex-col justify-start items-center  md:px-0 px-5">

                <div
                    style={{ fontFamily: "Bricolage Grotesque" }}
                    className="tracking-tight text-center w-full text-4xl md:text-5xl font-bold mb-14"
                >
                    Let's Get Started
                </div>


                <div className={`w-full md:w-[650px] rounded-xl border-[1px] border-black/80 border-dashed p-4 flex flex-col justify-start items-start bg-white/90 backdrop-blur-xl shadow-2xl shadow-indigo-600/60`}>
                    <div className="text-lg font-bold flex flex-row justify-start items-center gap-2 animate-pulse">
                        <BsStars />
                        Hirable AI
                    </div>

                    <div className="mt-2 flex flex-wrap justify-start items-start gap-x-[6px] text-lg md:text-xl">
                        {
                            "Hello there, I'm Walton your personal career copilot, ready to help you explore pathways and land your new role. I can help you with designing and creating hyper personalized resumes, cover letters and much more. But first, i need some information. \n \n Let's start with your Name & Email "
                                .split(" ")
                                .map((e, index) => {
                                    return (
                                        e == "\n" ?
                                            <motion.div
                                            key={index}
                                                initial={{ opacity: 0, marginBottom: 20 }}
                                                whileInView={{ opacity: 1, marginBottom: 0 }}
                                                exit={{ opacity: 0, marginBottom: 20 }}
                                                transition={{ delay: index * 0.02, duration: 0.4 }}
                                                className="w-full h-2 flex flex-none"
                                            >

                                            </motion.div> :
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 5 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 5 }}
                                                transition={{ delay: index * 0.04, duration: 0.3 }}
                                            >
                                                {e}
                                            </motion.div>
                                    )
                                })
                        }
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ delay: 3, duration: 0.5 }}
                        className="flex flex-col justify-start items-start w-full">

                        <Input type="text" placeholder="Full Name" className="mt-8 w-full md:w-96 outline-none"></Input>
                        <Input placeholder="Email" className="mt-4 w-full md:w-96 outline-none"></Input>
                        <Button className="text-white mt-10 mb-5">
                            Next
                        </Button>

                    </motion.div>




                </div>
            </div>
        </div>
    );
}

export default Onboarding;