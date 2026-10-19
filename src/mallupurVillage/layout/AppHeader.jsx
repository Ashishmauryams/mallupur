
import './style/appHeader.scss';
import { useAuth } from "../../contextApi/AuthContext";
import { Bell, ChevronDown, Menu, X } from 'lucide-react';
import ThemeToggleBtn from '../themes/ThemeToggle';
import { useUser } from '../../contextApi/UserContext';
import Loader from '../reuseableCopmonent/loader/Loader';

const AppHeader = ({ toggleSidebar, mobileOpen }) => {

    const { user } = useAuth();
    const { renderImageSource , loading} = useUser();



    return (

        <header className="app-header">
            <button
                type="button"
                className="sidebar-toggle"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
            >
                {mobileOpen ? <X /> : <Menu />}
            </button>

            <div className="header-brand">
                <strong>Mallupur</strong>
                <span>Village Portal</span>
            </div>

            <div className="header-search">
                <input
                    type="search"
                    placeholder="Search services, schemes, projects..."
                />
            </div>

            <div className="header-user center_1">
                <div className="notification">
                    <Bell />
                    <span className="count">+3</span>
                </div>
                <div className="center_1">
                    {loading ? <Loader /> : <img src={renderImageSource()} alt="image" />}
                    <div className="user">
                        <h6>{user?.fullName}</h6>
                        <p>{user?.role}</p>
                    </div>
                </div>
                <div><ChevronDown color='var(--text-secondary)' /></div>
                <ThemeToggleBtn />
            </div>
        </header>

    );
};

export default AppHeader;