
import { Link } from "react-router-dom";
import {
    Mail,
    Phone,
    MapPin,
    CalendarDays,
    Edit3,
} from "lucide-react";
import "./Profile.scss";
import BackButton from "../reuseableCopmonent/BackButton/BackButton";
import NotFound from "../reuseableCopmonent/notFound/NotFound";
import Loading from "../loader/Loading";
import ErrorMessage from "../reuseableCopmonent/errorMessage/ErrorMessage";
import { useUser } from "../../contextApi/UserContext";

const Profile = () => {


    const { userProfile, loading, error, renderImageSource } = useUser()

    return (
        <div className="profile-page">

            {loading ? (<Loading borderColor="#000" />) :
                error ? (<ErrorMessage />) :
                    userProfile ?
                        (<div className="container">

                            <div className="profile-page__header">
                                <div>

                                    <h1 className="profile-page__title">
                                        My Profile
                                    </h1>

                                    <p className="profile-page__description">
                                        View your personal information and account details.
                                    </p>
                                </div>
                                <BackButton path="/home" />
                            </div>

                            <div className="profile-page__card">

                                {/* Profile Top */}
                                <div className="profile-page__profile-between">
                                    <div className="profile-page__profile-top">
                                        <div className="profile-page__avatar-wrapper">
                                            <img
                                                src={renderImageSource()}
                                                alt={userProfile?.fullName}
                                                className="profile-page__avatar"
                                            />

                                            <span className="profile-page__online-dot"></span>
                                        </div>

                                        <div className="profile-page__identity">
                                            <h2>{userProfile?.fullName}</h2>

                                            <p>
                                                @{userProfile?.username}
                                            </p>

                                            <span className="profile-page__role">
                                                {userProfile?.role}
                                            </span>
                                        </div>
                                    </div>
                                    <Link
                                        to="/home/profile/edit"
                                        className="profile-page__edit-btn"
                                    >
                                        <Edit3 size={18} />
                                        Edit Profile
                                    </Link>
                                </div>

                                {/* Divider */}
                                <div className="profile-page__divider"></div>

                                {/* Information */}
                                <div className="profile-page__section">

                                    <h3 className="profile-page__section-title">
                                        Personal Information
                                    </h3>

                                    <div className="profile-page__info-grid">

                                        {/* Email */}
                                        <div className="profile-page__info-item">
                                            <div className="profile-page__icon">
                                                <Mail size={20} />
                                            </div>

                                            <div>
                                                <span>Email Address</span>
                                                <p>{userProfile?.email}</p>
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="profile-page__info-item">
                                            <div className="profile-page__icon">
                                                <Phone size={20} />
                                            </div>

                                            <div>
                                                <span>Phone Number</span>
                                                <p>{userProfile?.phone}</p>
                                            </div>
                                        </div>

                                        {/* Village */}
                                        <div className="profile-page__info-item">
                                            <div className="profile-page__icon">
                                                <MapPin size={20} />
                                            </div>

                                            <div>
                                                <span>Village</span>
                                                <p>{userProfile?.village || "Mallupur"}</p>
                                            </div>
                                        </div>

                                        {/* Joined Date */}
                                        <div className="profile-page__info-item">
                                            <div className="profile-page__icon">
                                                <CalendarDays size={20} />
                                            </div>

                                            <div>
                                                <span>Member Since</span>
                                                <p>{userProfile?.createAt}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* Account Information */}
                                <div className="profile-page__account">

                                    <h3 className="profile-page__section-title">
                                        Account Information
                                    </h3>

                                    <div className="profile-page__account-row">
                                        <div>
                                            <span>Username</span>
                                            <p>{userProfile?.username}</p>
                                        </div>

                                        <div>
                                            <span>Account Type</span>
                                            <p>{userProfile?.role}</p>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>) :
                        (<NotFound />)

            }
        </div>
    );
};

export default Profile;
