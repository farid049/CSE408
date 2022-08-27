import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

function NotificationTab({orders, user}) {
    const [hideOrderId, setHideOrderId] = useState('');

    const hanldeAccept = (oId, rId) => {
        axios({
            method: 'POST',
            url: 'http://localhost:9000/order/acceptOrder',
            headers: {
                'Content-Type' : 'Application/json'
            },
            data: {oId, rId}
        }).then(res => {
            setHideOrderId(res.data.id);
            toast.success(res.data.message);
        }).catch(err => {
            console.log(err)
        })
    }
    
  return (
    <div className='tab-content order notification'>
        {
            orders.length > 0 && orders.map((value, index) => {
                return (
                  <div style={{display: hideOrderId == value._id ? 'none' : ''}} key={index} className="order-short">
                    <NavLink to={`details/${value._id}`} > <p className='title'>{value.orderItem}</p> </NavLink>
                    <button onClick={() => hanldeAccept(value._id, user._id)}>Accept</button>
                  </div> 
                )
            })
        } 
    </div>
  )
}

export default NotificationTab