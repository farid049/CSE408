import React, {useState, useEffect}  from 'react';
import './Details.css';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import {IoChatbubbleEllipsesSharp} from 'react-icons/io5';
import {FaUserCircle, FaPaperPlane, FaTimesCircle} from 'react-icons/fa';

function Details() {

    const {id} = useParams();
    const [countdown, setCountDown] = useState('');
    const [countDownTarget, setCountDownTarget] = useState();
    const [pickup, setPickup] = useState(false);
    const [showPickup, setShowPickup] = useState(true);
    const [showChat, setShowChat] = useState(false);
    const [order, setOrder] = useState({});
    const [status, setStatus] = useState({s: '', c: ''});
   
    const handlePickup = (id) => {
        if(id){
            axios({
                method: 'POST',
                url: 'http://localhost:9000/order/pickupOrder',
                headers: {
                    'Content-type' : 'Application/json'
                },
                data: {id}
            }).then(res => {
                if(res.data.success){
                    toast.success(res.data.message);
                    setPickup(true);
                    setCountDownTarget(Number(res.data.time))
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    useEffect(function(){
        axios({
            method: 'POST',
            url: 'http://localhost:9000/order/singleOrder',
            headers: {
                'Content-type': 'Application/json'
            },
            data: {id}
        }).then(res => {
            const order = res.data.order;
            setOrder(order);
            if(order.status == 1){
                setShowPickup(false)
                setStatus({s: 'New', c: '#ff9f43'})
            }else if(order.status == 2){
                setStatus({s: 'Active', c: '#ee5253'})
            }else if(order.status == 3){
                setCountDownTarget(Number(order.countdown))
                setPickup('pickup-btn')
                setStatus({s: 'On way', c: '#22a6b3'});
            } else{
                setPickup('pickup-btn')
                setStatus({s: 'Delivered', c: '#27ae60'})
            }

        }).catch(err => {
            console.log(err)
        })
    }, [id])


    if(countDownTarget){
        const timer = setInterval(function() {
        let now = new Date().getTime();  
        let distance = countDownTarget - now;
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountDown(minutes + 'm ' + seconds + 's');
          
        if (distance < 0) {
          clearInterval(timer);
          setCountDown('Expired')
        }
      }, 1000);
    }

  return (
    <div className="details">
        <h1 className='heading'>Status: <span style={{color: status.c}}>{status.s}</span></h1>
        <h3 className='subheading'>User Details</h3>
        <p>Name: {order.orderName}</p>
        <p>Phone: {order.phone}</p>
        <p>Address: {order.address}</p>

        {
            showPickup ? 
                <button disabled={pickup} onClick={() => handlePickup(order._id)} className='btn'>
                  {pickup ? 'Ordered picked!' : 'Pickup order'}
                </button>
            : ''
        }

        <p>{countdown}</p>
        

        <h3 className="subheading">Order Details</h3>
        <table border='1px solid rgb(209,209,209)'>
            <thead>
                <tr>
                    <th>Order Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Payment</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{order.orderItem}</td>
                    <td>{order.quantity}</td>
                    <td>{order.price} ৳</td>
                    <td>{order.quantity * order.price} ৳</td>
                    <td>{order.payment}</td>
                </tr>
            </tbody>
        </table>

        <button className='btn chat-btn' onClick={() => setShowChat(true)}>
            Chat with customer 
            <IoChatbubbleEllipsesSharp className='chat-icon'/>
        </button>


        {/* CHAT UI  */}
        <div className={`msg-container ${showChat ? 'show' : ''}`} >
            <div className="msg-header">
                <p><FaUserCircle className='customer-icon' /> {order.orderName}</p>
                <p className='active-status'>Online</p>
                <FaTimesCircle onClick={() => setShowChat(false)} className='close' />
            </div>

            <div className="msg-body">
                <p className='reply'>Message from customer!</p>
                <p className='sent'>Message sent by you!</p>
                <p className='reply'>Message from customer!</p>
                <p className='sent'>Message sent by you!</p>
                <p className='reply'>Message from customer!</p>
                <p className='sent'>Message sent by you!</p>
                <p className='reply'>Message from customer!</p>
                <p className='sent'>Message sent by you!</p>
            </div>

            <div className="msg-footer">
                <input type="text" placeholder='Type message' />
                <button className='sent-btn'><FaPaperPlane /></button>
            </div>
        </div>

    <ToastContainer />
    </div>
  )
}

export default Details