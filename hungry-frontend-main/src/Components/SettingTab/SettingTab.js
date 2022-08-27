import React, {useState} from 'react';
import {toast} from 'react-toastify';
import { useJsApiLoader, GoogleMap, MarkerF, DirectionsRenderer } from '@react-google-maps/api';
import axios from 'axios';

function SettingTab({user, location}) {

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyCX1CLf0Lf6qs9fD-BEMEXQ83VJiWyb6rE'
    })

    const dest = {
        lat: 23.886722,
        lng: 90.965967
    }

    const [pass, setPass] = useState({old: '', new: '', repeat: ''});
    const [direction, setDirection] = useState(null);

    const handleInput = e => {
        const name = e.target.name;
        const value = e.target.value;
        setPass({...pass, [name]: value})
    }

    const changePassword = id => {
        if(!pass.old || !pass.new || !pass.repeat){
            toast.error('Password feilds are empty')
        }else{
            if(pass.new === pass.repeat){
                axios({
                    method: 'POST',
                    url: 'http://localhost:9000/user/changepassword',
                    headers: {
                        'Content-type' : 'Application/json'
                    },
                    data: {old: pass.old, created: pass.new, id}
                }).then(res => {
                    if(res.data.success){
                        toast.success(res.data.message)
                    }
                }).catch(err => {
                    toast.error(err.response.data.message)
                })

                setPass({old: '', new: '', repeat: ''})
            }else{
                toast.error("Repeat password don't match")
            }
        }
    }

    const changeShift = e => {
        const shift = e.target.value;
        axios({
            method: 'PUT',
            url: 'http://localhost:9000/user/changeShift',
            headers: {
                'Content-type' : 'Application/json'
            },
            data: {shift, userId: user._id}
        }).then(res => {
            toast.success(res.data.message)
        }).catch(err => {
            console.log(err)
        })
    }

/*
    function route(){
        const directionService = new google.maps.DirectionsService();
        const result =  directionService.route({
            // These are test location 
            origin: 'Dhaka',
            destination: 'Alomnagar Nabinagar',
            travelMode:  google.maps.TravelMode.DRIVING
        })

        setDirection(result);
    }
*/

if(!isLoaded) return <h2>Loading...</h2>


  return (
    <div className='tab-content setting'>
        <div className="map">

             <GoogleMap options={{
                streetViewControl: false,
                fullscreenControl: false,
                mapTypeControl: false
             }} center={location} mapContainerStyle={{width: '100%', height: '100%'}} zoom={15} >
                <MarkerF position={location}/>
                <MarkerF position={dest} />
                {direction && <DirectionsRenderer directions={direction} />}
             </GoogleMap>
        </div>
                   
        <div className="form">
            <select defaultValue={'shift'} className='form-group' onChange={changeShift}>
                <option value={'shift'} disabled>Change shift</option>
                <option value={'8, 13'} >Morning shift (8:00 AM - 1:00 PM)</option>
                <option value={'13, 18'} >Mid Shift (1:00 PM - 6:00 PM)</option>
                <option value={'18, 22'} >Night Shift (6:00 PM - 10:00 PM)</option>
            </select>
                        
            <div className="form-group">
                <input value={pass.old} onChange={handleInput} name='old' type="password" placeholder='Old password'/>
            </div>
            <div className="form-group">
                 <input value={pass.new} onChange={handleInput} name='new' type="password" placeholder='New password'/>
            </div>
            <div className="form-group">
                <input value={pass.repeat} onChange={handleInput} name='repeat' type="password" placeholder='Repeat password'/>
            </div>
            <button onClick={() => changePassword(user._id)}>Change</button>     
        </div>

    </div>
  )
}

export default SettingTab