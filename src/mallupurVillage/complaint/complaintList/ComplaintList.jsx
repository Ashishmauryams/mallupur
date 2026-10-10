
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
    BookOpenCheck,
    ArrowRight,
    MessageSquareWarning,
} from "lucide-react";

import "./ComplaintList.scss";
import { getComplaintDetails } from "../../../api/apiService";
import BackButton from "../../reuseableCopmonent/BackButton/BackButton";

const ComplaintList = () => {
    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchComplaints();
    }, []);

    // Fetch complaints from API
    const fetchComplaints = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getComplaintDetails();

            setComplaints(
                Array.isArray(response?.data) ? response.data : []
            );
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // Format category name
    const getCategoryName = (category) => {
        if (!category) return "General";

        return category
            .toLowerCase()
            .replaceAll("_", " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    // Format status
    const getStatusName = (status) => {
        if (!status) return "Unknown";

        return status
            .toLowerCase()
            .replaceAll("_", " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    // Loading state
    if (loading) {
        return (
            <div className="complaint-list-page">
                <div className="container">
                    <div className="complaint-list-page__loader">
                        <span className="complaint-list-page__spinner" />
                        <p>Loading complaints...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="complaint-list-page">
                <div className="container">
                    <div className="complaint-list-page__error">
                        <div className="complaint-list-page__error-icon">!</div>

                        <h2>Unable to Load Complaints</h2>
                        <p>{error}</p>

                        <button
                            type="button"
                            onClick={fetchComplaints}
                            className="complaint-list-page__primary-btn"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="complaint-list-page">
            <div className="container">
                {/* Back button */}
                <div className="complaint-list-page__back">
                    <BackButton />
                </div>

                {/* Page heading */}
                <header className="complaint-list-page__header">
                    <div className="complaint-list-page__heading-content">
                        <span className="complaint-list-page__eyebrow">
                            VILLAGE PORTAL
                        </span>

                        <h1>My Complaints</h1>

                        <p>
                            View your reported complaints and check their current status.
                            Open a complaint to see its complete details.
                        </p>
                    </div>

                    <div className="complaint-list-page__count">
                        <span className="complaint-list-page__count-icon">
                            <MessageSquareWarning size={23} />
                        </span>

                        <div>
                            <strong>{complaints.length}</strong>
                            <span>
                                {complaints.length === 1
                                    ? "Complaint"
                                    : "Complaints"}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Complaint list */}
                {complaints.length === 0 ? (
                    <div className="complaint-list-page__empty">
                        <div className="complaint-list-page__empty-icon">
                            <BookOpenCheck size={34} />
                        </div>

                        <h2>No Complaints Yet</h2>

                        <p>
                            You haven't registered any complaints yet.
                            Report an issue to help improve your village.
                        </p>

                        <button
                            type="button"
                            className="complaint-list-page__primary-btn"
                            onClick={() =>
                                navigate("/home/complaints/register")
                            }
                        >
                            Register Complaint
                            <ArrowRight size={17} />
                        </button>
                    </div>
                ) : (
                    <section className="complaint-list-page__list">
                        {complaints
                            .slice()
                            .sort(
                                (a, b) =>
                                    new Date(b.createdAt) - new Date(a.createdAt)
                            )
                            .map((complaint) => (
                                <article
                                    className="complaint-card"
                                    key={complaint.id}
                                >
                                    {/* Card heading */}
                                    <div className="complaint-card__top">
                                        <div className="complaint-card__identity">
                                            <span className="complaint-card__id">
                                                #{complaint.id}
                                            </span>

                                            <span className="complaint-card__category">
                                                {getCategoryName(complaint.category)}
                                            </span>
                                        </div>

                                        <span
                                            className={`complaint-card__status complaint-card__status--${(
                                                complaint.status || "unknown"
                                            )
                                                .toLowerCase()
                                                .replaceAll("_", "-")}`}
                                        >
                                            <span className="complaint-card__status-dot" />
                                            {getStatusName(complaint.status)}
                                        </span>
                                    </div>

                                    {/* Title and short description */}
                                    <div className="complaint-card__body">
                                        <h2>{complaint.title || "Untitled Complaint"}</h2>

                                        <p>
                                            {complaint.description ||
                                                "No description provided."}
                                        </p>
                                    </div>

                                    {/* View details */}
                                    <div className="complaint-card__footer">
                                        <span className="complaint-card__footer-note">
                                            View full complaint information
                                        </span>

                                        <button
                                            type="button"
                                            className="complaint-card__view-btn"
                                            onClick={() =>
                                                navigate(
                                                    `/services/complaint/details/${complaint.id}`
                                                )
                                            }
                                        >
                                            View Details
                                            <ArrowRight size={17} />
                                        </button>
                                    </div>
                                </article>
                            ))}
                    </section>
                )}
            </div>
        </div>
    );
};

export default ComplaintList;