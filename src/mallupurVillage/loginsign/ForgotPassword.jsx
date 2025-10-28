import { useState } from "react";
import './style/login.scss';
import { useNavigate } from "react-router-dom";

function ForgotPassword({ showBtn }) {
    const [phone, setPhone] = useState("");
    const [loginData, setLoginData] = useState([]);
    const [loginErr, setLoginErr] = useState("");
    const navigate = useNavigate();



    const handleSubmitLogin = (e) => {
        e.preventDefault();

        if (!phone.trim()) {
            setLoginErr("Please enter your phone");
            return;
        }
        setLoginErr("");
        setLoginData(phone);
        setPhone("");
        console.log(loginData);


    }




    return (<>
        <div className="flex jc align" style={{ height: "100vh" }}>
            <div className="login-container flex column jc align">
                <div><img width="100px" height="100px" src="/OIP.jpeg" alt="user" /></div>
                <h2 className="heading" style={{ fontSize: "3rem" }}>
                    Forgot Password
                </h2>
                <form className="form flex column" action="" onSubmit={handleSubmitLogin}>
                    <div className="login-subcontainer1" style={{ margin: "2rem 0" }}>
                        <label className="label-email com2" htmlFor="phone">Phone </label>
                        <input className="input-email com1" type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone" />
                        <p className="error">{loginErr}</p>
                    </div>

                    <button style={{ marginTop: "4rem" }} className="login-btn" type="submit">Generate OTP</button>
                </form>
                <div className="forget-pass" onClick={showBtn}>back to login</div>
            </div>
        </div>
    </>)
}
export default ForgotPassword;