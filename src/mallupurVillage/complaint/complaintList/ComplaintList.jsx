

import { useNavigate } from "react-router";
import "./ComplaintList.scss";
import { useEffect, useState } from "react";
import { getComplaintDetails } from "../../../api/apiService";
import { BookOpenCheck, CalendarDays, MapPin, Zap } from "lucide-react";
import BackButton from "../../reuseableCopmonent/BackButton/BackButton";


const ComplaintList = () => {
    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getComplaintDetails();

            setComplaints(response?.data);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Something wents wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const getCategoryName = (category) => {
        if (!category) return "";

        return category
            .toLowerCase()
            .replaceAll("_", " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    if (loading) {
        return (
            <div className="complaint-list-page">
                <div className="complaint-loader">
                    <div className="loader"></div>
                    <p>Loading complaints...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="complaint-list-page">
                <div className="complaint-error">
                    <div className="error-icon">!</div>

                    <h3>Unable to load complaints</h3>

                    <p>{error}</p>

                    <button onClick={fetchComplaints}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="complaint-list-page">
            <div className="complaint-list-container">

                {/* PAGE HEADER */}
                <div style={{ justifySelf: "end", marginBottom: "30px" }}>
                    <BackButton />
                </div>
                <div className="page-header">
                    <div>
                        <span className="page-label">
                            VILLAGE PORTAL
                        </span>

                        <h1>My Complaints</h1>

                        <p>
                            Track and manage the complaints you have
                            reported.
                        </p>
                    </div>

                    <div className="complaint-count">
                        <strong>{complaints.length}</strong>
                        <span>
                            {complaints?.length === 1
                                ? "Complaint"
                                : "Complaints"}
                        </span>
                    </div>
                </div>
                {complaints?.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon"><BookOpenCheck /></div>

                        <h2>No Complaints Found</h2>

                        <p>
                            You haven't registered any complaint yet.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/home/complaints/register")
                            }
                        >
                            Register Complaint
                        </button>
                    </div>
                ) : (
                    <div className="complaint-list">

                        {complaints
                            .slice()
                            .sort(
                                (a, b) =>
                                    new Date(b.createdAt) -
                                    new Date(a.createdAt)
                            )
                            .map((complaint) => (
                                <div
                                    className="complaint-card"
                                    key={complaint.id}
                                >

                                    {/* CARD TOP */}
                                    <div className="card-top">

                                        <div className="complaint-title-section">
                                            <div className="complaint-number">
                                                #{complaint?.id}
                                            </div>

                                            <div>
                                                <span className="category">
                                                    {getCategoryName(
                                                        complaint?.category
                                                    )}
                                                </span>

                                                <h2>{complaint?.title}</h2>
                                            </div>
                                        </div>

                                        <div
                                            className={`status-badge ${complaint?.status?.toLowerCase()}`}
                                        >
                                            <span></span>
                                            {complaint.status?.replaceAll("_", " ")}
                                        </div>
                                    </div>

                                    {/* DESCRIPTION */}
                                    <p className="description">
                                        {complaint?.description}
                                    </p>

                                    {/* DETAILS */}
                                    <div className="complaint-details">

                                        <div className="detail">
                                            <span className="detail-icon">
                                                <MapPin />
                                            </span>

                                            <div>
                                                <label>Location</label>
                                                <p>{complaint?.location}</p>
                                            </div>
                                        </div>

                                        <div className="detail">
                                            <span className="detail-icon">
                                                <Zap />
                                            </span>

                                            <div>
                                                <label>Priority</label>

                                                <p
                                                    className={`priority ${complaint?.priority?.toLowerCase()}`}
                                                >
                                                    {complaint?.priority}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="detail">
                                            <span className="detail-icon">
                                                <CalendarDays />
                                            </span>

                                            <div>
                                                <label>Reported On</label>
                                                <p>
                                                    {formatDate(
                                                        complaint?.createdAt
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                    </div>

                                    {/* CARD BOTTOM */}
                                    <div className="card-bottom">

                                        <span className="reported-by">
                                            Reported by{" "}
                                            <strong>
                                                {complaint.reportedBy}
                                            </strong>
                                        </span>

                                        <button
                                            className="view-button"
                                            onClick={() =>
                                                navigate(
                                                    `/services/complaint/details/${complaint.id}`
                                                )
                                            }
                                        >
                                            View Details
                                            <span>→</span>
                                        </button>

                                    </div>

                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComplaintList;