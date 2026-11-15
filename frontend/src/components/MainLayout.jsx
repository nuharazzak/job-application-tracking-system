import { Outlet} from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = ()=>{
    return(
        <div className="min-h-screen bg-gray-100">

            {/* Top Navbar */}
            <Navbar />

            {/* Sidebar and Main Content */}
            <div className="flex">

                <Sidebar />

                <main className="flex-1 min-w-0 p-6">

                    <Outlet />

                </main>

            </div>

        </div>
    
    );

}
export default MainLayout;