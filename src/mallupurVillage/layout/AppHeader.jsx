
import { useState } from "react";
import { NavLink } from "react-router";
import './style/appHeader.scss';
import { useAuth } from "../../contextApi/AuthContext";
import HeaderLogo from "../../svg/HeaderLogo";


const AppHeader = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [serviceOpen, setServiceOpen] = useState(false);
    const [schemeOpen, setSchemeOpen] = useState(false);

    // Active class automatically
    const navClass = ({ isActive }) =>
        isActive ? "nav-link active" : "nav-link";

    const { logout } = useAuth();

    const { user } = useAuth();
    const role = user?.role;

    // Close mobile menu
    const closeMobileMenu = () => {
        setMobileMenu(false);
        setServiceOpen(false);
        setSchemeOpen(false);
    };

    return (
        <header className="app-header">

            <div className="header-container">

                {/* ================= LOGO ================= */}
                <NavLink
                    to="/home"
                    className="header-logo"
                    onClick={closeMobileMenu}
                >
                    <HeaderLogo />
                    <div className="logo-text">
                        <h2>Mallupur</h2>
                        <span>Village Portal</span>
                    </div>
                </NavLink>


                {/* ================= DESKTOP NAV ================= */}
                <nav className="desktop-nav">

                    {/* HOME */}
                    <NavLink
                        to="/home"
                        //end
                        className={navClass}
                    >
                        Home
                    </NavLink>


                    {/* ABOUT */}
                    <NavLink
                        to="/about"
                        className={navClass}
                    >
                        About
                    </NavLink>


                    {/* SERVICES */}
                    <div className="nav-dropdown">

                        <button
                            type="button"
                            className="nav-link dropdown-btn"
                            onClick={() => {
                                setServiceOpen(!serviceOpen);
                                setSchemeOpen(false);
                            }}
                        >
                            Services

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>


                        <div
                            className={`dropdown-menu ${serviceOpen ? "show" : ""
                                }`}
                        >

                            <NavLink to="/services" end>
                                All Services
                            </NavLink>

                            <NavLink to="/services/complaint"
                                onClick={() => setServiceOpen(false)}
                            >
                                Complaint
                            </NavLink>

                            {role === "ADMIN" &&
                                <NavLink to="/services/users"
                                    onClick={() => setServiceOpen(false)}
                                >
                                    Users
                                </NavLink>
                            }

                            <NavLink to="/services/death"
                                onClick={() => setServiceOpen(false)}
                            >
                                Death Certificate
                            </NavLink>

                            <NavLink to="/services/residence"
                                onClick={() => setServiceOpen(false)}
                            >
                                Residence Certificate
                            </NavLink>

                        </div>

                    </div>


                    {/* SCHEMES */}
                    <div className="nav-dropdown">

                        <button
                            type="button"
                            className="nav-link dropdown-btn"
                            onClick={() => {
                                setSchemeOpen(!schemeOpen);
                                setServiceOpen(false);
                            }}
                        >
                            Schemes

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>


                        <div
                            className={`dropdown-menu ${schemeOpen ? "show" : ""
                                }`}
                        >

                            <NavLink to="/schemes"
                                end
                            >
                                All Schemes
                            </NavLink>

                            <NavLink to="/schemes/farmer">
                                Farmer Schemes
                            </NavLink>

                            <NavLink to="/schemes/housing">
                                Housing Scheme
                            </NavLink>

                            <NavLink to="/schemes/scholarship">
                                Scholarship
                            </NavLink>

                        </div>

                    </div>


                    {/* GALLERY */}
                    <NavLink
                        to="/project"
                        className={navClass}
                    >
                        Project
                    </NavLink>


                    {/* NEWS */}
                    <NavLink
                        to="/news"
                        className={navClass}
                    >
                        News
                    </NavLink>


                    {/* CONTACT */}
                    <NavLink
                        to="/contact"
                        className={navClass}
                    >
                        Contact
                    </NavLink>

                </nav>


                {/* ================= RIGHT ACTIONS ================= */}
                <div className="header-actions">

                    {/* SEARCH */}
                    <button
                        type="button"
                        className="icon-btn"
                        aria-label="Search"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <circle
                                cx="11"
                                cy="11"
                                r="6.5"
                            />

                            <path d="M16 16l5 5" />
                        </svg>
                    </button>


                    <span className="divider"></span>


                    {/* NOTIFICATION */}
                    <button
                        type="button"
                        className="notification-btn"
                        aria-label="Notifications"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M18 9a6 6 0 0 0-12 0c0 5-2 6-2 8h16c0-2-2-3-2-8Z" />

                            <path d="M10 21h4" />
                        </svg>

                        <span className="notification-count">
                            3
                        </span>
                    </button>


                    <span className="divider"></span>


                    {/* LOGIN */}
                    {/* <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive
                                ? "login-btn active-btn"
                                : "login-btn"
                        }
                    >
                        Login
                    </NavLink> */}


                    {/* REGISTER */}
                    {/* <NavLink
                        to="/signup"
                        className={({ isActive }) =>
                            isActive
                                ? "register-btn active-btn"
                                : "register-btn"
                        }
                    >
                        Register
                    </NavLink> */}
                    <button
                        type="button"
                        className="logout-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>


                {/* ================= MOBILE MENU BUTTON ================= */}
                <button
                    type="button"
                    className={`mobile-menu-btn ${mobileMenu ? "open" : ""
                        }`}
                    onClick={() => setMobileMenu(!mobileMenu)}
                    aria-label="Toggle menu"
                    aria-expanded={mobileMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

            </div>


            {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}

            <div
                className={`mobile-nav ${mobileMenu ? "show" : ""
                    }`}
            >

                {/* HOME */}
                <NavLink
                    to="/home"
                    end
                    className={navClass}
                    onClick={closeMobileMenu}
                >
                    Home
                </NavLink>


                {/* ABOUT */}
                <NavLink
                    to="/about"
                    className={navClass}
                    onClick={closeMobileMenu}
                >
                    About
                </NavLink>


                {/* SERVICES */}
                <div className="mobile-dropdown">

                    <button
                        type="button"
                        onClick={() => {
                            setServiceOpen(!serviceOpen);
                            setSchemeOpen(false);
                        }}
                    >
                        <span>Services</span>

                        <svg
                            className={serviceOpen ? "rotate" : ""}
                            viewBox="0 0 24 24"
                        >
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </button>


                    {serviceOpen && (
                        <div className="mobile-dropdown-items">

                            <NavLink
                                to="/services"
                                onClick={closeMobileMenu}
                            >
                                All Services
                            </NavLink>

                            <NavLink
                                to="/services/certificate"
                                onClick={closeMobileMenu}
                            >
                                Certificate Services
                            </NavLink>

                            <NavLink
                                to="/services/birth"
                                onClick={closeMobileMenu}
                            >
                                Birth Certificate
                            </NavLink>

                            <NavLink
                                to="/services/death"
                                onClick={closeMobileMenu}
                            >
                                Death Certificate
                            </NavLink>

                        </div>
                    )}

                </div>


                {/* SCHEMES */}
                <div className="mobile-dropdown">

                    <button
                        type="button"
                        onClick={() => {
                            setSchemeOpen(!schemeOpen);
                            setServiceOpen(false);
                        }}
                    >
                        <span>Schemes</span>

                        <svg
                            className={schemeOpen ? "rotate" : ""}
                            viewBox="0 0 24 24"
                        >
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </button>


                    {schemeOpen && (
                        <div className="mobile-dropdown-items">

                            <NavLink
                                to="/schemes"
                                onClick={closeMobileMenu}
                            >
                                All Schemes
                            </NavLink>

                            <NavLink
                                to="/schemes/farmer"
                                onClick={closeMobileMenu}
                            >
                                Farmer Schemes
                            </NavLink>

                            <NavLink
                                to="/schemes/housing"
                                onClick={closeMobileMenu}
                            >
                                Housing Scheme
                            </NavLink>

                            <NavLink
                                to="/schemes/scholarship"
                                onClick={closeMobileMenu}
                            >
                                Scholarship
                            </NavLink>

                        </div>
                    )}

                </div>


                {/* GALLERY */}
                <NavLink
                    to="/gallery"
                    className={navClass}
                    onClick={closeMobileMenu}
                >
                    Gallery
                </NavLink>


                {/* NEWS */}
                <NavLink
                    to="/news"
                    className={navClass}
                    onClick={closeMobileMenu}
                >
                    News
                </NavLink>


                {/* CONTACT */}
                <NavLink
                    to="/contact"
                    className={navClass}
                    onClick={closeMobileMenu}
                >
                    Contact
                </NavLink>


                {/* MOBILE BUTTONS */}
                <div className="mobile-actions">

                    {/* <NavLink
                        to="/login"
                        className="mobile-login"
                        onClick={closeMobileMenu}
                    >
                        Login
                    </NavLink>

                    <NavLink
                        to="/signup"
                        className="mobile-register"
                        onClick={closeMobileMenu}
                    >
                        Register
                    </NavLink> */}

                    <button
                        type="button"
                        className="mobile-logout"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </header>
    );
};

export default AppHeader;