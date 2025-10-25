// import { useState } from "react";
// import './style/login.scss';
// import useValidation from "./useValidation";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// function Register() {
//     const [register, setRegister] = useState({ name: "", email: "", number: "", password: "" });
//     const [userData, setUserData] = useState([]);
//     const [registerErr, setRegisterErr] = useState({});
//     const validation = useValidation(register);
//     const navigate = useNavigate();

//     const url_sign = "http://localhost:8081/api/v1/admin/create";

//     const handleRegister = (e) => {
//         setRegister({ ...register, [e.target.name]: e.target.value });
//         setRegisterErr(validation());
//     }


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const validForm = validation();
//         setRegisterErr(validForm);
//         if (Object.keys(validForm).length === 0) {

//             try {
//                 const res = await axios.post(url_sign, register);
//                 console.log("Backend response:", res.data);
//                 alert("Register Successful!");
//                 navigate("/login");
//             } catch(err) {
//                 console.error("Error registering:", err);
//                 alert("Registration failed!");
//             }

//         } else return;

//         setRegister({ name: "", email: "", number: "", password: "" });

//     }


//     return (<>
//         <div className="flex jc align" style={{ height: "100vh" }}>
//             <div className="login-container flex column jc align">
//                 <div className="user-logo"><img width="100px" height="100px" src="/OIP.jpeg" alt="user" /></div>
//                 <h2 className="heading">
//                     Register
//                 </h2>
//                 <form className="form flex column" action="" onSubmit={handleSubmit}>
//                     <div className="login-subcontainer1">
//                         <label className="label-email com2" htmlFor="name">Name</label>
//                         <input className="input-email com1" type="text" id="name" name="name" value={register.name} onChange={handleRegister} placeholder="Name" />
//                         <p className="error">{registerErr.name}</p>
//                     </div>

//                     <div className="login-subcontainer1">
//                         <label className="label-email com2" htmlFor="email">Email </label>
//                         <input className="input-email com1" type="text" id="email" name="email" value={register.email} onChange={handleRegister} placeholder="Email" />
//                         <p className="error">{registerErr.email}</p>
//                     </div>

//                     <div className="login-subcontainer1">
//                         <label className="label-email com2" htmlFor="number">Number</label>
//                         <input className="input-email com1" type="number" id="number" name="number" value={register.number} onChange={handleRegister} placeholder="Number" />
//                         <p className="error">{registerErr.number}</p>
//                     </div>
//                     <div className="login-subcontainer2">
//                         <label className="label-pass com2" htmlFor="password">Password</label>
//                         <input className="input-pass com1" type="password" id="password" name="password" value={register.password} onChange={handleRegister} placeholder="Password" />
//                         <p className="error">{registerErr.password}</p>
//                     </div>
//                     <button className="login-btn" type="submit">Register</button>
//                 </form>
//             </div>
//         </div>
//     </>)
// }
// export default Register;


import { useState } from "react";
import axios from "axios";
import './style/login.scss';
import useValidation from "./useValidation";
import { useNavigate } from "react-router-dom";

function Register() {
  const [register, setRegister] = useState({ fullName: "",username: "", email: "", phone: "", password: "" });
  const [registerErr, setRegisterErr] = useState({});
  const validation = useValidation(register);
  const navigate = useNavigate();

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
      try {
        const res = await axios.post(url_sign, register);
        console.log("Backend response:", res.data);
        alert("Register Successful!");
        navigate("/login");
      } catch (err) {
        console.error("Error registering:", err);
        alert("Registration failed!");
      }
    }
  };

  return (
    <div className="flex jc align" style={{ height: "100vh" }}>
      <div className="login-container flex column jc align">
        <div className="user-logo"><img width="100px" height="100px" src="/OIP.jpeg" alt="user" /></div>
        <h2 className="heading">Register</h2>
        <form className="form flex column" onSubmit={handleSubmit}>
          <div className="login-subcontainer1">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" name="fullName" value={register.fullName} onChange={handleRegister} placeholder="Full Name" />
            <p className="error">{registerErr.fullName}</p>
          </div>

           <div className="login-subcontainer1">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={register.username} onChange={handleRegister} placeholder="username" />
            <p className="error">{registerErr.username}</p>
          </div>

          <div className="login-subcontainer1">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" value={register.email} onChange={handleRegister} placeholder="Email" />
            <p className="error">{registerErr.email}</p>
          </div>

          <div className="login-subcontainer1">
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" name="phone" value={register.phone} onChange={handleRegister} placeholder="Phone" />
            <p className="error">{registerErr.phone}</p>
          </div>

          <div className="login-subcontainer2">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={register.password} onChange={handleRegister} placeholder="Password" />
            <p className="error">{registerErr.password}</p>
          </div>

          <button className="login-btn" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;