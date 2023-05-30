import React, { useState } from "react";
// import upload from "../../utils/upload";
import "./Register.scss";
// import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import upload  from "../../utils/upload";
const Register=()=>{
  const navigate=useNavigate();
  const [file,setfile]=useState(null)
const [user,setuser]=useState({
      username:"",
      email:"",
      password:"",
      img:"",
      country:"",
      desc:"",
      phone:"",
      isSeller:false
    })
const handlechange=(e)=>{
  setuser(prev=>{
    return {...prev,[e.target.name]:e.target.value}
  })
}
const handleseller=(e)=>{
  setuser(prev=>{
    return {...prev,isSeller:[e.target.checked]}
  })
}
const handlesubmit=async(e)=>{
  e.preventDefault();
  const url=await upload(file);
  try{
    console.log(user)
    await newRequest.post("/auth/register",{
      ...user,
      img:url
    })
    navigate("/")
  }catch(err){
    console.log(err)
  }
}
// console.log(user)
// console.log(file)
  return (
    <div className="register">
      <form onSubmit={handlesubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="vishal"
            onChange={handlechange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="name@gmail.com"
            onChange={handlechange}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handlechange}/>
          <label htmlFor="">Profile Picture</label>
          <input type="file"  onChange={e=>setfile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="India"
            onChange={handlechange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onClick={handleseller}/>
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+91 123 456 789 1"
            onChange={handlechange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handlechange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;