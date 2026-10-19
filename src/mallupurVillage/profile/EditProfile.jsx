
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Camera,
    Save,
    Trash2,
} from "lucide-react";

import "./EditProfile.scss";
import { useAlert } from "../../contextApi/AlertContext";
import { useUser } from "../../contextApi/UserContext";
import { getDeleteOne, getUpdateUser } from "../../api/apiService";
import BackButton from "../reuseableCopmonent/BackButton/BackButton";
import Loading from "../loader/Loading";
import Input from "../reuseableCopmonent/Input";
import Loader from "../reuseableCopmonent/loader/Loader";
import ConfirmModal from "../reuseableCopmonent/ConfirmModal/ConfirmModal";








const EditProfile = () => {
    const navigate = useNavigate();

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("/images/avatar.jpg");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [profileForm, setProfileForm] = useState({
        fullName: "",
        username: "",
        email: "",
        phone: "",
    });

    const { showAlert } = useAlert();
    const { userProfile, loading, error, renderImageSource, refreshUser } = useUser();


    useEffect(() => {
        if (userProfile) {
            setProfileForm({
                fullName: userProfile.fullName || "",
                username: userProfile.username || "",
                email: userProfile.email || "",
                phone: userProfile.phone || "",
            });

            if (userProfile?.profileImage && !imagePreview.startsWith("blob:")) {
                setImagePreview(userProfile.profileImage);
            }
        }
    }, [userProfile]);


    useEffect(() => {
        if (!imagePreview.startsWith("blob:")) {
            return;
        }

        return () => {
            URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfileForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            showAlert({
                message: "Please select JPG, PNG or WEBP image.",
                duration: 3000,
                severity: "error",
                variant: "filled",
            });

            e.target.value = "";
            return;
        }

        // Maximum image size: 5 MB
        if (file.size > 5 * 1024 * 1024) {
            showAlert({
                message: "Image size must be less than 5 MB.",
                duration: 3000,
                severity: "error",
                variant: "filled",
            });

            e.target.value = "";
            return;
        }

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };


    const getFinalImageSource = () => {
        if (!imagePreview) return "/images/avatar.jpg";
        if (imagePreview.startsWith("blob:") || imagePreview.startsWith("http") || imagePreview.startsWith("data:image")) {
            return imagePreview;
        }
        // Fallback to context's renderImageSource or custom prefix logic if it's raw base64
        if (typeof renderImageSource === "function" && imagePreview === userProfile?.profileImage) {
            return renderImageSource();
        }
        return `data:image/jpeg;base64,${imagePreview}`;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setFormLoading(true);

            const multipartData = new FormData();

            const userData = {
                fullName: profileForm.fullName,
                username: profileForm.username,
                email: profileForm.email,
                phone: profileForm.phone,
            };

            multipartData.append(
                "user",
                JSON.stringify(userData)
            );

            if (imageFile) {
                multipartData.append(
                    "profileImage",
                    imageFile
                );
            }

            const resp = await getUpdateUser(multipartData);

            if (resp?.status === 200) {
                showAlert({
                    message: "Account updated successfully!",
                    duration: 3000,
                    severity: "success",
                    variant: "filled",
                });

                refreshUser()
                navigate("/home/profile");
            }

        } catch (error) {
            console.error(
                "Profile update error:",
                error?.response?.data?.msg || error
            );

            showAlert({
                message:
                    error?.response?.data?.msg ||
                    "Profile update failed. Please try again.",
                duration: 3000,
                severity: "error",
                variant: "filled",
            });

        } finally {
            setFormLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            setDeleting(true);

            const resp = await getDeleteOne();

            if (resp?.status === 200) {
                showAlert({
                    message: "Account deleted successfully!",
                    duration: 3000,
                    severity: "success",
                    variant: "filled",
                });

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setShowDeleteModal(false);
                navigate("/login");
            }

        } catch (error) {
            console.error(
                "Account deletion error:",
                error.response?.data || error
            );

            showAlert({
                message:
                    error.response?.data?.message ||
                    "Account deletion failed.",
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
                        <h1 className="edit-profile-page__title">
                            Edit Profile
                        </h1>
                        <p className="edit-profile-page__description">
                            Update your personal information and profile photo.
                        </p>
                    </div>

                    <BackButton />
                </div>

                {loading ? <Loading borderColor="#000000" height="70vh" /> :
                    <form
                        className="edit-profile-page__card"
                        onSubmit={handleSubmit}
                    >

                        {/* Profile Image */}
                        <div className="edit-profile-page__photo-section">

                            <div className="edit-profile-page__photo-wrapper">
                                <img
                                    src={getFinalImageSource()}
                                    alt={profileForm.fullName || "Profile"}
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
                                    accept="image/png,image/jpeg,image/webp"
                                    onChange={handleImageChange}
                                    hidden
                                />
                            </div>

                            <div className="edit-profile-page__photo-content">
                                <h3>Profile Photo</h3>

                                <p>
                                    Upload a new profile photo.
                                    JPG, PNG or WEBP format is supported.
                                    Maximum size: 5 MB.
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

                        {/* Personal Information */}
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
                                    value={profileForm.fullName}
                                    onChange={handleChange}
                                />

                                <Input
                                    label="Username"
                                    name="username"
                                    placeholder="Enter your username"
                                    type="text"
                                    value={profileForm.username}
                                    onChange={handleChange}
                                />

                                <Input
                                    label="Email"
                                    name="email"
                                    placeholder="Enter your email"
                                    type="email"
                                    value={profileForm.email}
                                    onChange={handleChange}
                                />

                                <Input
                                    label="Phone"
                                    name="phone"
                                    placeholder="Enter your phone"
                                    type="tel"
                                    value={profileForm.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
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
                                disabled={formLoading}
                            >
                                {formLoading ? (
                                    <Loader />
                                ) : (
                                    <div>
                                        <Save size={18} />
                                        Save Changes
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* Delete Account */}
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
                                        <h2>Delete Account</h2>

                                        <p>
                                            Permanently delete your account
                                            and all associated information.
                                            This action cannot be undone.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="edit-profile-page__danger-btn"
                                    onClick={() => setShowDeleteModal(true)}
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </form>
                }

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
