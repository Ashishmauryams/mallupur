
// import { useEffect, useState } from "react";
// import "./style/login.scss";
// import Input from "../reuseableCopmonent/Input";
// import useValidation from "./useValidation";
// import { loginUser } from "../../api/apiService";
// import { useNavigate } from "react-router";
// import Loading from "../loader/Loading";
// import { useAlert } from "../../contextApi/AlertContext";
// import Register from "./Register";
// import { useAuth } from "../../contextApi/AuthContext";



// const images = [
//     // "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
//     // "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
//     // "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
//     // "https://images.unsplash.com/photo-1497366811360-6870744d04b2?auto=format&fit=crop&w=900&q=80",
//     "/village1.jpg",
//     "/village2.jpg",
//     "/village3.jpg",
//     "/village4.jpg",

// ];

// const validationRules = {
//     username: {
//         required: true,
//         requiredMessage: "Username is required",

//         minLength: 3,
//         minLengthMessage:
//             "Username must be at least 3 characters",
//     },

//     password: {
//         required: true,
//         requiredMessage: "Password is required",

//         minLength: 6,
//         minLengthMessage:
//             "Password must be at least 6 characters",
//     },
// };

// const Login = () => {
//     const [currentImage, setCurrentImage] = useState(0);
//     const [showPassword, setShowPassword] = useState(false);
//     const [error, setError] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [toggle, setToggle] = useState(false);

//     const [formData, setFormData] = useState({
//         username: "",
//         password: "",
//     });



//     const validation = useValidation(formData, validationRules);
//     const navigate = useNavigate();
//     const { showAlert } = useAlert();
//     const { login } = useAuth();

//     // Image auto change
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentImage((prev) => (prev + 1) % images.length);
//         }, 4000);

//         return () => clearInterval(interval);
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const toggleBtn = () => {
//         setToggle((pre) => !pre);
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const validationError = validation();
//         setError(validationError);

//         if (Object.keys(validationError).length > 0) {
//             return;
//         }

//         try {
//             setLoading(true);
//             const resp = await loginUser(formData);
//             if (resp?.status === 200 && resp?.data?.token) {
//                 login(resp?.data);

//                 showAlert({
//                     message: "Login successfully!",
//                     duration: 3000,
//                     severity: "success",
//                     variant: "filled",
//                 });
//                 navigate("/home", { replace: true });

//             }
//         } catch (err) {
//             showAlert({
//                 severity: "error",
//                 message: err?.response?.data || "something went wrong",
//                 duration: 3000,
//                 variant: "filled"
//             });

//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="login-page">
//             <div className="login-container">

//                 <div className="image-box">

//                     {images.map((image, index) => (
//                         <img
//                             key={image}
//                             src={image}
//                             alt={`Slide ${index + 1}`}
//                             className={
//                                 index === currentImage
//                                     ? "slide active"
//                                     : "slide"
//                             }
//                         />
//                     ))}

//                     <div className="image-overlay">
//                         <div className="overlay-content">

//                             <h2>Build Your Future</h2>

//                             <p>
//                                 Turn your ideas into reality with
//                                 powerful and modern solutions.
//                             </p>

//                             <div className="dots">
//                                 {images.map((_, index) => (
//                                     <span
//                                         key={index}
//                                         className={
//                                             index === currentImage
//                                                 ? "dot active"
//                                                 : "dot"
//                                         }
//                                         onClick={() => setCurrentImage(index)}
//                                     />
//                                 ))}
//                             </div>

//                         </div>
//                     </div>

//                 </div>

//                 {!toggle ? <div className="login-box">
//                     <div className="login-content">
//                         <div className="logo">
//                             <span>V</span>
//                         </div>
//                         <h1>Welcome Back</h1>
//                         <p className="subtitle">
//                             Please enter your details to login
//                         </p>

//                         <form onSubmit={handleSubmit}>

//                             <Input
//                                 label="Username"
//                                 name="username"
//                                 placeholder="Enter your username"
//                                 value={formData.username}
//                                 onChange={handleChange}
//                                 error={error.username}

//                             />

//                             <Input
//                                 label="Password"
//                                 name="password"
//                                 placeholder="Enter your password"
//                                 type="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 error={error.password}
//                             />
//                             <button type="submit" className="login-btn">
//                                 {loading ? <Loading /> : "Login"}
//                             </button>

//                         </form>

//                         <p className="signup-text">
//                             Don't have an account?
//                             <a onClick={toggleBtn}> Sign Up</a>
//                         </p>

//                     </div>
//                 </div>
//                     : <Register toggleFn={toggleBtn} setToggle={setToggle} />
//                 }

//             </div>
//         </div>
//     );
// };

// export default Login;


import React, { useState } from "react";
import {

    Users,
    Leaf,
    BarChart3,
    ShieldCheck,
    User,
    Lock,
} from "lucide-react";

import "./style/login.scss";
import Input from "../reuseableCopmonent/Input";
import Button from "../reuseableCopmonent/Button/Button";
import Loader from "../reuseableCopmonent/loader/Loader";
import useValidation from "./useValidation";
import { useNavigate } from "react-router";
import { useAlert } from "../../contextApi/AlertContext";
import { useAuth } from "../../contextApi/AuthContext";
import { loginUser } from "../../api/apiService";
import Register from "./Register";
import ForgotPassword from "../ForgotPassword/ForgotPassword";


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

    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [forgotToggle, setForgotToggle] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });


    const validation = useValidation(formData, validationRules);
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const { login } = useAuth();


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError((prev) => ({
            ...prev,
            [name]: "",
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
        <div className="village-login">

            {/* LEFT SIDE */}
            <section className="village-login__visual">

                <div className="village-login__overlay"></div>

                <div className="village-login__brand">

                    <h1>
                        Village <span>Portal</span>
                    </h1>

                    <p>
                        Empowering Villages, Building
                        <br />
                        Stronger Communities
                    </p>

                </div>

                <div className="village-login__features">

                    <div className="village-login__feature">
                        <div className="village-login__feature-icon">
                            <Users size={25} />
                        </div>

                        <span>
                            Better
                            <br />
                            Administration
                        </span>
                    </div>

                    <div className="village-login__feature">
                        <div className="village-login__feature-icon">
                            <Leaf size={25} />
                        </div>

                        <span>
                            Transparent
                            <br />
                            Information
                        </span>
                    </div>

                    <div className="village-login__feature">
                        <div className="village-login__feature-icon">
                            <BarChart3 size={25} />
                        </div>

                        <span>
                            Stronger
                            <br />
                            Communities
                        </span>
                    </div>

                </div>

            </section>


            {/* RIGHT SIDE */}

            {!forgotToggle ?
                <div>
                    {!toggle ?
                        <section className="village-login__form-area">

                            <div className="village-login__card">

                                <div className="village-login__heading">
                                    <h2>Welcome Back</h2>

                                    <p>
                                        Login to access your Village Portal account
                                    </p>
                                </div>


                                <form onSubmit={handleSubmit}>

                                    <Input
                                        label="Username"
                                        name="username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        leftIcon={<User size={21} />}
                                        error={error?.username}
                                    />

                                    <Input
                                        label="Password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        leftIcon={<Lock size={21} />}
                                        error={error?.password}
                                    />
                                    <div className="village-login__forgot">
                                        <button
                                            type="button"
                                            onClick={() => setForgotToggle(true)}
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>

                                    <Button
                                        text="Login"
                                        type="submit"
                                        loading={loading}
                                        loadingElement={<Loader size={22} color="white" />}
                                    />


                                    {/* DIVIDER */}
                                    <div className="village-login__divider">
                                        <span></span>
                                        <strong>OR</strong>
                                        <span></span>
                                    </div>


                                    <Button
                                        text="Create New Account"
                                        height="58px"
                                        fontSize="18px"
                                        background="#ffffff"
                                        hoverBackground="#f1faf5"
                                        border=" 1.5px solid #31945a"
                                        color="#29864e"
                                        type="button"
                                        onClick={toggleBtn}

                                    />


                                    {/* SECURITY */}
                                    <div className="village-login__security">

                                        <div className="village-login__security-icon">
                                            <ShieldCheck size={25} />
                                        </div>

                                        <div>
                                            <h3>Secure and Reliable</h3>

                                            <p>
                                                Your data is safe with us.
                                                Role-based access ensures
                                                secure village information
                                                management.
                                            </p>
                                        </div>

                                    </div>

                                </form>

                            </div>

                        </section>
                        :
                        <Register toggleFn={toggleBtn} setToggle={setToggle} />
                    }
                </div>
                :
                <ForgotPassword setForgotToggle={setForgotToggle} />
            }

        </div>
    );
};

export default Login;