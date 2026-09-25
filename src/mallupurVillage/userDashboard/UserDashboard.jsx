
import React from "react";
import { Link } from "react-router";
import "./UserDashboard.scss";
import { useAuth } from "../../contextApi/AuthContext";
import { ChartBarBig, Clock, Files, Houses, Mail, MapPin, MessageCircleDashedCheck, Newspaper, NotebookPen, NotebookText, Phone } from "lucide-react";

const UserDashboard = () => {
  const { user } = useAuth();

  //   const user = {
  //     fullName: "Aashish Maurya",
  //     email: "aashish@example.com",
  //     phone: "+91 98765 43210",
  //     role: "Village Resident",
  //   };

  const services = [
    {
      icon: <NotebookPen />,
      title: "Register Complaint",
      description: "गाँव से जुड़ी समस्या दर्ज करें",
      path: "/services/complaint/register",
      className: "blue",
    },
    {
      icon: <NotebookText />,
      title: "My Complaints",
      description: "अपनी शिकायतों की स्थिति देखें",
      path: "/services/complaint/list",
      className: "green",
    },
    {
      icon: <Houses />,
      title: "Village Information",
      description: "गाँव से जुड़ी जानकारी देखें",
      path: "/about",
      className: "orange",
    },
    {
      icon: <Files />,
      title: "Documents",
      description: "महत्वपूर्ण दस्तावेज़ और सेवाएँ",
      path: "#",
      className: "purple",
    },
  ];

  const activities = [
    {
      title: "Complaint Registered",
      description: "आपकी शिकायत #CMP1024 सफलतापूर्वक दर्ज हुई।",
      date: "Today, 10:30 AM",
      status: "Submitted",
      statusClass: "submitted",
    },
    {
      title: "Complaint Under Review",
      description: "आपकी शिकायत #CMP1018 की समीक्षा की जा रही है।",
      date: "Yesterday, 03:20 PM",
      status: "In Review",
      statusClass: "review",
    },
    {
      title: "Profile Updated",
      description: "आपकी profile information successfully update हुई।",
      date: "12 Sep 2026",
      status: "Completed",
      statusClass: "completed",
    },
  ];

  return (
    <main className="user-dashboard">

      {/* =========================================
          DASHBOARD HEADER
      ========================================== */}

      <section className="dashboard-top">
        <div className="dashboard-container">

          <div className="welcome-area">
            <span className="dashboard-label">
              VILLAGE PORTAL
            </span>

            <h1>
              Welcome back,{" "}
              <span>{user.fullName.split(" ")[0]}</span> 
            </h1>

            <p>
              यहाँ से आप अपनी profile, complaints और village
              services को आसानी से manage कर सकते हैं।
            </p>
          </div>

          <Link to="/home/profile" className="profile-button">
            <span className="profile-small-avatar">
              {user.fullName.charAt(0)}
            </span>

            <span>My Profile</span>

            <span className="profile-arrow">→</span>
          </Link>

        </div>
      </section>

      {/* =========================================
          MAIN CONTENT
      ========================================== */}

      <section className="dashboard-content">
        <div className="dashboard-container">

          {/* =====================================
              PROFILE + STATS
          ====================================== */}

          <div className="overview-grid">

            {/* PROFILE CARD */}

            <div className="user-profile-card">

              <div className="profile-cover"></div>

              <div className="profile-content">

                <div className="profile-avatar">
                  {user.fullName.charAt(0)}
                </div>

                <div className="profile-info">
                  <span className="verified-badge">
                    ✓ Verified Citizen
                  </span>

                  <h2>{user.fullName}</h2>

                  <p>{user.role}</p>
                </div>

                <Link
                  to="/home/profile"
                  className="edit-profile"
                >
                  Edit Profile
                </Link>

                <div className="profile-details">

                  <div className="profile-detail">
                    <span className="detail-icon"><Mail /></span>

                    <div>
                      <small>Email Address</small>
                      <strong>{user.email}</strong>
                    </div>
                  </div>

                  <div className="profile-detail">
                    <span className="detail-icon"><Phone /></span>

                    <div>
                      <small>Mobile Number</small>
                      <strong>{user.phone}</strong>
                    </div>
                  </div>

                  <div className="profile-detail">
                    <span className="detail-icon"><MapPin /></span>

                    <div>
                      <small>Village</small>
                      <strong>Mallupur Village</strong>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* STATISTICS */}

            <div className="statistics">

              <div className="stats-heading">
                <div>
                  <span>YOUR ACTIVITY</span>
                  <h2>Overview</h2>
                </div>

                <span className="this-month">
                  This Month
                </span>
              </div>

              <div className="stats-grid">

                <div className="stat-card">
                  <div className="stat-top">
                    <div className="stat-icon blue">
                      <Newspaper />
                    </div>

                    <span className="stat-trend">
                      +1
                    </span>
                  </div>

                  <h3>02</h3>

                  <p>Total Complaints</p>
                </div>

                <div className="stat-card">
                  <div className="stat-top">
                    <div className="stat-icon green">
                      <MessageCircleDashedCheck />
                    </div>

                    <span className="stat-trend">
                      50%
                    </span>
                  </div>

                  <h3>01</h3>

                  <p>Resolved</p>
                </div>

                <div className="stat-card">
                  <div className="stat-top">
                    <div className="stat-icon orange">
                      <Clock />
                    </div>

                    <span className="stat-trend">
                      Active
                    </span>
                  </div>

                  <h3>01</h3>

                  <p>Pending</p>
                </div>

                <div className="stat-card">
                  <div className="stat-top">
                    <div className="stat-icon purple">
                      <ChartBarBig />
                    </div>
                  </div>

                  <h3>04</h3>

                  <p>Services Used</p>
                </div>

              </div>

            </div>

          </div>

          {/* =====================================
              QUICK SERVICES
          ====================================== */}

          <div className="section-block">

            <div className="section-title-row">

              <div>
                <span>VILLAGE SERVICES</span>
                <h2>Quick Services</h2>
              </div>

              <Link to="/services">
                View All →
              </Link>

            </div>

            <div className="services-grid">

              {services.map((service) => (
                <Link
                  to={service?.path}
                  className="service-card"
                  key={service?.title}
                >
                  <div
                    className={`service-icon ${service.className}`}
                  >
                    {service.icon}
                  </div>

                  <div className="service-content">
                    <h3>{service.title}</h3>

                    <p>{service.description}</p>
                  </div>

                  <span className="service-arrow">
                    →
                  </span>
                </Link>
              ))}

            </div>

          </div>

          {/* =====================================
              ACTIVITY + UPDATES
          ====================================== */}

          <div className="bottom-grid">

            {/* RECENT ACTIVITY */}

            <div className="activity-card">

              <div className="card-heading">
                <div>
                  <span>RECENT</span>
                  <h2>My Activity</h2>
                </div>

                <Link to="/complaints">
                  View All
                </Link>
              </div>

              <div className="activity-list">

                {activities.map((activity, index) => (
                  <div
                    className="activity-item"
                    key={index}
                  >

                    <div className="activity-line">
                      <span className="activity-dot"></span>

                      {index !== activities.length - 1 && (
                        <span className="activity-connector"></span>
                      )}
                    </div>

                    <div className="activity-body">

                      <div className="activity-title-row">

                        <h3>{activity.title}</h3>

                        <span
                          className={`activity-status ${activity.statusClass}`}
                        >
                          {activity.status}
                        </span>

                      </div>

                      <p>{activity.description}</p>

                      <small>{activity.date}</small>

                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* VILLAGE UPDATES */}

            <div className="updates-card">

              <div className="card-heading">

                <div>
                  <span>NOTICE BOARD</span>
                  <h2>Village Updates</h2>
                </div>

                <Link to="/notices">
                  View All
                </Link>

              </div>

              <div className="update-list">

                <div className="update-item">

                  <div className="update-date">
                    <strong>18</strong>
                    <span>SEP</span>
                  </div>

                  <div>
                    <h3>
                      ग्राम सभा की बैठक
                    </h3>

                    <p>
                      ग्राम सभा की आगामी बैठक से संबंधित
                      महत्वपूर्ण सूचना।
                    </p>
                  </div>

                </div>

                <div className="update-item">

                  <div className="update-date">
                    <strong>20</strong>
                    <span>SEP</span>
                  </div>

                  <div>
                    <h3>
                      पानी की सप्लाई सूचना
                    </h3>

                    <p>
                      पानी की supply से संबंधित नई
                      जानकारी उपलब्ध है।
                    </p>
                  </div>

                </div>

                <div className="update-item">

                  <div className="update-date">
                    <strong>24</strong>
                    <span>SEP</span>
                  </div>

                  <div>
                    <h3>
                      स्वच्छता अभियान
                    </h3>

                    <p>
                      गाँव में स्वच्छता अभियान आयोजित
                      किया जाएगा।
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =====================================
              HELP BANNER
          ====================================== */}

          <div className="help-banner">

            <div className="help-icon">
              ?
            </div>

            <div className="help-content">
              <span>NEED HELP?</span>

              <h2>
                किसी समस्या का सामना कर रहे हैं?
              </h2>

              <p>
                हमारी टीम से संपर्क करें या अपनी
                शिकायत दर्ज करें।
              </p>
            </div>

            <div className="help-actions">

              <Link
                to="/contact"
                className="contact-btn"
              >
                Contact Us
              </Link>

              <Link
                to="/services/complaint/register"
                className="complaint-btn"
              >
                Register Complaint →
              </Link>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
};

export default UserDashboard;

