import React, {useState} from 'react';
import './Orderform.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function Orderform() {

    const [data, setData] = useState({
        orderName: '',
        phone: '',
        address: '',
        payment: '',
        orderItem: '',
        quantity: '',
        price: '',
        status: '1'
    })

    const handleInput = function(e){
        const name = e.target.name;
        const value = e.target.value;
        setData({...data, [name] : value})
    }

    const submit = function(){
        for (const key in data) {
            if(data[key] === ''){
                toast.error('Please fill all the data');
                break;
            }else{
                axios({
                    method: 'POST',
                    url: 'http://localhost:9000/order/newOrder',
                    headers: {
                        'Content-Type' : 'Application/json'
                    },
                    data
                }).then(res => {
                    toast.success(res.data.message);
                    setData({
                        orderName: '',
                        phone: '',
                        address: '',
                        payment: '',
                        orderItem: '',
                        quantity: '',
                        price: '',
                        status: '1'
                    })
                }).catch(err => {
                    console.log(err)
                })
                break;
            }
        }
    }

  return (
    <div className="add_form">
        <h2>Add Dummy Order</h2>
        <div className="form-group">
            <input name='orderName' value={data.orderName} onChange={handleInput} className='form-control' type="text" placeholder='Username'/>
        </div>
        <div className="form-group">
            <input name='phone' value={data.phone} onChange={handleInput} className='form-control' type="tel" placeholder='Phone number'/>
        </div>
        <div className="form-group">
            <input name='address' value={data.address} onChange={handleInput} className='form-control' type="text" placeholder='Address'/>
        </div>
        <select defaultValue={'Payment'} onChange={e => setData({...data, payment: e.target.value})}>
            <option disabled value='Payment'>Payment</option>
            <option>Cash on delivery</option>
            <option>Paid</option>
        </select>
        <div className="form-group">
          <input name='orderItem' value={data.orderItem} onChange={handleInput} className='form-control' type="text" placeholder='Food item name (E.g burger)'/>
        </div>
        <div className="form-group">
          <input name='quantity' value={data.quantity} onChange={handleInput} className='form-control' type="number" placeholder='Quantity'/>
        </div>
        <div className="form-group">
          <input name='price' value={data.price} onChange={handleInput} className='form-control' type="number" placeholder='Price ৳'/>
        </div>
        <div className="form-group">
            <button onClick={submit} className='form-control'>Add order</button>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Orderform