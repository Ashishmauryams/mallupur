

import { useState } from "react";
import "./style/register.scss";
import Input from "../reuseableCopmonent/Input";
import useValidation from "./useValidation";
import { registerUser } from "../../api/apiService";
import Loading from "../loader/Loading";
import { useNavigate } from "react-router";
import { useAlert } from "../../contextApi/AlertContext";

const validationRules = {
    fullName: {
        required: true,
        requiredMessage: "Full name is required",

        minLength: 5,
        minLengthMessage:
            "Name must be at least 5 characters",

        pattern: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
        patternMessage:
            "Name should contain only letters",
    },

    username: {
        required: true,
        requiredMessage: "Username is required",

        minLength: 5,
        minLengthMessage:
            "Username must be at least 5 characters",

        pattern: /^[A-Za-z0-9_]+$/,
        patternMessage:
            "Username can contain letters, numbers and underscore",
    },

    email: {
        required: true,
        requiredMessage: "Email is required",

        pattern:
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

        patternMessage:
            "Please enter a valid email",
    },

    phone: {
        required: true,
        requiredMessage: "Phone number is required",

        pattern: /^[6-9]\d{9}$/,

        patternMessage:
            "Enter a valid 10 digit phone number",
    },

    password: {
        required: true,
        requiredMessage: "Password is required",

        minLength: 6,
        minLengthMessage:
            "Password must be at least 6 characters",

        pattern:
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/,

        patternMessage:
            "Password must contain a number and special character",
    },

    //   confirmPassword: {
    //     required: true,
    //     requiredMessage: "Confirm password is required",

    //     validate: (value, formData) => {
    //       if (value !== formData.password) {
    //         return "Passwords do not match";
    //       }

    //       return "";
    //     },
    //   },
};
const Register = ({ toggleFn, setToggle }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);


    const { showAlert } = useAlert();
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        phone: ""
    });
    const validation = useValidation(formData, validationRules);

    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validation();
        setError(validationError);

        if (Object.keys(validationError).length > 0) {
            return;
        }

        try {
            setLoading(true)
            const resp = await registerUser(formData);
            if (resp.status === 201) {
                showAlert({
                    message: "Account creted successfully!",
                    duration: 3000,
                    severity: "success",
                    variant: "filled",
                });
                setToggle(false);
            }


        } catch (err) {
            showAlert({
                message: err?.response?.data || "something went wrong",
                duration: 3000,
                severity: "error",
                variant: "filled",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">

            <div className="register-container">

                <div className="register-box">

                    <div className="register-content">

                        <div className="logo">
                            <span>V</span>
                        </div>

                        <h1>Create Account</h1>

                        <p className="subtitle">
                            Create your account to get started
                        </p>

                        <form onSubmit={handleSubmit}>
                            <Input
                                name="fullName"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={handleChange}
                                error={error.fullName}
                            />
                            <Input
                                name="phone"
                                placeholder="Enter your phone"
                                value={formData.phone}
                                onChange={handleChange}
                                error={error.phone}
                            />
                            <Input
                                name="username"
                                placeholder="Enter your user name"
                                value={formData.username}
                                onChange={handleChange}
                                error={error.username}
                            />
                            <Input
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                error={error.email}
                            />
                            <Input
                                name="password"
                                placeholder="Create a  password"
                                value={formData.password}
                                onChange={handleChange}
                                error={error.password}
                            />
                            <button
                                type="submit"
                                className="register-btn"
                            >
                                {loading ? <Loading /> : "Create Account"}
                            </button>

                        </form>

                        <p className="login-text">
                            Already have an account?
                            <a onClick={toggleFn}> Login</a>
                        </p>

                    </div>

                </div>
            </div>

        </div>
    );
};

export default Register;
