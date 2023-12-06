import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
function Login() {
  const [username,setusername]=useState()
  const [password,setpassword]=useState()
  const [error,seterror]=useState(null)

  const navigate = useNavigate()
  console.log("started")
  const handlesubmit=async(e)=>{
    e.preventDefault();
    console.log("ready")
    try{
      const res=await newRequest.post("/auth/login",{username,password})
      localStorage.setItem("currentUser",JSON.stringify(res.data))
      navigate("/")
    }catch(err){
      seterror(err.response.data)
      console.log(err)
    }

  }
  return (
    <div className="login">
      <form onSubmit={handlesubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={e=>setusername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={e=>setpassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && alert(error)}
      </form>
    </div>
  );
}

export default Login;