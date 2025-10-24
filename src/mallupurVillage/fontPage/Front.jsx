import './front.scss';
import { NavLink } from 'react-router-dom';
function Front() {
    return (<>
        <div className='flex jc align height'>
            <div className="container flex jc align column">
                <h1 className="front-heading">Welcome To Mallupur<br /> Official Website</h1>
                <div className="front-container flex">
                    <NavLink to="/login" className="login-btn-front com-front">Login</NavLink>
                    <NavLink to="/register" className="register-btn-front com-front">Register</NavLink>
                </div>
            </div>
        </div>
    </>)
}
export default Front;