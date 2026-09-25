import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../contextApi/AuthContext.jsx";
import ScrollToTop from "../ScrollToTop/ScrollToTop.jsx";

// Lazy loaded pages
const Front = lazy(() => import("../mallupurVillage/fontPage/Front"));
const Login = lazy(() => import("../mallupurVillage/loginsign/Login"));
const AppLayout = lazy(() => import("../mallupurVillage/layout/AppLayout"));
const Dashboard = lazy(() => import("../mallupurVillage/dashboard/Dashboard"));
const AboutVillage = lazy(() => import("../mallupurVillage/about/AboutVillage"));
const Complaint = lazy(() => import('../mallupurVillage/complaint/Complaint.jsx'));
const Contact = lazy(() => import('../mallupurVillage/contact/Contact.jsx'));
const UserDashboard = lazy(() => import('../mallupurVillage/userDashboard/UserDashboard.jsx'));
const RegisterComplaint = lazy(() => import('../mallupurVillage/complaint/RegisterComplaint/RegisterComplaint.jsx'));
const ComplaintList = lazy(() => import('../mallupurVillage/complaint/complaintList/ComplaintList.jsx'));
const ComplaintDetails = lazy(() => import('../mallupurVillage/complaint/ComplaintDetails/ComplaintDetail.jsx'));
const Profile = lazy(() => import('../mallupurVillage/profile/Profile.jsx'));
const EditProfile = lazy(()=>import('../mallupurVillage/profile/EditProfile.jsx'));

const AppRoutes = () => {
    const { user } = useAuth();
    const role = user?.role;

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>

                    {/* Public Routes */}
                    <Route path="/" element={<Front />} />
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route element={<AppLayout />}>
                            <Route path="/home" element={role === "admin" ? <Dashboard /> : <UserDashboard />} />
                            <Route path="/services/complaint" element={<Complaint />} />
                            <Route path="/services/complaint/register" element={<RegisterComplaint />} />
                            <Route path="/services/complaint/list" element={<ComplaintList />} />
                            <Route path="/services/complaint/details/:id" element={<ComplaintDetails />} />
                            <Route path="/home/profile" element={<Profile />} />
                            <Route path="/home/profile/edit" element={<EditProfile/>}/>

                            <Route path="/about" element={<AboutVillage />} />
                            <Route path="/contact" element={<Contact />} />
                        </Route>
                    </Route>

                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default AppRoutes;