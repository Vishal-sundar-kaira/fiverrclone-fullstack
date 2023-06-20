import React, { useState,useEffect } from 'react'
import "./Orders.scss"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import message from "../../images/message.png"
import flag from "../../images/flag.png"
import Aos from "aos"
import "aos/dist/aos.css"
import newRequest from '../../utils/newRequest';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
const Orders = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const {isLoading,error,data}=useQuery({
    queryKey:["orders"],
    queryFn:()=>newRequest.get(`/order`).then(res=>{
      return res.data
    })
  })
  const navigate=useNavigate();
  const mutation = useMutation({
    mutationFn: () => {
      return newRequest.post(`/conversation`)
    },
    onSuccess:()=>{
      QueryClient.invalidateQueries("conversation")//point toward querykey of other whom you want to refresh.
    }
  })
const handlecontact=async(order)=>{
  const sellerid=order.sellerid
  const buyerid=order.buyerid
  const id=buyerid+sellerid

  try{
    const res=await newRequest.get(`/conversation/single/${id}`)
    navigate(`/message/${res.data.id}`);
  }catch(err){
    if(err.response.status===404){
      const res=await newRequest.post(`/conversation`,{
        to:currentUser.isSeller?buyerid:sellerid,
      });
      navigate(`/message/${res.data.id}`);
    }
  }
}
useEffect(()=>{
  Aos.init({duration:2000});
},[])
  return (
    <div className='Orders'>
      {isLoading?("loading"):(error?"error":(
      <div className="container">
        <div data-aos="fade-down" className="title">
          <h1>Orders</h1>
        </div>
        <table>
          <thead>
          <tr data-aos="fade-down">
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>{currentUser?.isSeller?"Buyer":"Seller"}</th>
            <th>Contact</th>
          </tr>
          </thead>
          <tbody>
          {
            data.map(order=>{
              return(<tr key={order._id} data-aos="flip-up">
            <td>
              <img className='image' src={order.img||flag} alt="" />
            </td>
            <td>{order.title}</td>
            <td>{order.price}</td>
           <td>{currentUser?.isSeller?order.buyerid:order.sellerid}</td> 
            <td><img src={message} onClick={()=>{handlecontact(order)}} alt="" /></td>
          </tr>)
            })
          }
          </tbody>
        </table>
      </div>))}
    </div>
  )
}

export default Orders
