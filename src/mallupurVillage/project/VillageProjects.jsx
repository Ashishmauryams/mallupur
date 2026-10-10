
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//     FolderKanban,
//     PlusCircle,
//     List,
//     Search,
//     BarChart3,
//     Settings,
//     ArrowRight,
//     MapPin,
// } from "lucide-react";

// import "./VillageProjects.scss";

// const VillageProjects = () => {
//     const navigate = useNavigate();

//     const projectLinks = [
//         {
//             id: 1,
//             title: "Create Project",
//             description:
//                 "Create a new development project for your village.",
//             icon: PlusCircle,
//             path: "/project/create",
//         },
//         {
//             id: 2,
//             title: "All Projects",
//             description:
//                 "View all village development projects and their current status.",
//             icon: List,
//             path: "/projects/all",
//         },
//         {
//             id: 3,
//             title: "Project Details",
//             description:
//                 "View complete information about a particular village project.",
//             icon: Search,
//             path: "/home/projects/details",
//         },
//         {
//             id: 4,
//             title: "Project Progress",
//             description:
//                 "Track project progress, completion percentage and timeline.",
//             icon: BarChart3,
//             path: "/home/projects/progress",
//         },
//         {
//             id: 5,
//             title: "Manage Projects",
//             description:
//                 "Edit or delete existing village development projects.",
//             icon: Settings,
//             path: "/home/projects/manage",
//         },
//     ];

//     return (
//         <div className="village-projects">


//             <div className="container">
//                 <section className="village-projects__hero">

//                     <div className="village-projects__hero-content">

//                         <div className="village-projects__hero-icon">
//                             <FolderKanban size={30} />
//                         </div>

//                         <div>
//                             <span className="village-projects__eyebrow">
//                                 VILLAGE DEVELOPMENT
//                             </span>

//                             <h1>Village Projects</h1>

//                             <p>
//                                 Manage and monitor development projects
//                                 happening in your village.
//                             </p>
//                         </div>

//                     </div>

//                 </section>

//                 <section className="village-projects__quick">

//                     <div>
//                         <span>PROJECT MANAGEMENT</span>

//                         <h2>
//                             Manage Village Development
//                         </h2>

//                         <p>
//                             Create new projects, view existing projects
//                             and monitor their progress from one place.
//                         </p>
//                     </div>

//                     <button
//                         onClick={() =>
//                             navigate("/project/create")
//                         }
//                     >
//                         <PlusCircle size={19} />
//                         Create Project
//                     </button>

//                 </section>


//                 <section className="village-projects">

//                     <div className="village-projects__section-heading">

//                         <div>
//                             <span>PROJECT MODULE</span>

//                             <h2>What do you want to do?</h2>
//                         </div>

//                         <MapPin size={22} />

//                     </div>


//                     <div className="village-projects__grid">

//                         {projectLinks.map((item) => {

//                             const Icon = item.icon;

//                             return (
//                                 <div
//                                     className="village-projects__card"
//                                     key={item.id}
//                                     onClick={() =>
//                                         navigate(item.path)
//                                     }
//                                 >

//                                     <div className="village-projects__card-top">

//                                         <div className="village-projects__card-icon">
//                                             <Icon size={22} />
//                                         </div>

//                                         <ArrowRight
//                                             size={19}
//                                             className="village-projects__arrow"
//                                         />

//                                     </div>

//                                     <h3>{item.title}</h3>

//                                     <p>
//                                         {item.description}
//                                     </p>

//                                     <span className="village-projects__card-link">
//                                         Open
//                                         <ArrowRight size={15} />
//                                     </span>

//                                 </div>
//                             );
//                         })}

//                     </div>

//                 </section>
//             </div>

//         </div>
//     );
// };

// export default VillageProjects;
import React from "react";
import {
    ArrowRight,
    FolderKanban,
    Plus,
    Building2,
    Users,
    TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./VillageProjects.scss";

const VillageProjects = () => {
    return (
        <section className="projects-page">

            {/* Hero Section */}
            <section className="projects-page__hero">
                <div className="container">
                    <div className="projects-page__hero-content">

                        <span className="projects-page__eyebrow">
                            <FolderKanban size={18} />
                            VILLAGE DEVELOPMENT
                        </span>

                        <h1>
                            Building a Better
                            <span> Mallupur</span>
                        </h1>

                        <p>
                            Explore and manage development projects that are
                            helping improve infrastructure, facilities and
                            quality of life in our village.
                        </p>

                        <div className="projects-page__actions">

                            <Link
                                to="/projects/all"
                                className="projects-page__button projects-page__button--primary"
                            >
                                View Projects
                                <ArrowRight size={18} />
                            </Link>

                            <Link
                                to="/project/create"
                                className="projects-page__button projects-page__button--secondary"
                            >
                                <Plus size={18} />
                                Create Project
                            </Link>

                        </div>
                    </div>
                </div>
            </section>


            {/* Introduction */}
            <section className="projects-page__about">
                <div className="container">

                    <div className="projects-page__section-heading">
                        <span>OUR DEVELOPMENT</span>

                        <h2>
                            Projects That Make a Difference
                        </h2>

                        <p>
                            Village development is an ongoing process. Every
                            project plays an important role in improving the
                            daily lives of residents and creating better
                            opportunities for the community.
                        </p>
                    </div>


                    <div className="projects-page__features">

                        <div className="project-feature">
                            <div className="project-feature__icon">
                                <Building2 size={24} />
                            </div>

                            <h3>Better Infrastructure</h3>

                            <p>
                                Development of roads, schools, drainage,
                                electricity and other essential facilities.
                            </p>
                        </div>


                        <div className="project-feature">
                            <div className="project-feature__icon">
                                <Users size={24} />
                            </div>

                            <h3>Community Focused</h3>

                            <p>
                                Projects are planned with the needs and
                                welfare of village residents in mind.
                            </p>
                        </div>


                        <div className="project-feature">
                            <div className="project-feature__icon">
                                <TrendingUp size={24} />
                            </div>

                            <h3>Continuous Development</h3>

                            <p>
                                Track ongoing and completed projects to
                                understand the progress of our village.
                            </p>
                        </div>

                    </div>
                </div>
            </section>


            {/* Management Section */}
            <section className="projects-page__management">
                <div className="container">

                    <div className="projects-page__management-box">

                        <div>
                            <span>
                                PROJECT MANAGEMENT
                            </span>

                            <h2>
                                Manage Village Development Projects
                            </h2>

                            <p>
                                View existing projects or create a new project
                                to keep village development information
                                organized and transparent.
                            </p>
                        </div>


                        <div className="projects-page__management-actions">

                            <Link
                                to="/projects/all"
                                className="projects-page__management-link"
                            >
                                <FolderKanban size={20} />
                                <div>
                                    <strong>All Projects</strong>
                                    <small>
                                        View and manage projects
                                    </small>
                                </div>

                                <ArrowRight size={18} />
                            </Link>


                            <Link
                                to="/project/create"
                                className="projects-page__management-link"
                            >
                                <Plus size={20} />
                                <div>
                                    <strong>Create Project</strong>
                                    <small>
                                        Add a new village project
                                    </small>
                                </div>

                                <ArrowRight size={18} />
                            </Link>

                        </div>

                    </div>

                </div>
            </section>

        </section>
    );
};

export default VillageProjects;