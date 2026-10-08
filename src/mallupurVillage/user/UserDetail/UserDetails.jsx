import React, { useEffect, useState } from "react";
import {
    ArrowLeft,
    UserRound,
    Mail,
    Phone,
    ShieldCheck,
    CalendarDays,
    AtSign,
    CircleUserRound,
    Pencil,
    Trash2,
} from "lucide-react";

import "./UserDetails.scss";
import { getAdminUserById } from "../../../api/apiService";
import { useNavigate, useParams } from "react-router";
import { formatDateTime } from "../../../utils/dateUtils";
import Loading from "../../loader/Loading";
import BackButton from "../../reuseableCopmonent/BackButton/BackButton";

const UserDetails = () => {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchUserDetails(id);
        }
    }, [id]);

    const fetchUserDetails = async (id) => {
        try {
            setLoading(true);
            const resp = await getAdminUserById(id);
            if (resp?.status === 200) {
                setUser(resp?.data);
            }
        } catch (err) {
            console.log("err", err);
        } finally {
            setLoading(false);
        }
    }





    return (
        <div className="user-details">

            {loading ? <Loading /> :
                <div>
                    <div className="user-details__topbar">
                        {/* <button
                            type="button"
                            className="user-details__back"
                            onClick={() => navigate('/userList')}

                        >
                            <ArrowLeft size={18} />
                            <span>Back to Users</span>
                        </button> */}
                        <BackButton path={"/services/users"}/>

                        <div className="user-details__actions">

                            <button
                                type="button"
                                className="user-details__action user-details__action--edit"
                            >
                                <Pencil size={17} />
                                Edit User
                            </button>

                            <button
                                type="button"
                                className="user-details__action user-details__action--delete"
                            >
                                <Trash2 size={17} />
                                Delete
                            </button>

                        </div>

                    </div>

                    <div className="user-details__profile">

                        <div className="user-details__avatar">
                            {user?.fullName?.charAt(0)?.toUpperCase()}
                        </div>

                        <div className="user-details__profile-info">

                            <div className="user-details__name-row">

                                <h1>{user?.fullName}</h1>

                                <span className="user-details__role">
                                    <ShieldCheck size={14} />
                                    {user?.role}
                                </span>

                            </div>

                            <p className="user-details__username">
                                <AtSign size={15} />
                                {user?.username}
                            </p>

                            <p className="user-details__member">
                                <CalendarDays size={14} />
                                {
                                    formatDateTime(user?.createAt)
                                }
                            </p>

                        </div>

                        <div className="user-details__user-id">
                            <span>User ID</span>
                            <strong>#{user?.id}</strong>
                        </div>

                    </div>


                    <div className="user-details__content">

                        <div className="user-details__section">

                            <div className="user-details__section-heading">

                                <div className="user-details__section-icon">
                                    <CircleUserRound size={19} />
                                </div>

                                <div>
                                    <h2>Personal Information</h2>
                                    <p>Basic information about this user</p>
                                </div>

                            </div>


                            <div className="user-details__grid">

                                <div className="user-details__field">

                                    <span className="user-details__label">
                                        Full Name
                                    </span>

                                    <div className="user-details__value">
                                        <UserRound size={17} />
                                        <span>{user?.fullName}</span>
                                    </div>

                                </div>


                                <div className="user-details__field">

                                    <span className="user-details__label">
                                        Username
                                    </span>

                                    <div className="user-details__value">
                                        <AtSign size={17} />
                                        <span>{user?.username}</span>
                                    </div>

                                </div>


                                <div className="user-details__field">

                                    <span className="user-details__label">
                                        Email Address
                                    </span>

                                    <div className="user-details__value">
                                        <Mail size={17} />
                                        <span>{user?.email}</span>
                                    </div>

                                </div>


                                <div className="user-details__field">

                                    <span className="user-details__label">
                                        Phone Number
                                    </span>

                                    <div className="user-details__value">
                                        <Phone size={17} />
                                        <span>{user?.phone}</span>
                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* =========================================
                    ACCOUNT INFORMATION
                ========================================= */}

                        <div className="user-details__section">

                            <div className="user-details__section-heading">

                                <div className="user-details__section-icon">
                                    <ShieldCheck size={19} />
                                </div>

                                <div>
                                    <h2>Account Information</h2>
                                    <p>Account access and registration details</p>
                                </div>

                            </div>


                            <div className="user-details__account-grid">

                                <div className="user-details__account-card">

                                    <span className="user-details__account-label">
                                        Account Role
                                    </span>

                                    <div className="user-details__account-value">
                                        <span className="user-details__role user-details__role--large">
                                            <ShieldCheck size={15} />
                                            {user?.role}
                                        </span>
                                    </div>

                                </div>


                                <div className="user-details__account-card">

                                    <span className="user-details__account-label">
                                        User ID
                                    </span>

                                    <strong>
                                        #{user?.id}
                                    </strong>

                                </div>


                                <div className="user-details__account-card">

                                    <span className="user-details__account-label">
                                        Registered On
                                    </span>

                                    <strong>
                                        {
                                            formatDateTime(user?.createAt)
                                        }
                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            }

        </div>
    );
};

export default UserDetails;