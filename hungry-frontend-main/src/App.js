import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//IMPORT ALL THE COMPONENTS and PAGES
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Footer from './Components/Footer/Footer';
import Register from './Pages/Register/Register';
import {AuthContext} from './Context/AuthContext';

// PROTECTED ROUTES 
import RiderDash from './Pages/RiderDash/RiderDash';
import Details from './Pages/Details/Details';
import Orderform from './Pages/Orderform/Orderform';
import Protected from './Pages/Protected';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <React.Fragment>
      <AuthContext.Provider value={{setIsLoggedIn, isLoggedIn}}>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/add' element={<Orderform />} />
          <Route path='/rider-dashboard' element={<Protected Component={RiderDash} />} />
          <Route path='/rider-dashboard/details/:id' element={<Protected Component={Details} />} />
        </Routes>

        <Footer />
      </Router>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
