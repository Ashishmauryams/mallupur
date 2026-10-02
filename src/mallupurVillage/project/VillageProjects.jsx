
import React from "react";
import { useNavigate } from "react-router-dom";
import {
    FolderKanban,
    PlusCircle,
    List,
    Search,
    BarChart3,
    Settings,
    ArrowRight,
    MapPin,
} from "lucide-react";

import "./VillageProjects.scss";

const VillageProjects = () => {
    const navigate = useNavigate();

    const projectLinks = [
        {
            id: 1,
            title: "Create Project",
            description:
                "Create a new development project for your village.",
            icon: PlusCircle,
            path: "/project/create",
        },
        {
            id: 2,
            title: "All Projects",
            description:
                "View all village development projects and their current status.",
            icon: List,
            path: "/projects/all",
        },
        {
            id: 3,
            title: "Project Details",
            description:
                "View complete information about a particular village project.",
            icon: Search,
            path: "/home/projects/details",
        },
        {
            id: 4,
            title: "Project Progress",
            description:
                "Track project progress, completion percentage and timeline.",
            icon: BarChart3,
            path: "/home/projects/progress",
        },
        {
            id: 5,
            title: "Manage Projects",
            description:
                "Edit or delete existing village development projects.",
            icon: Settings,
            path: "/home/projects/manage",
        },
    ];

    return (
        <div className="village-projects">


            <div className="container">
                <section className="village-projects__hero">

                    <div className="village-projects__hero-content">

                        <div className="village-projects__hero-icon">
                            <FolderKanban size={30} />
                        </div>

                        <div>
                            <span className="village-projects__eyebrow">
                                VILLAGE DEVELOPMENT
                            </span>

                            <h1>Village Projects</h1>

                            <p>
                                Manage and monitor development projects
                                happening in your village.
                            </p>
                        </div>

                    </div>

                </section>

                <section className="village-projects__quick">

                    <div>
                        <span>PROJECT MANAGEMENT</span>

                        <h2>
                            Manage Village Development
                        </h2>

                        <p>
                            Create new projects, view existing projects
                            and monitor their progress from one place.
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            navigate("/project/create")
                        }
                    >
                        <PlusCircle size={19} />
                        Create Project
                    </button>

                </section>


                <section className="village-projects">

                    <div className="village-projects__section-heading">

                        <div>
                            <span>PROJECT MODULE</span>

                            <h2>What do you want to do?</h2>
                        </div>

                        <MapPin size={22} />

                    </div>


                    <div className="village-projects__grid">

                        {projectLinks.map((item) => {

                            const Icon = item.icon;

                            return (
                                <div
                                    className="village-projects__card"
                                    key={item.id}
                                    onClick={() =>
                                        navigate(item.path)
                                    }
                                >

                                    <div className="village-projects__card-top">

                                        <div className="village-projects__card-icon">
                                            <Icon size={22} />
                                        </div>

                                        <ArrowRight
                                            size={19}
                                            className="village-projects__arrow"
                                        />

                                    </div>

                                    <h3>{item.title}</h3>

                                    <p>
                                        {item.description}
                                    </p>

                                    <span className="village-projects__card-link">
                                        Open
                                        <ArrowRight size={15} />
                                    </span>

                                </div>
                            );
                        })}

                    </div>

                </section>
            </div>

        </div>
    );
};

export default VillageProjects;
