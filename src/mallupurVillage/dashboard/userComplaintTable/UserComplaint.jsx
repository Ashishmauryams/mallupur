// import { Link } from 'react-router';

// import './userComplaint.scss';
// import { Eye } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { getComplaintDetails } from '../../../api/apiService';

// function UserComplaint() {

//     const [complaints, setComplaints] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         fetchComplaints();
//     }, []);

//     // Fetch complaints from API
//     const fetchComplaints = async () => {
//         try {
//             setLoading(true);
//             setError("");

//             const response = await getComplaintDetails();

//             setComplaints(
//                 Array.isArray(response?.data) ? response.data : []
//             );
//         } catch (err) {
//             console.error(err);

//             setError(
//                 err.response?.data?.message ||
//                 "Something went wrong. Please try again."
//             );
//         } finally {
//             setLoading(false);
//         }
//     };


//     return (<>
//         <div className="dashboard-card complaints-card">
//             <div className="card-header">
//                 <h3>Recent Complaints</h3>
//                 <Link to="/services/complaint/my" className="view-all">View all →</Link>
//             </div>
//             <div className="table-responsive">
//                 <table className="complaints-table">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Complaint ID</th>
//                             <th>Issue / Description</th>
//                             <th>Date</th>
//                             <th>Status</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>1</td>
//                             <td>CMP-2026-0012</td>
//                             <td>
//                                 <strong>Streetlight not working</strong>
//                                 <p>Streetlight at Ward 3 has not been working since last week.</p>
//                             </td>
//                             <td>12 Oct 2026</td>
//                             <td><span className="status-badge resolved">● Resolved</span></td>
//                             <td><Link to="/home/complaints/1" className="action-btn"><Eye size={14} /> View</Link></td>
//                         </tr>
//                         <tr>
//                             <td>2</td>
//                             <td>CMP-2026-0011</td>
//                             <td>
//                                 <strong>Water supply issue</strong>
//                                 <p>Low water pressure in Ward 2 area.</p>
//                             </td>
//                             <td>10 Oct 2026</td>
//                             <td><span className="status-badge progress">● In Progress</span></td>
//                             <td><Link to="/home/complaints/2" className="action-btn"><Eye size={14} /> View</Link></td>
//                         </tr>
//                         <tr>
//                             <td>3</td>
//                             <td>CMP-2026-0010</td>
//                             <td>
//                                 <strong>Garbage collection delay</strong>
//                                 <p>Garbage has not been collected for 3 days.</p>
//                             </td>
//                             <td>08 Oct 2026</td>
//                             <td><span className="status-badge pending">● Pending</span></td>
//                             <td><Link to="/home/complaints/3" className="action-btn"><Eye size={14} /> View</Link></td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     </>);

// }

// export default UserComplaint;

import { Link } from 'react-router';
import './userComplaint.scss';
import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getComplaintDetails } from '../../../api/apiService';
import Loader from '../../reuseableCopmonent/loader/Loader';

function UserComplaint() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchComplaints();
    }, []);

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


    const recentComplaints = [...complaints]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);


    const getStatusClass = (status) => {
        switch (status?.toUpperCase()) {
            case 'RESOLVED':
                return { className: 'resolved', text: '● Resolved' };
            case 'IN_PROGRESS':
            case 'PROGRESS':
                return { className: 'progress', text: '● In Progress' };
            default:
                return { className: 'pending', text: '● Pending' };
        }
    };


    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <>
            <div className="dashboard-card complaints-card">
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
                            {loading ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                                        <Loader />
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
                                        {error}
                                    </td>
                                </tr>
                            ) : recentComplaints.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                                        No recent complaints found.
                                    </td>
                                </tr>
                            ) : (
                                recentComplaints.map((item, index) => {
                                    const statusInfo = getStatusClass(item.status);

                                    return (
                                        <tr key={item.id || index}>
                                            <td>{index + 1}</td>
                                            <td>CMP-2026-{String(item.id).padStart(4, '0')}</td>
                                            <td>
                                                <strong>{item.title}</strong>
                                                <p>{item.description}</p>
                                            </td>
                                            <td>{formatDate(item.createdAt)}</td>
                                            <td>
                                                <span className={`status-badge ${statusInfo.className}`}>
                                                    {statusInfo.text}
                                                </span>
                                            </td>
                                            <td>
                                                {/* Aapke AppRoutes ke mutabiq dynamic detail path */}
                                                <Link to={`/services/complaint/details/${item.id}`} className="action-btn">
                                                    <Eye size={14} /> View
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default UserComplaint;