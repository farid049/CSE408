import React from 'react';
import {NavLink} from 'react-router-dom';

function OrdersTab({orders}) {
  return (
    <div className='tab-content order'>
        {
          orders.length > 0 && orders.map((value, index) => {
                            
            // order status 1 mean new, 2 mean active and 3 mean pickedup and 4 means delivered
            if(value.status == 4){
               return(
                    <div key={index} className="order-short">
                        <div className="order-short-left">
                            <NavLink to={`details/${value._id}`} > <p className='title'>{value.orderItem}</p> </NavLink>
                            <p className='desc'>Delivered</p>
                        </div>
                    </div> 
                 )
               }
           })
        }
    </div>
  )
}

export default OrdersTab