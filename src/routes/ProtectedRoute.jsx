import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contextApi/AuthContext";

const ProtectedRoute = () => {

    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="auth-loading">
                Checking authentication...
            </div>
        );
    }

    if (!isAuthenticated) {

        return (

            <Navigate
                to="/login"
                replace
            />

        );
    }

    return <Outlet />;
};

export default ProtectedRoute;