import React, {useContext} from 'react';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

function ProfileTab({status, user, earn}) {

  const navigate = useNavigate();
  const {setIsLoggedIn} = useContext(AuthContext);
  const logout = () => {
    if(Cookies.get('auth-token')){
        Cookies.remove('auth-token');
        setIsLoggedIn(false);
        navigate('/');
    }
  }

  


  return (
    <div className='tab-content profile'>
        <div className="info-wrapper">
          <h5>Name: <span>{user.name}</span></h5>
          <h5>Eamil: <span>{user.email}</span></h5>
          <h5>Phone: <span>{user.phone}</span></h5>
          <h5>Password: <span> ************* </span></h5>
          <h5>Vehicle: <span>{user.vehicle}</span></h5>
          <h5>Earned (Today): <span>{earn}৳ (Total {earn / 30} order completed today) </span></h5>
          <h5>Status: <span style={{color: status == 'Online' ? 'Green' : 'Crimson', fontWeight: 700}}>{ status }</span></h5>
          <button onClick={logout} className='logout-btn'>Logout</button>
        </div>
    </div>
  )
}

export default ProfileTab;