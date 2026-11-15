import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    BriefcaseBusiness,
    PlusCircle
} from "lucide-react";

const Sidebar = () => {

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard
        },
        {
            name: "My Applications",
            path: "/applications",
            icon: BriefcaseBusiness
        },
        {
            name: "Add Application",
            path: "/add-application",
            icon: PlusCircle
        }
    ];

    return (

        <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-5">

            <h2 className="text-xs font-semibold text-gray-400 mb-6 tracking-wider">
                WORKSPACE
            </h2>

            <nav className="space-y-2">

                {menuItems.map((item) => {

                    const Icon = item.icon;

                    return (

                        <NavLink
                            key={item.path}
                            to={item.path}

                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                                ${isActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                }`
                            }
                        >

                            <Icon size={20} />

                            <span>{item.name}</span>

                        </NavLink>

                    );

                })}

            </nav>

        </aside>
    );
};

export default Sidebar;