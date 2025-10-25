import { useState } from "react";
import './style/login.scss';
import { useNavigate } from "react-router-dom";

function Login() {
    const [userLogin, setUserLogin] = useState({ name: "", password: "" });
    const [loginData, setLoginData] = useState([]);
    const [loginErr, setLoginErr] = useState({});
    const navigate = useNavigate();


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

    const handleSubmitLogin = (e) => {
        e.preventDefault();

        const err = validation();
        setLoginErr(err);

        if (Object.keys(err).length === 0) {
            setLoginData(userLogin);
            navigate("/home");

        } else return;


    }

    return (<>
        <div className="flex jc align" style={{ height: "100vh" }}>
            <div className="login-container flex column jc align">
                <div className="user-logo"><img width="100px" height="100px" src="/OIP.jpeg" alt="user" /></div>
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
                <div className="forget-pass"><a href="">Forget Password</a></div>
            </div>
        </div>
    </>)
}
export default Login;