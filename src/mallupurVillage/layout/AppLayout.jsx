// import { Outlet } from "react-router";
// import AppFooter from "./AppFooter";
// import AppHeader from "./AppHeader";
// import ChatbotAI from "../ChatbotAI/ChatbotAI";

// function AppLayout() {
//     return (<>
//         <AppHeader />
//         <div style={{ marginTop: "80px" }}><Outlet /></div>
//         <AppFooter />
//         <ChatbotAI/>
//     </>)
// }
// export default AppLayout;


// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import { Bell, ChevronDown, Menu, X } from "lucide-react";
// import Sidebar from "./Sidebar";
// import "./AppLayout.scss";
// import Breadcrumb from "../Breadcrumb/Breadcrumb";
// import Footer from "../footer/Footer";

// function AppLayout() {
//     const [collapsed, setCollapsed] = useState(false);
//     const [mobileOpen, setMobileOpen] = useState(false);

//     const toggleSidebar = () => {
//         if (window.innerWidth <= 768) {
//             setMobileOpen((prev) => !prev);
//         } else {
//             setCollapsed((prev) => !prev);
//         }
//     };

//     return (
//         <div
//             className={`app-layout ${collapsed ? "sidebar-collapsed" : ""
//                 } ${mobileOpen ? "mobile-sidebar-open" : ""}`}
//         >
//             <header className="app-header">
//                 <button
//                     type="button"
//                     className="sidebar-toggle"
//                     onClick={toggleSidebar}
//                     aria-label="Toggle sidebar"
//                 >
//                     {mobileOpen ? <X /> : <Menu />}
//                 </button>

//                 <div className="header-brand">
//                     <strong>Mallupur</strong>
//                     <span>Village Portal</span>
//                 </div>

//                 <div className="header-search">
//                     <input
//                         type="search"
//                         placeholder="Search services, schemes, projects..."
//                     />
//                 </div>

//                 <div className="header-user center_1">
//                     <div className="notification"><Bell />
//                     <span className="count">+3</span>
//                     </div>
//                     <div className="center_1">
//                         <img src="/images/avatar.jpg" alt="image" />
//                         <div className="user">
//                             <h6>Ashish</h6>
//                             <p>user</p>
//                         </div>
//                     </div>
//                     <div><ChevronDown /></div>
//                 </div>
//             </header>

//             <div className="app-body">
//                 <Sidebar
//                     collapsed={collapsed}
//                     onNavigate={() => setMobileOpen(false)}
//                 />

//                 {mobileOpen && (
//                     <button
//                         className="sidebar-overlay"
//                         aria-label="Close sidebar"
//                         onClick={() => setMobileOpen(false)}
//                     />
//                 )}

//                 <main className="app-main">
//                     <Breadcrumb/>
//                     <Outlet />
//                 </main>
//             </div>
//              <Footer/>
//         </div>
//     );
// }

// export default AppLayout;

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./AppLayout.scss";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Footer from "../footer/Footer";
import AppHeader from "./AppHeader";
import { useAuth } from "../../contextApi/AuthContext";

function AppLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const { user } = useAuth();

    const role = user?.role;


    const toggleSidebar = () => {
        if (window.innerWidth <= 768) {
            setMobileOpen((prev) => !prev);
        } else {
            setCollapsed((prev) => !prev);
        }
    };

    return (
        <div
            className={`app-layout ${collapsed ? "sidebar-collapsed" : ""} ${mobileOpen ? "mobile-sidebar-open" : ""
                }`}
        >

            <AppHeader mobileOpen={mobileOpen} toggleSidebar={toggleSidebar} />

            {/* 2. App Body (Sidebar + Scrollable Main Content & Footer Area) */}
            <div className="app-body">
                <Sidebar
                    collapsed={collapsed}
                    onNavigate={() => setMobileOpen(false)}
                    userRole={role}
                />

                {mobileOpen && (
                    <button
                        className="sidebar-overlay"
                        aria-label="Close sidebar"
                        onClick={() => setMobileOpen(false)}
                    />
                )}

                {/* Main Content & Footer dono is scrollable wrapper me rahenge */}
                <div className="main-content-wrapper">
                    <main className="app-main">
                        <Breadcrumb />
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default AppLayout;
