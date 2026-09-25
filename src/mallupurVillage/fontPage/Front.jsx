import Login from '../loginsign/Login';
import './front.scss';
import { NavLink } from 'react-router-dom';
function Front() {
    return (<>
        <div className='flex jc align height'>
          <Login/>
        </div>
    </>)
}
export default Front;