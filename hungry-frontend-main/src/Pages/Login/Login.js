import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../../Context/AuthContext";

import "./Login.css";

function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {setIsLoggedIn} = useContext(AuthContext);

    useEffect(() => {
        if(Cookies.get('auth-token')){
            navigate('/')
        }
    }, [])

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const onSubmit = () => {
    if (!data.email || !data.password) {
      toast.error("Invalid credentials");
    } else {
      setLoading(true);
      axios({
        method: "POST",
        url: "http://localhost:9000/user/authorize",
        headers: {
          "Content-Type": "Application/json",
        },
        data: data,
      }).then((res) => {
          if (res.data.success) {
            Cookies.set("auth-token", res.data.token);
            setIsLoggedIn(true)
            navigate("/rider-dashboard");
          }
          setLoading(false);
        }).catch((err) => {
          if (!err.response.data.success) {
            toast.error(err.response.data.message);
          }
          setLoading(false);
        });
      setLoading(false);
    }
  };

  return (
    <div className="singin">
      <div className="form__box">
        <h5>Sign In</h5>

        <div className="form-group">
          <FaEnvelope className="icons" />
          <input
            value={data.email}
            onChange={handleInput}
            name="email"
            type="email"
            placeholder="Email"
          />
        </div>

        <div className="form-group last-child">
          <FaLock className="icons" />
          <input
            value={data.password}
            onChange={handleInput}
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>

        <p className="forgot__password">Forgot password?</p>
        <button onClick={onSubmit} disabled={loading} className="form-btn">
          {!loading ? "Login" : "Loading..."}
        </button>
        <p className="bottom-text">
          Don't have an account?{" "}
          <NavLink to="/register">
            <span>Create here</span>
          </NavLink>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
