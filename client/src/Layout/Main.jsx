
import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";

const Main = () => {
    return (

        <div className="bg-[#1d232a] min-h-screen w-full overflow-x-hidden">
            <Navbar /> 
            
  
            <main className="min-h-screen w-full">
                <Outlet /> 
            </main>
            
            <Footer /> 
        </div>
    );
};

export default Main;