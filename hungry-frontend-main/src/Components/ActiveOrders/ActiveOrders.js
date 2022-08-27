import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';
import {FaUndoAlt} from 'react-icons/fa';

function ActiveOrders({orders, user}) {
    const [allOrder, setAllOrder] = useState(orders)
    const handleCompleted = oId =>{
        axios({
            method: 'POST',
            url: 'http://localhost:9000/order/completedOrder',
            headers: {
                'Content-Type' : 'Application/json'
            },
            data: {oId, uId: user._id}
        }).then(res => {
            if(res.status){
                toast.success(res.data.message);
                fetchActiveOrders(user._id);
            }
        }).catch(err => {
            toast.error('Order not picked up yet')
        })
    }

    const fetchActiveOrders = (rId) => {
        axios({
            method: 'POST',
            url: 'http://localhost:9000/order/fetchActiveOrder',
            headers: {
                'Content-Type': 'Application/json'
            },
            data: {rId}
        }).then(res => {
            if(res.data.success){
                setAllOrder(res.data.activeOrders)
            }
        }).catch(err => {
            console.log('err') 
        }) 
    }


    return (
        <div className='tab-content order active-order'>
            <FaUndoAlt onClick={() => fetchActiveOrders(user._id)}  style={{position: 'absolute', right: 30, color: 'gray', top: 10, cursor: 'pointer'}} />
            {
                allOrder.length > 0 && allOrder.map((value, index) => {
                                
                    // order status 1 mean new, 2 mean active and 3 mean pickedup and 4 means delivered
                    if(value.status == 2 || value.status == 3){
                        return(
                            <div key={index} className="order-short">
                                <div className="order-short-left">
                                    <NavLink to={`details/${value._id}`} > <p className='title'>{value.orderItem}</p> </NavLink>
                                    <p className='desc'>Active</p>
                                </div>
                                <button onClick={() => handleCompleted(value._id)}>Mark Completed</button>
                            </div> 
                        )
                    }
                })
            }
        </div>
  )
}

export default ActiveOrders