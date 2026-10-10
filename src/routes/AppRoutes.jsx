import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../contextApi/AuthContext.jsx";
import ScrollToTop from "../ScrollToTop/ScrollToTop.jsx";
import Loading from "../mallupurVillage/loader/Loading.jsx";

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
const EditProfile = lazy(() => import('../mallupurVillage/profile/EditProfile.jsx'));
const CreateVillageProject = lazy(() => import('../mallupurVillage/villageProject/CreateVillageProject/CreateVillageProject.jsx'));
const VillageProjects = lazy(() => import('../mallupurVillage/project/VillageProjects.jsx'));
const VillageProjectList = lazy(() => import('../mallupurVillage/project/VillageProjectList/VillageProjectList.jsx'));
const VillageProjectDetails = lazy(() => import('../mallupurVillage/project/VillageProjectDetails/VillageProjectDetails.jsx'));
const ForgotPassword = lazy(() => import('../mallupurVillage/ForgotPassword/ForgotPassword.jsx'));
const UserList = lazy(() => import('../mallupurVillage/user/UserList.jsx'));
const UserDetails = lazy(() => import('../mallupurVillage/user/UserDetail/UserDetails.jsx'));
const NotFoundGlobal = lazy(() => import('../mallupurVillage/NotFoundGlobal/NotFoundGlobal.jsx'));


const AppRoutes = () => {
    const { user } = useAuth();
    const role = user?.role;

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<Loading borderColor="#000000" />}>
                <Routes>

                    {/* Public Routes */}
                    <Route path="/" element={<Front />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgotPassword" element={<ForgotPassword />} />

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route element={<AppLayout />}>
                            <Route path="/home" element={role === "ADMIN" ? <Dashboard /> : <UserDashboard />} />
                            <Route path="/services/complaint" element={<Complaint />} />
                            <Route path="/services/complaint/create" element={<RegisterComplaint />} />
                            <Route path="/services/complaint/my" element={<ComplaintList />} />
                            <Route path="/services/complaint/details/:id" element={<ComplaintDetails />} />
                            <Route path="/home/profile" element={<Profile />} />
                            <Route path="/home/profile/edit" element={<EditProfile />} />

                            <Route path="/project/create" element={<CreateVillageProject />} />
                            <Route path="/project" element={<VillageProjects />} />
                            <Route path="/projects/all" element={<VillageProjectList />} />
                            <Route path="/project/Details/:id" element={<VillageProjectDetails />} />
                            <Route path="/project/edit/:id" element={<CreateVillageProject />} />

                            <Route path="/services/users" element={role === "ADMIN" && <UserList />} />
                            <Route path="/user/details/:id" element={role === "ADMIN" && <UserDetails />} />


                            <Route path="/about" element={<AboutVillage />} />
                            <Route path="/contact" element={<Contact />} />
                        </Route>

                        {/* Invalid URL */}

                        <Route path="*" element={<NotFoundGlobal />} />
                    </Route>

                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default AppRoutes;