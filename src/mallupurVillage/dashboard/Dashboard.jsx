
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  MessageSquare,
  Sprout,
  FolderKanban,
  Pencil,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  Mail,
  Phone,
  MapPin,
  Eye
} from "lucide-react";
import "./Dashboard.scss";
import { getUserProfile } from "../../api/apiService";
import { useAuth } from "../../contextApi/AuthContext";
import Loading from "../loader/Loading";
import UserComplaint from "./userComplaintTable/userComplaint";

const Dashboard = () => {

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});


  const { user } = useAuth();

  useEffect(() => {
    fetchUsersProfile();
  }, []);

  const fetchUsersProfile = async () => {
    try {
      setLoading(true);
      const resp = await getUserProfile();
      if (resp?.status === 200 && resp?.data) {
        setUserData(resp?.data);
      }

    } catch (err) {
      console.log("err----", err);
    } finally {
      setLoading(false);
    }
  }



  return (
    <div className="dashboard-content">
      {/* 1. Hero Banner */}
      <section className="dashboard-hero">
        <div className="dashboard-hero__text">
          <span className="dashboard-hero__greeting">Good Morning ☀️</span>
          <h1>Welcome back, <span>{user?.fullName}!</span></h1>
          <p>Let's build a better Mallupur together. Manage your complaints, explore government schemes and stay updated with village development.</p>
        </div>
        <div className="dashboard-hero__date-badge">
          <Calendar size={18} />
          <div>
            <strong>
              {new Date().toLocaleDateString("en-GB", {
                weekday: "long",
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </strong>
            <span>Mallupur Village, India</span>
          </div>
        </div>
      </section>

      {/* 2. Quick Action Cards */}
      <div className="dashboard-quick-actions">
        <Link to="/services/complaint/create" className="quick-card primary-light">
          <div className="quick-card__icon">
            <FileText size={40} />
          </div>
          <div>
            <h3>Raise a Complaint</h3>
            <p>Report issues in your village</p>
          </div>
          <ArrowRight size={18} className="quick-card__arrow" />
        </Link>

        <Link to="/services/complaint/my" className="quick-card">
          <div className="quick-card__icon blue">
            <MessageSquare size={40} />
          </div>
          <div>
            <h3>Track My Requests</h3>
            <p>Check status of your complaints</p>
          </div>
          <ArrowRight size={18} className="quick-card__arrow" />
        </Link>

        <Link to="/schemes/links" className="quick-card">
          <div className="quick-card__icon yellow">
            <Sprout size={40} />
          </div>
          <div>
            <h3>Explore Schemes</h3>
            <p>Discover government schemes</p>
          </div>
          <ArrowRight size={18} className="quick-card__arrow" />
        </Link>

        <Link to="/project/all" className="quick-card">
          <div className="quick-card__icon purple">
            <FolderKanban size={40} />
          </div>
          <div>
            <h3>Village Projects</h3>
            <p>View ongoing projects</p>
          </div>
          <ArrowRight size={18} className="quick-card__arrow" />
        </Link>
      </div>

      {/* 3. Middle Section: Profile, Activity, News */}
      <div className="dashboard-grid-middle">
        {/* My Profile Card */}
      {loading ? <Loading borderColor="#000000" height="50%"/> : 
        <div className="dashboard-card profile-card">
          <div className="card-header">
            <h3>My Profile</h3>
            <Link to="/home/profile/edit" className="edit-btn">
              <Pencil size={14} /> Edit Profile
            </Link>
          </div>
          <div className="profile-user-info">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"
              alt="Sangam"
              className="profile-avatar"
            />
            <div>
              <h4>{userData?.fullName}</h4>
              <span className="badge-verified">Verified Citizen</span>
              <p className="user-role">{userData?.role}</p>
            </div>
          </div>
          <div className="profile-contact-list">
            <div className="contact-item">
              <Mail size={16} />
              <div>
                <span className="label">Email Address</span>
                <strong>{userData?.email}</strong>
              </div>
            </div>
            <div className="contact-item">
              <Phone size={16} />
              <div>
                <span className="label">Mobile Number</span>
                <strong>{userData?.phone}</strong>
              </div>
            </div>
            <div className="contact-item">
              <MapPin size={16} />
              <div>
                <span className="label">Village</span>
                <strong>Mallupur Village</strong>
              </div>
            </div>
          </div>
        </div>
      }

        {/* My Activity Overview */}
        <div className="dashboard-card activity-card">
          <div className="card-header">
            <h3>My Activity Overview</h3>
            <select className="month-select">
              <option>This Month</option>
            </select>
          </div>
          <div className="activity-grid">
            <div className="activity-box">
              <div className="box-top">
                <span className="icon-wrap green"><FileText size={22} /></span>
                <span className="trend-up">↑ +1</span>
              </div>
              <h2>02</h2>
              <p>Total Complaints</p>
              <div className="progress-bar-wrap">
                <div className="progress-bar" style={{ width: "100%" }}></div>
              </div>
              <span className="sub-text">Out of 5 this month</span>
            </div>

            <div className="activity-box">
              <div className="box-top">
                <span className="icon-wrap success"><CheckCircle2 size={22} /></span>
                <span className="percentage">50%</span>
              </div>
              <h2>01</h2>
              <p>Resolved</p>
              <div className="progress-bar-wrap">
                <div className="progress-bar success" style={{ width: "50%" }}></div>
              </div>
              <span className="sub-text">50% resolved</span>
            </div>

            <div className="activity-box">
              <div className="box-top">
                <span className="icon-wrap warning"><Clock size={22} /></span>
                <span className="percentage">50%</span>
              </div>
              <h2>01</h2>
              <p>In Progress</p>
              <div className="progress-bar-wrap">
                <div className="progress-bar warning" style={{ width: "50%" }}></div>
              </div>
              <span className="sub-text">50% in progress</span>
            </div>

            <div className="activity-box">
              <div className="box-top">
                <span className="icon-wrap purple"><Layers size={22} /></span>
                <span className="trend-up">+2</span>
              </div>
              <h2>04</h2>
              <p>Services Used</p>
              <div className="progress-bar-wrap">
                <div className="progress-bar purple" style={{ width: "80%" }}></div>
              </div>
              <span className="sub-text">Across all services</span>
            </div>
          </div>
        </div>

        {/* Village News & Updates */}
        <div className="dashboard-card news-card">
          <div className="card-header">
            <h3>Village News & Updates</h3>
            <Link to="/home/news" className="view-all">View all →</Link>
          </div>
          <div className="news-list">
            <div className="news-item">
              <img src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=80&q=80" alt="News" />
              <div>
                <strong>New LED Streetlights Installed</strong>
                <span>12 Oct 2026</span>
                <p>LED streetlights have been installed in Ward 3 to improve safety.</p>
              </div>
            </div>
            <div className="news-item">
              <img src="https://images.unsplash.com/photo-1541888946425-d0fbb18f86f8?auto=format&fit=crop&w=80&q=80" alt="News" />
              <div>
                <strong>Water Supply Schedule Updated</strong>
                <span>10 Oct 2026</span>
                <p>New water supply timing is now available for all wards.</p>
              </div>
            </div>
            <div className="news-item">
              <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=80&q=80" alt="News" />
              <div>
                <strong>Upcoming Health Camp</strong>
                <span>08 Oct 2026</span>
                <p>Free health checkup camp next Sunday at Primary School.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Recent Complaints Table */}
      {/* <div className="dashboard-card complaints-card">
        <div className="card-header">
          <h3>Recent Complaints</h3>
          <Link to="/services/complaint/my" className="view-all">View all →</Link>
        </div>
        <div className="table-responsive">
          <table className="complaints-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Complaint ID</th>
                <th>Issue / Description</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>CMP-2026-0012</td>
                <td>
                  <strong>Streetlight not working</strong>
                  <p>Streetlight at Ward 3 has not been working since last week.</p>
                </td>
                <td>12 Oct 2026</td>
                <td><span className="status-badge resolved">● Resolved</span></td>
                <td><Link to="/home/complaints/1" className="action-btn"><Eye size={14} /> View</Link></td>
              </tr>
              <tr>
                <td>2</td>
                <td>CMP-2026-0011</td>
                <td>
                  <strong>Water supply issue</strong>
                  <p>Low water pressure in Ward 2 area.</p>
                </td>
                <td>10 Oct 2026</td>
                <td><span className="status-badge progress">● In Progress</span></td>
                <td><Link to="/home/complaints/2" className="action-btn"><Eye size={14} /> View</Link></td>
              </tr>
              <tr>
                <td>3</td>
                <td>CMP-2026-0010</td>
                <td>
                  <strong>Garbage collection delay</strong>
                  <p>Garbage has not been collected for 3 days.</p>
                </td>
                <td>08 Oct 2026</td>
                <td><span className="status-badge pending">● Pending</span></td>
                <td><Link to="/home/complaints/3" className="action-btn"><Eye size={14} /> View</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}

      <UserComplaint/>
    </div>
  );
};

export default Dashboard;

