// import React, { useState } from "react";

// import {
//     Link,
//     useLocation,
//     useNavigate,
// } from "react-router-dom";

// import {
//     Camera,
//     Save,
//     Trash2,
// } from "lucide-react";

// import "./EditProfile.scss";

// import BackButton from "../reuseableCopmonent/BackButton/BackButton";
// import Input from "../reuseableCopmonent/Input";

// import ConfirmModal from "../reuseableCopmonent/ConfirmModal/ConfirmModal";
// import { getDeleteOne, getUpdateUser } from "../../api/apiService";
// import { useAlert } from "../../contextApi/AlertContext";
// import Loader from "../reuseableCopmonent/loader/Loader";


// const EditProfile = () => {

//     const navigate = useNavigate();
//     const location = useLocation();

//     const user = location.state?.user;


//     const [formData, setFormData] = useState({
//         fullName: user?.fullName || "",
//         username: user?.username || "",
//         email: user?.email || "",
//         phone: user?.phone || "",
//     });

//     const [profileImage, setProfileImage] = useState(
//         user?.avatar || "/images/avatar.jpg"
//     );


//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const [deleting, setDeleting] = useState(false);

//     const { showAlert } = useAlert();

//     const handleChange = (e) => {

//         const { name, value } = e.target;

//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };


//     const handleImageChange = (e) => {

//         const file = e.target.files?.[0];

//         if (!file) return;

//         const imageUrl = URL.createObjectURL(file);

//         setProfileImage(imageUrl);
//     };


//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             setLoading(true);

//             const formData = new FormData();

//             const userData = {
//                 fullName: formData?.fullName,
//                 email: formData?.email,
//                 phone: formData?.phone,
//                 username: formData?.username,
//             };

//             formData.append("user", JSON.stringify(userData));

//             if (profileImage) {
//                 formData.append("profileImage", profileImage);
//             }
//             const resp = await getUpdateUser(formData);

//             if (resp?.status === 200) {

//                 showAlert({
//                     message: "Account Updated successfully!",
//                     duration: 3000,
//                     severity: "success",
//                     variant: "filled",
//                 });

//                 navigate("/home/profile");
//             }

//         } catch (error) {

//             showAlert({
//                 message: error?.message || "something wents wrong",
//                 duration: 3000,
//                 severity: "error",
//                 variant: "filled",
//             });

//         } finally {
//             setLoading(false);
//         }
//     };


//     const handleDeleteAccount = async () => {

//         try {

//             setDeleting(true);
//             const resp = await getDeleteOne();
//             if (resp.status === 204) {

//                 showAlert({
//                     message: "Account deleted successfully!",
//                     duration: 3000,
//                     severity: "success",
//                     variant: "filled",
//                 });
//                 localStorage.removeItem("token");
//                 setShowDeleteModal(false);
//                 navigate("/login");

//             }

//         } catch (error) {

//             showAlert({
//                 message: error?.message || "something wents wrong",
//                 duration: 3000,
//                 severity: "error",
//                 variant: "filled",
//             });

//         } finally {

//             setDeleting(false);
//         }
//     };


//     return (

//         <div className="edit-profile-page">

//             <div className="container">

//                 <div className="edit-profile-page__header">
//                     <div>
//                         <span className="edit-profile-page__subtitle">
//                             My Account
//                         </span>
//                         <h1 className="edit-profile-page__title">
//                             Edit Profile
//                         </h1>
//                         <p className="edit-profile-page__description">
//                             Update your personal information and
//                             profile photo.
//                         </p>

//                     </div>
//                     <BackButton />
//                 </div>

//                 <form
//                     className="edit-profile-page__card"
//                     onSubmit={handleSubmit}
//                 >

//                     <div className="edit-profile-page__photo-section">

//                         <div className="edit-profile-page__photo-wrapper">
//                             <img
//                                 src={profileImage}
//                                 alt={
//                                     formData?.fullName ||
//                                     "Profile"
//                                 }
//                                 className="edit-profile-page__photo"
//                             />

//                             <label
//                                 htmlFor="profile-image"
//                                 className="edit-profile-page__camera-btn"
//                                 title="Change profile photo"
//                             >
//                                 <Camera size={18} />
//                             </label>
//                             <input
//                                 id="profile-image"
//                                 type="file"
//                                 accept="
//                                     image/png,
//                                     image/jpeg,
//                                     image/jpg,
//                                     image/webp
//                                 "
//                                 onChange={handleImageChange}
//                                 hidden
//                             />

//                         </div>


//                         <div className="edit-profile-page__photo-content">

//                             <h3>
//                                 Profile Photo
//                             </h3>
//                             <p>
//                                 Upload a new profile photo.
//                                 JPG, PNG or WEBP format
//                                 is supported.
//                             </p>
//                             <label
//                                 htmlFor="profile-image"
//                                 className="edit-profile-page__change-photo"
//                             >
//                                 <Camera size={16} />
//                                 Change Photo
//                             </label>

//                         </div>

//                     </div>

//                     <div className="edit-profile-page__section">
//                         <h2 className="edit-profile-page__section-title">
//                             Personal Information
//                         </h2>
//                         <div className="edit-profile-page__form-grid">
//                             <Input
//                                 label="Full Name"
//                                 name="fullName"
//                                 placeholder="Enter your full name"
//                                 type="text"
//                                 value={formData.fullName}
//                                 onChange={handleChange}
//                             />
//                             <Input
//                                 label="Username"
//                                 name="username"
//                                 placeholder="Enter your username"
//                                 type="text"
//                                 value={formData.username}
//                                 onChange={handleChange}
//                             />

//                             <Input
//                                 label="Email"
//                                 name="email"
//                                 placeholder="Enter your email"
//                                 type="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                             />

//                             <Input
//                                 label="Phone"
//                                 name="phone"
//                                 placeholder="Enter your phone"
//                                 type="tel"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                             />

//                         </div>

//                     </div>

//                     <div className="edit-profile-page__actions">
//                         <Link
//                             to="/home/profile"
//                             className="edit-profile-page__cancel-btn"
//                         >
//                             Cancel
//                         </Link>
//                         <button
//                             type="submit"
//                             className="edit-profile-page__save-btn"
//                         >
//                             {loading ? <Loader /> :
//                                 <div>
//                                     <Save size={18} />

//                                     Save Changes
//                                 </div>

//                             }
//                         </button>

//                     </div>

//                     <div className="edit-profile-page__danger-wrapper">
//                         <div className="edit-profile-page__danger-zone">
//                             <div className="edit-profile-page__danger-info">
//                                 <div className="edit-profile-page__danger-icon">
//                                     <Trash2
//                                         size={20}
//                                         strokeWidth={2}
//                                     />
//                                 </div>
//                                 <div className="edit-profile-page__danger-content">
//                                     <h2>
//                                         Delete Account
//                                     </h2>
//                                     <p>
//                                         Permanently delete your
//                                         account and all associated
//                                         information. This action
//                                         cannot be undone.
//                                     </p>
//                                 </div>

//                             </div>
//                             <button
//                                 type="button"
//                                 className="edit-profile-page__danger-btn"
//                                 onClick={() =>
//                                     setShowDeleteModal(true)
//                                 }
//                             >
//                                 Delete Account
//                             </button>

//                         </div>

//                     </div>

//                 </form>

//                 <ConfirmModal
//                     isOpen={showDeleteModal}
//                     onClose={() => setShowDeleteModal(false)}
//                     onConfirm={handleDeleteAccount}
//                     title="Delete Account?"
//                     message="Are you sure you want to remove your account? All your account information will be removed and this action cannot be undone."
//                     confirmText="Yes, Delete Account"
//                     cancelText="Cancel"
//                     loading={deleting}
//                     loadingText="Deleting..."
//                     icon={Trash2}
//                 />

//             </div>

//         </div>
//     );
// };


// export default EditProfile;

import React, { useEffect, useState } from "react";

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

import {
    getDeleteOne,
    getUpdateUser,
} from "../../api/apiService";

import { useAlert } from "../../contextApi/AlertContext";
import Loader from "../reuseableCopmonent/loader/Loader";


const EditProfile = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const user = location.state?.user;

    // 1. User ki details
    const [profileForm, setProfileForm] = useState({
        fullName: user?.fullName || "",
        username: user?.username || "",
        email: user?.email || "",
        phone: user?.phone || "",
    });

    // 2. Original image file
    const [imageFile, setImageFile] = useState(null);

    // 3. Image preview URL
    const [imagePreview, setImagePreview] = useState(
        user?.avatar || "/images/avatar.jpg"
    );

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const { showAlert } = useAlert();

    // Blob URL ki memory cleanup
    useEffect(() => {
        if (!imagePreview.startsWith("blob:")) {
            return;
        }

        return () => {
            URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    // Input fields handle karna
    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfileForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Image select karna
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

        // Actual file API ke liye
        setImageFile(file);

        // Blob URL sirf preview ke liye
        setImagePreview(URL.createObjectURL(file));
    };

    // Profile update karna
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            // IMPORTANT: FormData ka alag variable
            const multipartData = new FormData();

            // User details state se aayengi
            const userData = {
                fullName: profileForm.fullName,
                username: profileForm.username,
                email: profileForm.email,
                phone: profileForm.phone,
            };

            // Backend @RequestPart("user") ke liye
            multipartData.append(
                "user",
                JSON.stringify(userData)
            );

            // Sirf original File bhejni hai
            if (imageFile) {
                multipartData.append(
                    "profileImage",
                    imageFile
                );
            }

            console.log("data", multipartData);

            console.log("FormData entries:");

for (const [key, value] of multipartData.entries()) {
    console.log(
        key,
        value instanceof File
            ? `File: ${value.name}, ${value.size} bytes`
            : value
    );
}

            // API call
            const resp = await getUpdateUser(multipartData);

            if (resp?.status === 200) {
                showAlert({
                    message: "Account updated successfully!",
                    duration: 3000,
                    severity: "success",
                    variant: "filled",
                });

                navigate("/home/profile");
            }

        } catch (error) {
            console.error(
                "Profile update error:",
                error.response?.data || error
            );

            showAlert({
                message:
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Profile update failed. Please try again.",
                duration: 3000,
                severity: "error",
                variant: "filled",
            });

        } finally {
            setLoading(false);
        }
    };

    // Account delete karna
    const handleDeleteAccount = async () => {
        try {
            setDeleting(true);

            const resp = await getDeleteOne();

            // Tumhare controller mein HttpStatus.OK hai,
            // isliye status 200 expected hai.
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

                    {/* Profile Image */}
                    <div className="edit-profile-page__photo-section">

                        <div className="edit-profile-page__photo-wrapper">
                            <img
                                src={imagePreview}
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
                            disabled={loading}
                        >
                            {loading ? (
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
