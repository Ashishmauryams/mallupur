
import { useEffect, useState } from "react";
import "./style/login.scss";
import Input from "../reuseableCopmonent/Input";
import useValidation from "./useValidation";
import { loginUser } from "../../api/apiService";
import { useNavigate } from "react-router";
import Loading from "../loader/Loading";
import { useAlert } from "../../contextApi/AlertContext";
import Register from "./Register";
import { useAuth } from "../../contextApi/AuthContext";



const images = [
    // "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
    // "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    // "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
    // "https://images.unsplash.com/photo-1497366811360-6870744d04b2?auto=format&fit=crop&w=900&q=80",
    "/village1.jpg",
    "/village2.jpg",
    "/village3.jpg",
    "/village4.jpg",

];

const validationRules = {
    username: {
        required: true,
        requiredMessage: "Username is required",

        minLength: 3,
        minLengthMessage:
            "Username must be at least 3 characters",
    },

    password: {
        required: true,
        requiredMessage: "Password is required",

        minLength: 6,
        minLengthMessage:
            "Password must be at least 6 characters",
    },
};

const Login = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });



    const validation = useValidation(formData, validationRules);
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const { login } = useAuth();

    // Image auto change
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const toggleBtn = () => {
        setToggle((pre) => !pre);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validation();
        setError(validationError);

        if (Object.keys(validationError).length > 0) {
            return;
        }

        try {
            setLoading(true);
            const resp = await loginUser(formData);
            if (resp?.status === 200 && resp?.data?.token) {
                login(resp?.data);

                showAlert({
                    message: "Login successfully!",
                    duration: 3000,
                    severity: "success",
                    variant: "filled",
                });
                navigate("/home", { replace: true });

            }
        } catch (err) {
            showAlert({
                severity: "error",
                message: err?.response?.data || "something went wrong",
                duration: 3000,
                variant: "filled"
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">

                <div className="image-box">

                    {images.map((image, index) => (
                        <img
                            key={image}
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className={
                                index === currentImage
                                    ? "slide active"
                                    : "slide"
                            }
                        />
                    ))}

                    <div className="image-overlay">
                        <div className="overlay-content">

                            <h2>Build Your Future</h2>

                            <p>
                                Turn your ideas into reality with
                                powerful and modern solutions.
                            </p>

                            <div className="dots">
                                {images.map((_, index) => (
                                    <span
                                        key={index}
                                        className={
                                            index === currentImage
                                                ? "dot active"
                                                : "dot"
                                        }
                                        onClick={() => setCurrentImage(index)}
                                    />
                                ))}
                            </div>

                        </div>
                    </div>

                </div>

                {!toggle ? <div className="login-box">
                    <div className="login-content">
                        <div className="logo">
                            <span>V</span>
                        </div>
                        <h1>Welcome Back</h1>
                        <p className="subtitle">
                            Please enter your details to login
                        </p>

                        <form onSubmit={handleSubmit}>

                            <Input
                                label="Username"
                                name="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                error={error.username}

                            />

                            <Input
                                label="Password"
                                name="password"
                                placeholder="Enter your password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={error.password}
                            />
                            <button type="submit" className="login-btn">
                                {loading ? <Loading /> : "Login"}
                            </button>

                        </form>

                        <p className="signup-text">
                            Don't have an account?
                            <a onClick={toggleBtn}> Sign Up</a>
                        </p>

                    </div>
                </div>
                    : <Register toggleFn={toggleBtn} setToggle={setToggle} />
                }

            </div>
        </div>
    );
};

export default Login;