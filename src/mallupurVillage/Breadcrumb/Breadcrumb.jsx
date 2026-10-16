
// import { Link, useLocation } from "react-router-dom";
// import { ChevronRight, House } from "lucide-react";
// import "./Breadcrumb.scss";

// const routeLabels = {
//     home: "Dashboard",
//     profile: "Profile",
//     edit: "Edit Profile",
//     "change-password": "Change Password",
//     complaints: "Complaints",
//     create: "Create",
//     requests: "My Requests",
//     projects: "Village Projects",
//     all: "All Projects",
//     details: "Project Details",
//     schemes: "Government Schemes",
//     services: "Village Services",
//     news: "News & Updates",
//     contact: "Contact Us",
// };

// function Breadcrumb() {
//     const location = useLocation();

//     const segments = location.pathname
//         .split("/")
//         .filter(Boolean);

//     const breadcrumbs = [];
//     let currentPath = "";

//     segments.forEach((segment) => {
//         currentPath += `/${segment}`;

//         // /home ko Dashboard label se show karna hai
//         const label = routeLabels[segment] || segment
//             .replace(/-/g, " ")
//             .replace(/\b\w/g, (char) => char.toUpperCase());

//         breadcrumbs.push({
//             label,
//             path: currentPath,
//         });
//     });

//     return (
//         <nav className="breadcrumb" aria-label="Breadcrumb">
//             <Link to="/home" className="breadcrumb-home">
//                 <House size={16} />
//                 <span>Home</span>
//             </Link>

//             {breadcrumbs.map((item, index) => {
//                 const isLast = index === breadcrumbs.length - 1;

//                 // /home ko Home ke saath repeat nahi karna
//                 if (item.path === "/home") {
//                     return null;
//                 }

//                 return (
//                     <div className="breadcrumb-item" key={item.path}>
//                         <ChevronRight
//                             size={15}
//                             className="breadcrumb-separator"
//                         />

//                         {isLast ? (
//                             <span
//                                 className="breadcrumb-current"
//                                 aria-current="page"
//                             >
//                                 {item.label}
//                             </span>
//                         ) : (
//                             <Link to={item.path}>
//                                 {item.label}
//                             </Link>
//                         )}
//                     </div>
//                 );
//             })}
//         </nav>
//     );
// }

// export default Breadcrumb;

import { Link, useLocation } from "react-router-dom";
import { ChevronRight, House } from "lucide-react";
import { sidebarMenu } from "../sidebarMenu/sidebarMenu";
import "./Breadcrumb.scss";

// Recursive helper function jo sidebarMenu ke nested children ko flat karke ek lookup map banata hai
const generateRouteMap = (items, map = {}) => {
    items.forEach((item) => {
        if (item?.path) {
            map[item?.path] = {
                label: item.label,
                // icon: item?.icon,
            };
        }
        if (item?.children) {
            generateRouteMap(item?.children, map);
        }
    });
    return map;
};

const routeMap = generateRouteMap(sidebarMenu);

function Breadcrumb() {
    const location = useLocation();

    const segments = location.pathname
        .split("/")
        .filter(Boolean);

    const breadcrumbs = [];
    let currentPath = "";

    segments.forEach((segment) => {
        currentPath += `/${segment}`;

        const isNumber = !isNaN(segment);
        if (isNumber) {
            return;
        }

        const routeInfo = routeMap[currentPath];
        const label = routeInfo?.label || segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());

        // const icon = routeInfo?.icon || null;

        breadcrumbs.push({
            label,
            // icon,
            path: currentPath,
        });
    });

    return (
        <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/home" className="breadcrumb-home">
                {/* <House size={16} /> */}
                <span>Home</span>
            </Link>

            {breadcrumbs?.map((item, index) => {
                const isLast = index === breadcrumbs?.length - 1;
                // const IconComponent = item?.icon;

                if (item?.path === "/home") {
                    return null;
                }

                return (
                    <div className="breadcrumb-item" key={item?.path}>
                        <ChevronRight
                            size={14}
                            className="breadcrumb-separator"
                        />

                        {isLast ? (
                            <span
                                className="breadcrumb-current"
                                aria-current="page"
                            >
                                {/* {IconComponent && <IconComponent size={14} />} */}
                                <span className="breadcrumb-text">{item?.label}</span>
                            </span>
                        ) : (
                            <Link to={item?.path} className="breadcrumb-link">
                                {/* {IconComponent && <IconComponent size={14} />} */}
                                <span className="breadcrumb-text">{item?.label}</span>
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}

export default Breadcrumb;
