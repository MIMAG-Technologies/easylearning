import axios from 'axios';
import { X } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

export default function StudentLogin() {
    const [email, setEmail] = useState("");
    const [isOTPsent, setisOTPsent] = useState(false)
    const [otp, setotp] = useState("")
     const navigate = useNavigate();
     const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
     const { setisLoading, setToken } = useContext(AuthContext);
     const handleSubmit = async(e)=>{
         e.preventDefault();
         if(email.trim() === ''){
              toast.warn("Please enter your email");
             return
         }
         setisLoading(true)
         if(!isOTPsent){
            try {
                await axios.post(`${apiBaseUrl}/auth/sendOTP`,{email});
                setisOTPsent(true);
                toast.info("OTP sent to your email");
                
            } catch (error) {
                toast.error("Failed to send OTP");
                console.error(error);
                
            }
         }
         else{
            try {
                const res = await axios.post(
                  `${apiBaseUrl}/auth/student/login`,{email,otp}
                );
                setToken(res.data.token);
                  localStorage.setItem("token", res.data.token);
                  toast.success("Successfully logged in");
                  navigate("/");
                
            } catch (error) {
                toast.error("Invalid OTP");
                console.error(error);
                
            }

         }
         setisLoading(false);

     }
  return (
    <div id="AuthContainer">
      <div id="Auth">
        <X
          className="x-btn"
          onClick={() => {
            navigate(-1);
          }}
        />
        <h2>Welcome to Psycortex</h2>
        <p>Login as a Student</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="user-email">EMAIL</label>
          <input
            type="email"
            id="user-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isOTPsent && (
            <>
              <label htmlFor="user-otp">OTP</label>
              <input
                type="text"
                id="user-otp"
                value={otp}
                onChange={(e) => setotp(e.target.value)}
              />
            </>
          )}

          <button type="submit">{!isOTPsent ? "Send OTP" : "Login"}</button>
          <div className="line"></div>
          <p className="have_an_account">
            Are you Instructor?
            <Link to="/auth/login/teacher">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
