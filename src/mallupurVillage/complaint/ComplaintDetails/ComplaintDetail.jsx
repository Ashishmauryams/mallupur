
import { useNavigate, useParams } from "react-router";
import "./ComplaintDetail.scss";
import { useEffect, useState } from "react";
import { getComplaintById } from "../../../api/apiService";
import { ReceiptText, ScrollText, TrendingUp } from "lucide-react";
import BackButton from "../../reuseableCopmonent/BackButton/BackButton";


const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getComplaintById(id);
        if (response?.status === 200) {
          setComplaint(response?.data);
        }
      } catch (err) {
        console.error("Complaint details error:", err);

        setError(
          err.response?.data?.message ||
          "Something wents wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "Not resolved yet";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatText = (text) => {
    if (!text) return "";

    return text
      .toLowerCase()
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  if (loading) {
    return (
      <div className="complaint-details-page">
        <div className="details-loading">
          <div className="details-loader"></div>
          <p>Loading complaint details...</p>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="complaint-details-page">
        <div className="details-error">
          <div className="error-circle">!</div>

          <h2>Complaint Not Found</h2>

          <p>{error}</p>

          <button onClick={() => navigate(-1)}>
            Back to Complaints
          </button>
        </div>
      </div>
    );
  }

  if (!complaint) return null;

  return (
    <div className="complaint-details-page">
      <div className="complaint-details-container">

        {/* <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <span>←</span>
          Back to Complaints
        </button> */}
        <div style={{ justifySelf: "end", marginBottom: "30px" }}>
          <BackButton />
        </div>


        <div className="details-header">

          <div className="header-left">

            <div className="complaint-id-box">
              #{complaint?.id}
            </div>

            <div>
              <span className="details-label">
                COMPLAINT DETAILS
              </span>

              <h1>{complaint?.title}</h1>

              <p>
                Submitted on {formatDate(complaint?.createdAt)}
              </p>
            </div>

          </div>

          <div
            className={`status-badge ${complaint?.status?.toLowerCase()}`}
          >
            <span className="status-dot"></span>

            {formatText(complaint?.status)}
          </div>

        </div>

        <div className="details-layout">

          <div className="details-main">
            <div className="details-card">

              <div className="card-title">
                <div className="title-icon"><ReceiptText /></div>

                <div>
                  <h2>Complaint Description</h2>
                  <p>Details provided by the citizen</p>
                </div>
              </div>

              <div className="description-content">
                {complaint?.description}
              </div>

            </div>

            {/* Complaint Information */}

            <div className="details-card">

              <div className="card-title">
                <div className="title-icon"><ScrollText /></div>

                <div>
                  <h2>Complaint Information</h2>
                  <p>Basic information about this complaint</p>
                </div>
              </div>

              <div className="information-grid">

                <div className="information-item">
                  <span>Category</span>

                  <strong>
                    {formatText(complaint?.category)}
                  </strong>
                </div>

                <div className="information-item">
                  <span>Priority</span>

                  <strong
                    className={`priority ${complaint?.priority?.toLowerCase()}`}
                  >
                    {formatText(complaint?.priority)}
                  </strong>
                </div>

                <div className="information-item">
                  <span>Location</span>

                  <strong>
                    {complaint?.location || "Not provided"}
                  </strong>
                </div>

                <div className="information-item">
                  <span>Reported By</span>

                  <strong>
                    {complaint?.reportedBy}
                  </strong>
                </div>

              </div>

            </div>

          </div>

          {/* ================= RIGHT ================= */}

          <div className="details-sidebar">

            {/* Status */}

            <div className="details-card status-card">

              <div className="card-title">
                <div className="title-icon"><TrendingUp /></div>

                <div>
                  <h2>Complaint Status</h2>
                  <p>Current progress</p>
                </div>
              </div>

              <div className="status-timeline">

                {/* Reported */}

                <div className="timeline-item active">

                  <div className="timeline-indicator">
                    <span></span>
                  </div>

                  <div className="timeline-content">
                    <h3>Complaint Reported</h3>

                    <p>
                      {formatDate(complaint?.createdAt)}
                    </p>
                  </div>

                </div>

                {/* Resolved */}

                <div
                  className={`timeline-item ${complaint?.resolvedAt
                    ? "active"
                    : "pending"
                    }`}
                >

                  <div className="timeline-indicator">
                    <span></span>
                  </div>

                  <div className="timeline-content">
                    <h3>
                      {complaint?.resolvedAt
                        ? "Complaint Resolved"
                        : "Resolution Pending"}
                    </h3>

                    <p>
                      {complaint?.resolvedAt
                        ? formatDate(complaint?.resolvedAt)
                        : "Your complaint is still under process."}
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Summary */}

            <div className="details-card summary-card">

              <h2>Complaint Summary</h2>

              <div className="summary-row">
                <span>Complaint ID</span>
                <strong>#{complaint?.id}</strong>
              </div>

              <div className="summary-row">
                <span>Category</span>
                <strong>
                  {formatText(complaint?.category)}
                </strong>
              </div>

              <div className="summary-row">
                <span>Priority</span>
                <strong
                  className={`priority ${complaint?.priority?.toLowerCase()}`}
                >
                  {formatText(complaint?.priority)}
                </strong>
              </div>

              <div className="summary-row">
                <span>Status</span>
                <strong>
                  {formatText(complaint?.status)}
                </strong>
              </div>

              <div className="summary-row">
                <span>Reported By</span>
                <strong>
                  {complaint?.reportedBy}
                </strong>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ComplaintDetail;
