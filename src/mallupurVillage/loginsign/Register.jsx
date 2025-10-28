import { useState } from "react";
import axios from "axios";
import './style/login.scss';
import useValidation from "./useValidation";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
    const [register, setRegister] = useState({
        fullName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const [registerErr, setRegisterErr] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const validation = useValidation(register);
    const navigate = useNavigate();

    // 👇 Backend URL (Signup API)
    const url_sign = "http://localhost:8081/api/v1/admin/create";

    const handleRegister = (e) => {
        setRegister({ ...register, [e.target.name]: e.target.value });
        setRegisterErr(validation());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validForm = validation();
        setRegisterErr(validForm);

        if (Object.keys(validForm).length === 0) {
            setLoading(true)
            try {
                // 👉 Send data to backend
                const response = await axios.post(url_sign, {
                    fullName: register.fullName,
                    username: register.username,
                    password: register.password,
                    phone: register.phone,
                    email: register.email,
                });

                console.log("✅ Backend Response:", response.data);
                toast.success("Registration Successful!", { autoClose: 2000 });

                // Reset form
                setRegister({
                    fullName: "",
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                });

                // Navigate to login after 2 sec
                setTimeout(() => navigate("/login"), 2000);
            } catch (err) {
                setError(err.message);
                console.error("❌ Error registering:", err);
                toast.error(
                    err.response?.data?.message || "Registration failed! Please try again.",
                    { autoClose: 3000 }
                );
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;



    return (
        <>
            <ToastContainer />
            <div className="flex jc align" style={{ height: "100vh" }}>
                <div className="login-container flex column jc align">
                    <div className="user-logo">
                        <img width="100px" height="100px" src="/OIP.jpeg" alt="user" />
                    </div>
                    <h2 className="heading">Register</h2>
                    <form className="form flex column" onSubmit={handleSubmit}>
                        <div className="login-subcontainer1">
                            <label className="label-email com2" htmlFor="fullName">Full Name</label>
                            <input
                                className="input-email com1"
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={register.fullName}
                                onChange={handleRegister}
                                placeholder="Full Name"
                            />
                            <p className="error">{registerErr.fullName}</p>
                        </div>

                        <div className="login-subcontainer1">
                            <label className="label-email com2" htmlFor="username">Username</label>
                            <input
                                className="input-email com1"
                                type="text"
                                id="username"
                                name="username"
                                value={register.username}
                                onChange={handleRegister}
                                placeholder="Username"
                            />
                            <p className="error">{registerErr.username}</p>
                        </div>

                        <div className="login-subcontainer1">
                            <label className="label-email com2" htmlFor="email">Email</label>
                            <input
                                className="input-email com1"
                                type="email"
                                id="email"
                                name="email"
                                value={register.email}
                                onChange={handleRegister}
                                placeholder="Email"
                            />
                            <p className="error">{registerErr.email}</p>
                        </div>

                        <div className="login-subcontainer1">
                            <label className="label-email com2" htmlFor="phone">Phone</label>
                            <input
                                className="input-email com1"
                                type="text"
                                id="phone"
                                name="phone"
                                value={register.phone}
                                onChange={handleRegister}
                                placeholder="Phone"
                            />
                            <p className="error">{registerErr.phone}</p>
                        </div>

                        <div className="login-subcontainer2">
                            <label className="label-pass com2" htmlFor="password">Password</label>
                            <input
                                className="input-pass com1"
                                type="password"
                                id="password"
                                name="password"
                                value={register.password}
                                onChange={handleRegister}
                                placeholder="Password"
                            />
                            <p className="error">{registerErr.password}</p>
                        </div>

                        <button className="login-btn" type="submit">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;