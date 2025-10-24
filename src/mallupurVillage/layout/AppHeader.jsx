
import { useEffect, useState } from 'react';
import './style/appHeader.scss';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function AppHeader() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const [hideBtn, setHideBtn] = useState(false);

    const clickBtn = () => hideBtn ? setHideBtn(false) : setHideBtn(true);

    useEffect(() => {

        const handleSize = () => {
            if (window.innerWidth > 600) {
                setHideBtn(false);
            }
        }

        window.addEventListener("resize", handleSize);

        return () => window.removeEventListener("resize", handleSize);
    }, []);



    const logoutBtn = () => {
        navigate("/");
    }
    return (<>
        <header>
            <div className='head-container flex sb align'>
                <div><img width="100px" height="70px" src="ms2.jpg" alt="ms" /></div>
                <div>
                    <form action="" className='form'>
                        <div className='input-field flex'>
                            <input type="text" placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button className='search-btn' type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                    </form>
                </div>
                <div className='flex link-div align'>
                    <div className='com-logo flex sb'>
                        <NavLink><span><i className="fa-solid fa-house"></i></span> Home</NavLink>
                        <NavLink><span><i className="fa-solid fa-otter"></i></span> Other</NavLink>
                        <NavLink> <span><i className="fa-solid fa-road"></i></span> Roads </NavLink>
                        <NavLink> <span><i className="fa-solid fa-address-book"></i></span> Contact </NavLink>
                        <NavLink> <span><i className="fa-solid fa-address-card"></i></span> About </NavLink>
                    </div>
                    {/* for mobile */}
                    {!hideBtn && (<div onClick={clickBtn} className='line-btn'><i className="fa-solid fa-grip-lines"></i></div>)}
                    {hideBtn && (<div onClick={clickBtn} className='line-btn'><i class="fa-solid fa-xmark"></i></div>)}
                    <button onClick={logoutBtn} className='logout-btn'>Logout</button>
                </div>
            </div>


            {hideBtn && (<div className=' click-a flex sb'>
                <NavLink>Home</NavLink>
                <NavLink>Other</NavLink>
                <NavLink>Road</NavLink>
                <NavLink>Contact</NavLink>
                <NavLink>About</NavLink>
            </div>)}
        </header>
    </>)
}
export default AppHeader;