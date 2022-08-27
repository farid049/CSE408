import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function Protected({Component}) {

    const navigate = useNavigate();
    const [user, setUser] = useState('');
  
    useEffect(function(){
 
      const getToken = Cookies.get('auth-token');
      if(getToken){
        axios.get('http://localhost:9000/user/protected', {
          headers: {
            'Authorization' : `Bearer ${getToken}`
          }
        }).then(res => {
            setUser(res.data.user)
        }).catch(err => {
          Cookies.remove('userToken')
          
        })
      }else{
        navigate('/')
      }
             
    }, [])

    return(
        <Component user={user} />
    )

}

export default Protected;