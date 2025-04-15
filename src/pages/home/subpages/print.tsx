import { useEffect } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";

function Print() {
    
    const {state}= useLocation();
    const {htmlContent}=state;
    const navigate=useNavigate();
    
    async function PrintToPDF(){
        window.print();
        
    }

    useEffect(() => {
        PrintToPDF();
    }, [])


    return ( 
        <div dangerouslySetInnerHTML={{__html:htmlContent}} className="h-full w-full">

        </div>
     );
}

export default Print;
