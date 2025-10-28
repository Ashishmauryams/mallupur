import { useState } from "react";
import './style/login.scss';
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Login() {
    const [userLogin, setUserLogin] = useState({ name: "", password: "" });
    const [loginData, setLoginData] = useState([]);
    const [loginErr, setLoginErr] = useState({});
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const url_sign = "http://localhost:8081/api/v1/admin/create";

    const handleLogin = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
    }

    const validation = () => {

        const newErrors = {};
        if (!userLogin.name.trim()) {
            newErrors.name = "Please enter user name";
        }
        if (!userLogin.password.trim()) {
            newErrors.password = "Password is Required";
        }
        return newErrors;
    }

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        const err = validation();
        setLoginErr(err);

        if (Object.keys(err).length === 0) {

            setLoading(true)
            try {
                // 👉 Send data to backend
                const response = await axios.post(url_sign, {
                    name: userLogin.name,
                    password: userLogin.password
                });
                setLoginData(userLogin);
                console.log("✅ Backend Response:", response.data);
                toast.success("Registration Successful!", { autoClose: 2000 });

                // Reset form
                setLoginData({
                    name: "",
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
    }


    const showBtn = () => show ? setShow(false) : setShow(true);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (<>
        {!show && <div className="flex jc align" style={{ height: "100vh" }}>
            <div className="login-container flex column jc align">
                <div><img width="100px" height="100px" src="/OIP.jpeg" alt="user" /></div>
                <h2 className="heading">
                    Login
                </h2>
                <form className="form flex column" action="" onSubmit={handleSubmitLogin}>
                    <div className="login-subcontainer1">
                        <label className="label-email com2" htmlFor="username">Username </label>
                        <input className="input-email com1" type="text" id="name" name="name" value={userLogin.name} onChange={handleLogin} placeholder="Username" />
                        <p className="error">{loginErr.name}</p>
                    </div>
                    <div className="login-subcontainer2">
                        <label className="label-pass com2" htmlFor="password">Password</label>
                        <input className="input-pass com1" type="password" id="password" name="password" value={userLogin.password} onChange={handleLogin} placeholder="Password" />
                        <p className="error">{loginErr.password}</p>
                    </div>
                    <button className="login-btn" type="submit">Login</button>
                </form>
                <div className="forget-pass" onClick={showBtn}>Forget Password</div>
            </div>
        </div>}

        {show && <ForgotPassword showBtn={showBtn} />}


    </>)
}
export default Login;