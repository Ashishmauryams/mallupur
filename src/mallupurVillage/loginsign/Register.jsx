import { useState } from "react";
import './style/login.scss';
import useValidation from "./useValidation";
import { useNavigate } from "react-router-dom";
function Register() {
    const [register, setRegister] = useState({ name: "", email: "", number: "", password: "" });
    const [userData, setUserData] = useState([]);
    const [registerErr, setRegisterErr] = useState({});
    const validation = useValidation(register);
    const navigate = useNavigate();


    const handleRegister = (e) => {
        setRegister({ ...register, [e.target.name]: e.target.value });
        setRegisterErr(validation());
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const validForm = validation();
        setRegisterErr(validForm);
        if (Object.keys(validForm).length === 0) {
            alert("Register Successful ! ");
            setUserData(register);
            navigate("/login");
            console.log(userData)
        } else return;

        setRegister({ name: "", email: "", number: "", password: "" });

    }


    return (<>
        <div className="flex jc align" style={{ height: "100vh" }}>
            <div className="login-container flex column jc align">
                <div className="user-logo"><img width="100px" height="100px" src="/OIP.jpeg" alt="user" /></div>
                <h2 className="heading">
                    Register
                </h2>
                <form className="form flex column" action="" onSubmit={handleSubmit}>
                    <div className="login-subcontainer1">
                        <label className="label-email com2" htmlFor="name">Name</label>
                        <input className="input-email com1" type="text" id="name" name="name" value={register.name} onChange={handleRegister} placeholder="Name" />
                        <p className="error">{registerErr.name}</p>
                    </div>

                    <div className="login-subcontainer1">
                        <label className="label-email com2" htmlFor="email">Email </label>
                        <input className="input-email com1" type="text" id="email" name="email" value={register.email} onChange={handleRegister} placeholder="Email" />
                        <p className="error">{registerErr.email}</p>
                    </div>

                    <div className="login-subcontainer1">
                        <label className="label-email com2" htmlFor="number">Number</label>
                        <input className="input-email com1" type="number" id="number" name="number" value={register.number} onChange={handleRegister} placeholder="Number" />
                        <p className="error">{registerErr.number}</p>
                    </div>
                    <div className="login-subcontainer2">
                        <label className="label-pass com2" htmlFor="password">Password</label>
                        <input className="input-pass com1" type="password" id="password" name="password" value={register.password} onChange={handleRegister} placeholder="Password" />
                        <p className="error">{registerErr.password}</p>
                    </div>
                    <button className="login-btn" type="submit">Register</button>
                </form>
            </div>
        </div>
    </>)
}
export default Register;