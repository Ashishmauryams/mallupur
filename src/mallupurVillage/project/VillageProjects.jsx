
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
import { useAuth } from "../../contextApi/AuthContext";

const VillageProjects = () => {

    const { user } = useAuth();
    const role = user?.role;

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
                                to="/project/all"
                                className="projects-page__button projects-page__button--primary"
                            >
                                View Projects
                                <ArrowRight size={18} />
                            </Link>

                            {role === "ADMIN" &&

                                <Link
                                    to="/project/create"
                                    className="projects-page__button projects-page__button--secondary" >

                                    <Plus size={18} />
                                    Create Project
                                </Link>
                            }

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
                                to="/project/all"
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


                            {role === "ADMIN" &&
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
                            }

                        </div>

                    </div>

                </div>
            </section>

        </section>
    );
};

export default VillageProjects;