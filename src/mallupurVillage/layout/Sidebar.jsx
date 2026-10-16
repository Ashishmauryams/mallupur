

// import { useEffect, useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { ChevronDown, ChevronRight, LogOut, } from "lucide-react";
// import "./Sidebar.scss";

// import { sidebarMenu } from "../sidebarMenu/sidebarMenu";
// import { useAuth } from "../../contextApi/AuthContext";


// function Sidebar({ collapsed = false, onNavigate }) {
//     const location = useLocation();
//     const [openMenus, setOpenMenus] = useState({});

//     const {logout} = useAuth();

//     useEffect(() => {
//         setOpenMenus({});
//     }, [location.pathname]);

//     const toggleMenu = (label) => {
//         setOpenMenus((previous) => ({
//             ...previous,
//             [label]: !previous[label],
//         }));
//     };

//     return (
//         <aside
//             className={`app-sidebar ${collapsed ? "collapsed" : ""
//                 }`}
//         >
//             <nav className="sidebar-menu">
//                 {sidebarMenu?.map((item) => {
//                     const Icon = item.icon;
//                     const hasChildren = Boolean(item.children?.length);

//                     const childIsActive = hasChildren &&
//                         item.children.some((child) =>
//                             location.pathname === child.path ||
//                             location.pathname.startsWith(`${child.path}/`)
//                         );

//                     const isOpen = Boolean(openMenus[item.label]) ||
//                         childIsActive;

//                     return (
//                         <div className="sidebar-group" key={item.label}>
//                             {hasChildren ? (
//                                 <button
//                                     type="button"
//                                     className={`sidebar-link sidebar-parent ${childIsActive ? "active" : ""
//                                         }`}
//                                     onClick={() => toggleMenu(item.label)}
//                                     title={collapsed ? item.label : undefined}
//                                     aria-expanded={isOpen}
//                                 >
//                                     <Icon size={20} />

//                                     {!collapsed && (
//                                         <>
//                                             <span className="sidebar-label">
//                                                 {item.label}
//                                             </span>

//                                             {isOpen
//                                                 ? <ChevronDown size={16} />
//                                                 : <ChevronRight size={16} />
//                                             }
//                                         </>
//                                     )}
//                                 </button>
//                             ) : (
//                                 <NavLink
//                                     to={item.path}
//                                     end={item.end}
//                                     title={collapsed ? item.label : undefined}
//                                     onClick={onNavigate}
//                                     className={({ isActive }) =>
//                                         `sidebar-link ${isActive ? "active" : ""
//                                         }`
//                                     }
//                                 >
//                                     <Icon size={20} />
//                                     {!collapsed && (
//                                         <span className="sidebar-label">
//                                             {item.label}
//                                         </span>
//                                     )}
//                                 </NavLink>
//                             )}

//                             {hasChildren && !collapsed && isOpen && (
//                                 <div className="sidebar-submenu">
//                                     {item.children.map((child) => {
//                                         const ChildIcon = child.icon;

//                                         return (
//                                             <NavLink
//                                                 key={child.path}
//                                                 to={child.path}
//                                                 onClick={onNavigate}
//                                                 className={({ isActive }) =>
//                                                     `sidebar-sublink ${isActive ? "active" : ""
//                                                     }`
//                                                 }
//                                             >
//                                                 <ChildIcon size={30} />
//                                                 <span>{child.label}</span>
//                                             </NavLink>
//                                         );
//                                     })}
//                                 </div>
//                             )}
//                         </div>
//                     );
//                 })}
//             </nav>
//             <div className="sidebar-footer">
//                 <button
//                     type="button"
//                     onClick={logout}
//                     title={collapsed ? "Logout" : undefined}
//                     className="sidebar-logout-btn"
//                 >
//                     <LogOut size={20} />
//                     {!collapsed && <span className="sidebar-label">Logout</span>}
//                 </button>
//             </div>
//         </aside>
//     );
// }

// export default Sidebar;

import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, LogOut } from "lucide-react";
import "./Sidebar.scss";

import { sidebarMenu } from "../sidebarMenu/sidebarMenu";
import { useAuth } from "../../contextApi/AuthContext";

function Sidebar({ collapsed = false, onNavigate, userRole = "user" }) {
    const location = useLocation();
    const [openMenus, setOpenMenus] = useState({});

    const { logout } = useAuth();

    useEffect(() => {
        setOpenMenus({});
    }, [location.pathname]);

    const toggleMenu = (label) => {
        setOpenMenus((previous) => ({
            ...previous,
            [label]: !previous[label],
        }));
    };

    // Role ke hisab se menu aur children ko filter karne ka logic
    const filteredMenu = sidebarMenu
        .filter((item) => {
            // Agar item mein roles defined hain, toh check karein ki userRole usme match karta hai ya nahi
            if (item.permission && !item.permission.includes(userRole)) {
                return false;
            }
            return true;
        })
        .map((item) => {
            // Agar parent ke children hain toh unhe bhi role wise filter karein
            if (item.children) {
                const filteredChildren = item.children.filter((child) => {
                    if (child.permission && !child.permission.includes(userRole)) {
                        return false;
                    }
                    return true;
                });
                return { ...item, children: filteredChildren };
            }
            return item;
        })
        .filter((item) => {
            // Agar koi parent aisa hai jiske saare children hide ho gaye hain, toh parent ko bhi hide kar dein
            if (item.children && item.children.length === 0) {
                return false;
            }
            return true;
        });

    return (
        <aside
            className={`app-sidebar ${collapsed ? "collapsed" : ""
                }`}
        >
            <nav className="sidebar-menu">
                {filteredMenu?.map((item) => {
                    const Icon = item.icon;
                    const hasChildren = Boolean(item.children?.length);

                    const childIsActive =
                        hasChildren &&
                        item.children.some(
                            (child) =>
                                location.pathname === child.path ||
                                location.pathname.startsWith(`${child.path}/`)
                        );

                    const isOpen =
                        Boolean(openMenus[item.label]) || childIsActive;

                    return (
                        <div className="sidebar-group" key={item.label}>
                            {hasChildren ? (
                                <button
                                    type="button"
                                    className={`sidebar-link sidebar-parent ${childIsActive ? "active" : ""
                                        }`}
                                    onClick={() => toggleMenu(item.label)}
                                    title={collapsed ? item.label : undefined}
                                    aria-expanded={isOpen}
                                >
                                    <Icon size={20} />

                                    {!collapsed && (
                                        <>
                                            <span className="sidebar-label">
                                                {item.label}
                                            </span>

                                            {isOpen ? (
                                                <ChevronDown size={16} />
                                            ) : (
                                                <ChevronRight size={16} />
                                            )}
                                        </>
                                    )}
                                </button>
                            ) : (
                                <NavLink
                                    to={item.path}
                                    end={item.end}
                                    title={collapsed ? item.label : undefined}
                                    onClick={onNavigate}
                                    className={({ isActive }) =>
                                        `sidebar-link ${isActive ? "active" : ""
                                        }`
                                    }
                                >
                                    <Icon size={20} />
                                    {!collapsed && (
                                        <span className="sidebar-label">
                                            {item.label}
                                        </span>
                                    )}
                                </NavLink>
                            )}

                            {hasChildren && !collapsed && isOpen && (
                                <div className="sidebar-submenu">
                                    {item.children.map((child) => {
                                        const ChildIcon = child.icon;

                                        return (
                                            <NavLink
                                                key={child.path}
                                                to={child.path}
                                                onClick={onNavigate}
                                                className={({ isActive }) =>
                                                    `sidebar-sublink ${isActive ? "active" : ""
                                                    }`
                                                }
                                            >
                                                <ChildIcon size={30} />
                                                <span>{child.label}</span>
                                            </NavLink>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
            <div className="sidebar-footer">
                <button
                    type="button"
                    onClick={logout}
                    title={collapsed ? "Logout" : undefined}
                    className="sidebar-logout-btn"
                >
                    <LogOut size={20} />
                    {!collapsed && <span className="sidebar-label">Logout</span>}
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;

