
import {
    LayoutDashboard,
    FolderKanban,
    Users,
    Newspaper,
    Contact,
    WrenchOff,
    Info,
    Dot,
    ShieldCog,
} from "lucide-react";
export const sidebarMenu = [
    {
        label: "Dashboard",
        path: "/home",
        icon: LayoutDashboard,
        permission: ["ADMIN", "USER"]
    },
    {
        label: "Users",
        path: "/users",
        icon: Users,
        permission: ["ADMIN"]
    },
    {
        label: "Project",
        path: "/project",
        icon: ShieldCog,
        permission: ["ADMIN","USER"]
    },
    {
        label: "News",
        path: "/news",
        icon: Newspaper,
        permission: ["ADMIN", "USER"]
    },
    {
        label: "Contact",
        path: "/contact",
        icon: Contact,
        permission: ["ADMIN", "USER"]
    },
    {
        label: "Services",
        icon: WrenchOff,
        permission: ["ADMIN", "USER"],
        children: [
            {
                label: "Complaint",
                path: "/services/complaint",
                icon: Dot,
                permission: ["ADMIN", "USER"]
            },
        ],
    },
    {
        label: "Schemes",
        icon: FolderKanban,
        permission: ["ADMIN", "USER"],
        children: [
            {
                label: "Important Links",
                path: "/schemes/links",
                icon: Dot,
                permission: ["ADMIN", "USER"]
            },
        ],
    },
    {
        label: "About",
        path: "/about",
        icon: Info,
        permission: ["ADMIN", "USER"]
    },
];
