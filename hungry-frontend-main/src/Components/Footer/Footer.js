import React from 'react';
import './Footer.css';
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn
} from 'react-icons/fa';

function Footer() {
  return (
    <footer>
         <ul className='icons'>
            <li><FaFacebookF className='icon'/></li>
            <li><FaInstagram className='icon'/></li>
            <li><FaLinkedinIn className='icon'/></li>
         </ul>

         <ul className='footer__menu'>
            <li>Home</li>
            <li>About</li>
            <li>Privacy Policy</li>
            <li>Terms & Condition</li>
            <li>Contact</li>
         </ul>

         <p className='copyright'>© 2022 HungerExpress</p>
    </footer>
  )
}

export default Footer