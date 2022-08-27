import React, {useState, useEffect} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {
    FaEnvelope,
    FaLock,
    FaUserAlt,
    FaPhoneAlt
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../Login/Login.css';

function Register() {
    const navigate = useNavigate();
    
    useEffect(() => {
        if(Cookies.get('auth-token')){
            navigate('/')
        }
    }, [])

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        shift: [],
        vehicle: 'Cycle'
    })

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({...data, [name] : value});
    }

    const onSubmit = () =>{
        if(!data.name || !data.email || !data.phone || !data.password || !data.vehicle || !data.shift.length > 0){
            toast.error('All the fields are required!')
        }else{
            console.log(data)
            setLoading(true);
            axios({
                method: 'POST',
                url: 'http://localhost:9000/user/register',
                headers: {
                    'Content-Type' : 'Application/json'
                },
                data: data
            }).then(res => {
                if(res.data.success){
                    toast.success(res.data.message);
                    setData({name: '', phone: '', email: '', password: '', restaurant: ''})
                }
                setLoading(false)
            }).catch(err => {
                if(!err.response.data.success){
                    toast.error(err.response.data.message)
                }
                setLoading(false);
            })
        }
    }

  return (
    <div className="signup">
        <div className='form__box'>
           <h5>Sign up</h5>

           <div className="form-group">
              <FaUserAlt className='icons'/>
               <input value={data.name} onChange={handleInput} name='name'  type="text"  placeholder='Name'/>
           </div>

           <div className="form-group">
                <FaPhoneAlt className='icons'/>
               <input value={data.phone} onChange={handleInput} name='phone'  type="number"  placeholder='Phone'/>
           </div>

           <div className="form-group">
                <FaEnvelope className='icons'/>
               <input value={data.email} onChange={handleInput} name='email'  type="email"  placeholder='Email'/>
           </div>

           <div className="form-group last-child">
               <FaLock className='icons'/>
               <input value={data.password} onChange={handleInput} name='password'  type="password"  placeholder='Password'/>
           </div>

           <select className='form-group' onChange={e => setData({...data, vehicle: e.target.value})}>
                <option disabled>Vehicle Type</option>
                <option>Cycle</option>
                <option>Bike</option>
           </select>

           <select className='form-group' onChange={e => setData({...data, shift: e.target.value})}>
                <option disabled>Working Shift</option>
                <option value={'8, 13'}>Morning shift (8:00 AM - 1:00 PM)</option>
                <option value={'13, 18'}>Mid Shift (1:00 PM - 6:00 PM)</option>
                <option value={'18, 22'}>Night Shift (6:00 PM - 10:00 PM)</option>
           </select>
   
           <button disabled={loading} onClick={onSubmit} className='form-btn'>{!loading ? 'Register' : 'Loading...'}</button>
           <p className="bottom-text">
            Already have an account? <NavLink to='/login'><span>Login here</span></NavLink>
           </p>

        </div>

        <ToastContainer />
    </div>
  )
}

export default Register