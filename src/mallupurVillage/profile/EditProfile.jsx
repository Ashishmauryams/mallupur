import React, { useState } from "react";

import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    Camera,
    Save,
    Trash2,
} from "lucide-react";

import "./EditProfile.scss";

import BackButton from "../reuseableCopmonent/BackButton/BackButton";
import Input from "../reuseableCopmonent/Input";

import ConfirmModal from "../reuseableCopmonent/ConfirmModal/ConfirmModal";
import { getDeleteOne, getUpdateUser } from "../../api/apiService";
import { useAlert } from "../../contextApi/AlertContext";
import Loader from "../reuseableCopmonent/loader/Loader";


const EditProfile = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const user = location.state?.user;


    const [formData, setFormData] = useState({
        fullName: user?.fullName || "",
        username: user?.username || "",
        email: user?.email || "",
        phone: user?.phone || "",
    });

    const [profileImage, setProfileImage] = useState(
        user?.avatar || "/images/avatar.jpg"
    );


    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [deleting, setDeleting] = useState(false);

    const { showAlert } = useAlert();

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleImageChange = (e) => {

        const file = e.target.files?.[0];

        if (!file) return;

        const imageUrl = URL.createObjectURL(file);

        setProfileImage(imageUrl);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const resp = await getUpdateUser(formData);

            if (resp?.status === 200) {

                showAlert({
                    message: "Account Updated successfully!",
                    duration: 3000,
                    severity: "success",
                    variant: "filled",
                });

                navigate("/home/profile");
            }

        } catch (error) {

            showAlert({
                message: error?.message || "something wents wrong",
                duration: 3000,
                severity: "error",
                variant: "filled",
            });

        } finally {
            setLoading(false);
        }
    };


    const handleDeleteAccount = async () => {

        try {

            setDeleting(true);
            const resp = await getDeleteOne();
            if (resp.status === 204) {

                showAlert({
                    message: "Account deleted successfully!",
                    duration: 3000,
                    severity: "success",
                    variant: "filled",
                });
                localStorage.removeItem("token");
                setShowDeleteModal(false);
                navigate("/login");

            }

        } catch (error) {

            showAlert({
                message: error?.message || "something wents wrong",
                duration: 3000,
                severity: "error",
                variant: "filled",
            });

        } finally {

            setDeleting(false);
        }
    };


    return (

        <div className="edit-profile-page">

            <div className="container">

                <div className="edit-profile-page__header">
                    <div>
                        <span className="edit-profile-page__subtitle">
                            My Account
                        </span>
                        <h1 className="edit-profile-page__title">
                            Edit Profile
                        </h1>
                        <p className="edit-profile-page__description">
                            Update your personal information and
                            profile photo.
                        </p>

                    </div>
                    <BackButton />
                </div>

                <form
                    className="edit-profile-page__card"
                    onSubmit={handleSubmit}
                >

                    <div className="edit-profile-page__photo-section">

                        <div className="edit-profile-page__photo-wrapper">
                            <img
                                src={profileImage}
                                alt={
                                    formData?.fullName ||
                                    "Profile"
                                }
                                className="edit-profile-page__photo"
                            />

                            <label
                                htmlFor="profile-image"
                                className="edit-profile-page__camera-btn"
                                title="Change profile photo"
                            >
                                <Camera size={18} />
                            </label>
                            <input
                                id="profile-image"
                                type="file"
                                accept="
                                    image/png,
                                    image/jpeg,
                                    image/jpg,
                                    image/webp
                                "
                                onChange={handleImageChange}
                                hidden
                            />

                        </div>


                        <div className="edit-profile-page__photo-content">

                            <h3>
                                Profile Photo
                            </h3>
                            <p>
                                Upload a new profile photo.
                                JPG, PNG or WEBP format
                                is supported.
                            </p>
                            <label
                                htmlFor="profile-image"
                                className="edit-profile-page__change-photo"
                            >
                                <Camera size={16} />
                                Change Photo
                            </label>

                        </div>

                    </div>

                    <div className="edit-profile-page__section">
                        <h2 className="edit-profile-page__section-title">
                            Personal Information
                        </h2>
                        <div className="edit-profile-page__form-grid">
                            <Input
                                label="Full Name"
                                name="fullName"
                                placeholder="Enter your full name"
                                type="text"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                            <Input
                                label="Username"
                                name="username"
                                placeholder="Enter your username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                            />

                            <Input
                                label="Email"
                                name="email"
                                placeholder="Enter your email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <Input
                                label="Phone"
                                name="phone"
                                placeholder="Enter your phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="edit-profile-page__actions">
                        <Link
                            to="/home/profile"
                            className="edit-profile-page__cancel-btn"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="edit-profile-page__save-btn"
                        >
                            {loading ? <Loader /> :
                                <div>
                                    <Save size={18} />

                                    Save Changes
                                </div>

                            }
                        </button>

                    </div>

                    <div className="edit-profile-page__danger-wrapper">
                        <div className="edit-profile-page__danger-zone">
                            <div className="edit-profile-page__danger-info">
                                <div className="edit-profile-page__danger-icon">
                                    <Trash2
                                        size={20}
                                        strokeWidth={2}
                                    />
                                </div>
                                <div className="edit-profile-page__danger-content">
                                    <h2>
                                        Delete Account
                                    </h2>
                                    <p>
                                        Permanently delete your
                                        account and all associated
                                        information. This action
                                        cannot be undone.
                                    </p>
                                </div>

                            </div>
                            <button
                                type="button"
                                className="edit-profile-page__danger-btn"
                                onClick={() =>
                                    setShowDeleteModal(true)
                                }
                            >
                                Delete Account
                            </button>

                        </div>

                    </div>

                </form>

                <ConfirmModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDeleteAccount}
                    title="Delete Account?"
                    message="Are you sure you want to remove your account? All your account information will be removed and this action cannot be undone."
                    confirmText="Yes, Delete Account"
                    cancelText="Cancel"
                    loading={deleting}
                    loadingText="Deleting..."
                    icon={Trash2}
                />

            </div>

        </div>
    );
};


export default EditProfile;