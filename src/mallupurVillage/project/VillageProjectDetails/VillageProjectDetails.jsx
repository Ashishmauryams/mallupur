
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    FolderKanban,
    MapPin,
    CalendarDays,
    IndianRupee,
    CircleCheck,
    Clock3,
    CircleDashed,
    Tag,
    Activity,
    Pencil,
} from "lucide-react";

import "./VillageProjectDetails.scss";
import { getProjectDetailById } from "../../../api/apiService";
import Loading from "../../loader/Loading";

const VillageProjectDetails = () => {

    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState({});


    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchProjectDetails(id);
        }
    }, [id]);


    const fetchProjectDetails = async (id) => {
        try {
            setLoading(true);

            const resp = await getProjectDetailById(id);
            if (resp?.status === 200 && resp?.data) {
                setProject(resp?.data);
                console.log("project", project);
            }
        } catch (err) {
            console.log("err", err);
        } finally {
            setLoading(false);
        }
    }



    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
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
            return <CircleCheck size={17} />;
        }

        if (status === "IN_PROGRESS") {
            return <Clock3 size={17} />;
        }

        return <CircleDashed size={17} />;
    };


    if (!project) {
        return (
            <div className="village-project-details">
                <div className="village-project-details__not-found">

                    <FolderKanban size={50} />

                    <h2>
                        Project Not Found
                    </h2>

                    <p>
                        The project you are looking for
                        does not exist.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/projects/all")
                        }
                    >
                        <ArrowLeft size={17} />
                        Back to Projects
                    </button>

                </div>
            </div>
        );
    }

    return (
        <div className="village-project-details">
            {loading ? <Loading borderColor="#000000" /> :

                <div className="container">
                    <div className="village-project-details__topbar">

                        <button
                            className="village-project-details__back"
                            onClick={() =>
                                navigate("/projects/all")
                            }
                        >
                            <ArrowLeft size={18} />
                            Back to Projects
                        </button>

                        <button
                            className="village-project-details__edit"
                            onClick={() =>
                                navigate(
                                    `/project/edit/${project?.id}`, { state: { project } }
                                )
                            }
                        >
                            <Pencil size={17} />
                            Edit Project
                        </button>

                    </div>


                    <section className="village-project-details__hero">

                        <div className="village-project-details__hero-content">

                            <div className="village-project-details__hero-icon">
                                <FolderKanban size={30} />
                            </div>

                            <div>

                                <div className="village-project-details__hero-meta">

                                    <span className="village-project-details__category">
                                        <Tag size={13} />
                                        {project?.category}
                                    </span>

                                    <span
                                        className={`village-project-details__status village-project-details__status--${project?.status?.toLowerCase()}`}
                                    >
                                        {getStatusIcon(project?.status)}

                                        {project?.status?.replace(
                                            "_",
                                            " "
                                        )}
                                    </span>

                                </div>

                                <h1>
                                    {project?.title}
                                </h1>

                                <p>
                                    {project?.description}
                                </p>

                            </div>

                        </div>

                    </section>

                    <div className="village-project-details">

                        <section className="village-project-details__section">

                            <div className="village-project-details__section-heading">

                                <div className="village-project-details__section-icon">
                                    <Activity size={20} />
                                </div>

                                <div>
                                    <span>PROJECT OVERVIEW</span>
                                    <h2>
                                        Project Information
                                    </h2>
                                </div>

                            </div>

                            <div className="village-project-details__info-grid">
                                <div className="village-project-details__info-card">

                                    <div>
                                        <IndianRupee size={19} />
                                    </div>

                                    <span>
                                        Total Budget
                                    </span>

                                    <strong>
                                        {formatBudget(
                                            project?.budget
                                        )}
                                    </strong>

                                </div>


                                <div className="village-project-details__info-card">

                                    <div>
                                        <MapPin size={19} />
                                    </div>

                                    <span>
                                        Location
                                    </span>

                                    <strong>
                                        {project?.location}
                                    </strong>

                                </div>

                                <div className="village-project-details__info-card">

                                    <div>
                                        <CalendarDays size={19} />
                                    </div>

                                    <span>
                                        Start Date
                                    </span>

                                    <strong>
                                        {formatDate(
                                            project?.startDate
                                        )}
                                    </strong>

                                </div>




                                <div className="village-project-details__info-card">

                                    <div>
                                        <CalendarDays size={19} />
                                    </div>

                                    <span>
                                        Expected End
                                    </span>

                                    <strong>
                                        {formatDate(
                                            project?.expectedEndDate
                                        )}
                                    </strong>

                                </div>

                            </div>

                        </section>


                        <section className="village-project-details__section">

                            <div className="village-project-details__section-heading">

                                <div className="village-project-details__section-icon">
                                    <FolderKanban size={20} />
                                </div>

                                <div>
                                    <span>ABOUT PROJECT</span>
                                    <h2>
                                        Description
                                    </h2>
                                </div>

                            </div>

                            <div className="village-project-details__description">
                                {project?.description}
                            </div>

                        </section>

                        <section className="village-project-details__section">

                            <div className="village-project-details__section-heading">

                                <div className="village-project-details__section-icon">
                                    <Activity size={20} />
                                </div>

                                <div>
                                    <span>PROJECT PROGRESS</span>
                                    <h2>
                                        Current Progress
                                    </h2>
                                </div>

                            </div>


                            <div className="village-project-details__progress-box">

                                <div className="village-project-details__progress-header">

                                    <div>
                                        <span>
                                            Completion
                                        </span>

                                        <strong>
                                            {project?.progress}%
                                        </strong>
                                    </div>

                                    <span>
                                        {project?.status?.replace(
                                            "_",
                                            " "
                                        )}
                                    </span>

                                </div>


                                <div className="village-project-details__progress-bar">

                                    <span
                                        style={{
                                            width: `${project?.progress}%`,
                                        }}
                                    />

                                </div>


                                <div className="village-project-details__progress-footer">

                                    <span>
                                        Started:{" "}
                                        {formatDate(
                                            project?.startDate
                                        )}
                                    </span>

                                    <span>
                                        Expected:{" "}
                                        {formatDate(
                                            project?.expectedEndDate
                                        )}
                                    </span>

                                </div>

                            </div>

                        </section>

                    </div>
                </div>
            }

        </div>
    );
};

export default VillageProjectDetails;
