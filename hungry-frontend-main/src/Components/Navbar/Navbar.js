import Cookies from 'js-cookie';
import React, { useContext } from 'react';
import {NavLink} from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import logo from '../../img/logo.png';
import './Navbar.css';
import {FaShoppingBag} from 'react-icons/fa';

function Navbar() {

    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
    if(Cookies.get('auth-token')){
        setIsLoggedIn(true)
    }

  return (
        <header>
            <div className="logo">
               <NavLink to='/'> 
                    <img src={logo} alt="" /> 
                </NavLink>
            </div>

            <menu>
                <ul>
                    <li>Apply Job!</li>
                    <li>Rider</li>
                    <li>Cart <FaShoppingBag /></li>
                </ul>
            </menu>

            <div className="button">
                {
                    isLoggedIn ? 
                    <NavLink to='/rider-dashboard'>
                        <button>Dashboard</button>
                    </NavLink>
                    :
                    <NavLink to='/login'>
                        <button>Login</button>
                     </NavLink>
                }
            </div>
        </header>
  )
}

export default Navbar