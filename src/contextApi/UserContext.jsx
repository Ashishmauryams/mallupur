import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserProfile } from "../api/apiService";


const UserContext = createContext(null);


export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};


export const UserProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            setError(null);
            const resp = await getUserProfile();
            if (resp?.status === 200 && resp?.data) {
                setUserProfile(resp?.data);
            } else {
                setUserProfile(null);
            }
        } catch (err) {
            console.error("User Profile Fetch Error:", err);
            setError(err?.response?.data?.msg || "Something went wrong");
            setUserProfile(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUserProfile();
        }
    }, []);

    const renderImageSource = () => {

        const imgUrl = userProfile?.profileImage;

        if (!imgUrl) return "/images/avatar.jpg";
        if (imgUrl.startsWith("data:image") || imgUrl.startsWith("http")) {
            return imgUrl;
        }
        return `data:image/jpeg;base64,${imgUrl}`;
    };

    const refreshUser = () => {
        fetchUserProfile();
    };

    return (
        <UserContext.Provider value={{ userProfile, refreshUser, loading, error, renderImageSource }}>
            {children}
        </UserContext.Provider>
    );
};