import { BiCheckSquare, BiSquare } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";

function PricingCard(
    props: { title: string, price: string, features: Array<string>, basic: boolean }
) {
    const navigate=useNavigate();

    return (
        // 173038 other color
        <div className={`${props.basic == true ? "bg-gradient-to-br from-purple-600  to-purple-500/80" : "bg-gradient-to-b from-indigo-600  to-indigo-600/80"} flex flex-col justify-start w-full md:w-96 text-white items-start p-5 shadow-2xl shadow-yellow-600/60 rounded-xl overflow-hidden`}>
            <div className="bg-white rounded-full text-sm px-5 py-0 text-black shadow-xl font-bold">
                {props.basic == true ? "Basic" : "Pro"}
            </div>
            <div
                style={{ fontFamily: "Bricolage Grotesque" }}
                className="tracking-tight text-start w-full text-2xl md:text-3xl font-bold mt-6"
            >
                {props.title}
            </div>
            <div className="flex flex-col justify-start items-start mt-5">
                {
                    props.features.map((e) => {
                        return (
                            <div className="flex flex-row justify-start items-center gap-2 text-lg">
                                <BiCheckSquare size={15} />
                                {e}
                            </div>
                        )
                    })
                }
            </div>
            <div
                style={{ fontFamily: "Inter" }}
                className="tracking-tight text-start rounded-sm text-xl text-white font-bold mt-6"
            >
                {props.price}
            </div>

            <button onClick={()=>{navigate("/signup")}} disabled={props.basic==false} style={{fontFamily:"Inter"}} className="disabled:opacity-40 rounded-sm px-14 py-1 bg-transparent border-[1px] bg-white text-black mt-10 shadow-xl text-md font-medium disabled:hover:scale-100 hover:scale-105 transition-all duration-300">
                {
                    props.basic==false?
                    "Invite Only Beta":
                    "Start Now"
                }
            </button>
        </div>
    )
}

function Pricing() {
    return (
        <div id="pricing" className="flex flex-col justify-start items-center w-full mt-2">


            <div
                style={{ fontFamily: "Bricolage Grotesque" }}
                className="tracking-tight text-center w-full text-4xl md:text-5xl font-bold text-black"
            >
                Pricing
            </div>
            <div
                style={{ fontFamily: "Bricolage Grotesque" }}
                className="tracking-tight text-lg px-5 md:text-xl w-full overflow-x-hidden text-center font-normal mt-5 text-black"
            >
                Start today, <span className="text-primary font-bold">Go PRO</span> when you're ready.
            </div>

            <div className="flex flex-col md:flex-row justify-center items-start gap-5 w-full mt-12 md:px-0 px-5">
                <PricingCard
                    features={["Hyper Personalized Resumes", "AI powered Designs", "500 Generations"]}
                    price="$15 per Month"
                    title="Hirable Now"
                    basic={true}
                />
                <PricingCard
                    features={["Hyper Personalized Resumes", "AI powered Designs", "Career Roadmap and Counsellor","Personalized Cover Letters", "AI Powered Roadmap", "1200 Generations"]}
                    price="$25 per Month"
                    title="Hirable Pro"
                    basic={false}
                />
            </div>
        </div>
    );
}

export default Pricing;