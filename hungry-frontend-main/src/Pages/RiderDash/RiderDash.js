import React, {useState, useEffect} from 'react';
import Avatar from '../../img/avatar.jpeg';
import './RiderDash.css';
import axios from 'axios';
import {ToastContainer } from 'react-toastify';

import ProfileTab from '../../Components/ProfileTab/ProfileTab';
import OrdersTab from '../../Components/OrdersTab/OrdersTab';
import ActiveOrders from '../../Components/ActiveOrders/ActiveOrders';
import NotificationTab from '../../Components/NotificationTab/NotificationTab';
import SettingTab from '../../Components/SettingTab/SettingTab';

function RiderDash({user}) {

    const hour = new Date().getHours();
    const [online, setOnline] = useState('Offline');
    const [earn, setEarn] = useState();
    const [badge, setBadge] = useState('0');
    const [orders, setOrders] = useState([]);
    const [activeOrder, setActiveOrder] = useState([]);
    const [showTab, setShowTab] = useState([1]);
    const [location, setLocation] = useState({lat: '', lng: ''})


    const fetchOrders = () => {
        axios.get('http://localhost:9000/order/fetchOrders').then(res => {
            setOrders(res.data.orders);
            setBadge(res.data.orders.length);
        }).catch(err => {
            console.log(err) 
        }) 
    }

    const fetchTotal = function(rId){
        axios({
          method: 'POST',
          url: 'http://localhost:9000/order/earnedToday',
          headers: {
              'Content-Type': 'Application/json'
          },
          data: {rId}
           }).then(res => {
              const date = new Date();
              const day = date.getDay();
              const month = date.getMonth() + 1;
              const year = date.getFullYear();
              let income = 0;

              for (const i of res.data.order) {
                if((i.date.day === day) && (i.date.month === month) && (i.date.year === year) ){
                    income += i.earned;
                }
              }

              setEarn(income);
          }).catch(err => {
                 console.log('err') 
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
                setActiveOrder(res.data.activeOrders)
            }
        }).catch(err => {
            console.log('err') 
        }) 
    }

    
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            if(position){
                setLocation({lat: position.coords.latitude, lng: position.coords.longitude})
            }
        })
    }


    useEffect(function(){ 
        fetchOrders();
        getLocation();
        fetchActiveOrders(user._id);
        fetchTotal(user._id);
            
        if(user.shift){
            const timeArray = user.shift.split(',');
             for(let i = Number(timeArray[0]); i <= Number(timeArray[1]); i++){
                if(i === hour){
                     setOnline('Online');
                     break;
                }
            }
        }
    }, [user])


  return (
    <div className='r-dashboard'>
        <div className="r-top">
            <img src={Avatar} alt="" />
            <h4 className='r-name'>{user.name}</h4>
        </div>

        <div className="r-bottom">
            <ul className='tabs'>
                <li onClick={() => setShowTab([1])} className={`tab-item ${showTab[0] === 1 ? 'active' : ''}`}>Profile</li>
                <li onClick={() => setShowTab([2])} className={`tab-item ${showTab[0] === 2 ? 'active' : ''}`}>Orders</li>
                <li onClick={() => setShowTab([3])} className={`tab-item ${showTab[0] === 3 ? 'active' : ''}`}>Active orders</li>
                <li onClick={() => setShowTab([4])} className={`tab-item ${showTab[0] === 4 ? 'active' : ''}`}>
                    Notifications <span className='badge'>{badge}</span> 
                </li>
                <li onClick={() => setShowTab([5])} className={`tab-item ${showTab[0] === 5 ? 'active' : ''}`}>Setting</li>
            </ul>

            {
               showTab.map((v, i) => {
                switch (v) {
                    case 1:
                        return <ProfileTab earn={earn} user={user} status={online} key={i}/>
                        break;
                    case 2: 
                        return <OrdersTab orders={activeOrder} key={i}/>
                        break;
                    case 3: 
                        return <ActiveOrders user={user} orders={activeOrder} key={i}/>
                        break;
                    case 4: 
                        return <NotificationTab user={user} orders={orders} key={i}/>
                        break;
                    case 5: 
                        return <SettingTab user={user} location={location} key={i}/>
                        break;
                    default: 
                        break;
                }
               })
            }
        </div>
    <ToastContainer />
    </div>
  )
}

export default RiderDash;