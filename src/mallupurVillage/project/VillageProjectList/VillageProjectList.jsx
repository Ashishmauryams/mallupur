
import React, { useEffect, useState } from "react";
import {
    FolderKanban,
    MapPin,
    CalendarDays,
    IndianRupee,
    ArrowRight,
    Search,
    Plus,
    CircleCheck,
    Clock3,
    CircleDashed,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./VillageProjectList.scss";
import { getAllProjects } from "../../../api/apiService";
import Loading from "../../loader/Loading";


const VillageProjectList = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState([]);

    useEffect(() => {
        fetchProject();
    }, []);

    const fetchProject = async () => {
        try {
            setLoading(true);
            const resp = await getAllProjects();
            if (resp?.status === 200 && resp?.data) {
                const respData = resp?.data;
                setProject(respData);
            }

        } catch (err) {
            console.log("error", err);
        } finally {
            setLoading(false);
        }


    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };


    const formatBudget = (budget) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(budget);
    };


    const getStatusIcon = (status) => {
        if (status === "COMPLETED") {
            return <CircleCheck size={15} />;
        }

        if (status === "IN_PROGRESS") {
            return <Clock3 size={15} />;
        }

        return <CircleDashed size={15} />;
    };


    const filteredproject = project?.filter((project) => {

        const matchesSearch =
            project?.title
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            project?.category
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            project?.location
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "ALL" ||
            project?.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="village-project-list">

            {loading ? <Loading borderColor="#000000" /> :

                <div className="container">
                    <section className="village-project-list__header">

                        <div className="village-project-list__header-content">

                            <div className="village-project-list__header-icon">
                                <FolderKanban size={28} />
                            </div>

                            <div>
                                <span>
                                    VILLAGE DEVELOPMENT
                                </span>

                                <h1>All Village project</h1>

                                <p>
                                    View and monitor all development project
                                    of your village.
                                </p>
                            </div>

                        </div>

                        <button
                            className="village-project-list__create-btn"
                            onClick={() =>
                                navigate("/home/project/create")
                            }
                        >
                            <Plus size={18} />
                            Create Project
                        </button>

                    </section>

                    <section className="village-project-list__filters">

                        <div className="village-project-list__search">

                            <Search size={18} />

                            <input
                                type="text"
                                placeholder="Search project..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>


                        <div className="village-project-list__status-filter">

                            <button
                                className={
                                    statusFilter === "ALL"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setStatusFilter("ALL")
                                }
                            >
                                All
                            </button>

                            <button
                                className={
                                    statusFilter === "PLANNED"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setStatusFilter("PLANNED")
                                }
                            >
                                Planned
                            </button>

                            <button
                                className={
                                    statusFilter === "IN_PROGRESS"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setStatusFilter("IN_PROGRESS")
                                }
                            >
                                In Progress
                            </button>

                            <button
                                className={
                                    statusFilter === "COMPLETED"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setStatusFilter("COMPLETED")
                                }
                            >
                                Completed
                            </button>

                        </div>

                    </section>

                    <div className="village-project-list__result">

                        <div>
                            <span>project</span>

                            <h2>
                                {filteredproject?.length} project Found
                            </h2>
                        </div>

                    </div>

                    {filteredproject?.length > 0 ? (

                        <section className="village-project-list__grid">

                            {filteredproject?.map((project) => (

                                <article
                                    className="village-project-list__card"
                                    key={project?.id}
                                >


                                    <div className="village-project-list__card-header">

                                        <div className="village-project-list__category">
                                            {project?.category}
                                        </div>

                                        <div
                                            className={`village-project-list__status village-project-list__status--${project?.status.toLowerCase()}`}
                                        >
                                            {getStatusIcon(project?.status)}

                                            {project?.status.replace(
                                                "_",
                                                " "
                                            )}
                                        </div>

                                    </div>

                                    <h3>
                                        {project?.title}
                                    </h3>

                                    <p className="village-project-list__description">
                                        {project?.description}
                                    </p>

                                    <div className="village-project-list__info">

                                        <div>
                                            <MapPin size={16} />

                                            <span>
                                                {project?.location}
                                            </span>
                                        </div>

                                        <div>
                                            <IndianRupee size={16} />

                                            <span>
                                                {formatBudget(
                                                    project?.budget
                                                )}
                                            </span>
                                        </div>

                                    </div>

                                    <div className="village-project-list__dates">

                                        <div>
                                            <span>Start Date</span>

                                            <strong>
                                                <CalendarDays size={14} />
                                                {formatDate(
                                                    project?.startDate
                                                )}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Expected End</span>

                                            <strong>
                                                <CalendarDays size={14} />
                                                {formatDate(
                                                    project?.expectedEndDate
                                                )}
                                            </strong>
                                        </div>

                                    </div>

                                    <div className="village-project-list__progress">

                                        <div className="village-project-list__progress-heading">

                                            <span>
                                                Progress
                                            </span>

                                            <strong>
                                                {project?.progress}%
                                            </strong>

                                        </div>

                                        <div className="village-project-list__progress-bar">

                                            <span
                                                style={{
                                                    width: `${project?.progress}%`,
                                                }}
                                            />

                                        </div>

                                    </div>

                                    <button
                                        className="village-project-list__view-btn"
                                        onClick={() =>
                                            navigate(
                                                `/project/details/${project?.id}`
                                            )
                                        }
                                    >
                                        View Project

                                        <ArrowRight size={17} />

                                    </button>

                                </article>

                            ))}

                        </section>

                    ) : (


                        <div className="village-project-list__empty">

                            <FolderKanban size={45} />

                            <h3>
                                No project Found
                            </h3>

                            <p>
                                No project matches your search or
                                selected status.
                            </p>

                            <button
                                onClick={() => {
                                    setSearch("");
                                    setStatusFilter("ALL");
                                }}
                            >
                                Clear Filters
                            </button>

                        </div>

                    )}
                </div>
            }

        </div>
    );
};

export default VillageProjectList;
