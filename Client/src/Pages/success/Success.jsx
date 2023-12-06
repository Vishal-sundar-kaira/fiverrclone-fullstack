import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import newRequest from '../../utils/newRequest';

const Success = () => {
    const {search}=useLocation();//search gives us query
    const navigate=useNavigate();
    const params=new URLSearchParams(search);
    const payment_intent=params.get("payment_intent");
    useEffect(()=>{
        const makeRequest=async()=>{
            try{
                await newRequest.put("/order",{payment_intent})
                setTimeout(()=>{
                    navigate("/order")
                },2000)
            }catch(err){
                console.log(err);
            }
        }
        makeRequest();
    })
  return (
    <div>
      Payment Successful.You are being redirected to the order page please do not close.
    </div>
  )
}

export default Success
