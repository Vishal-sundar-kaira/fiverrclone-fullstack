import React, { useState,useEffect } from 'react'
import "./Orders.scss"
import { Link } from 'react-router-dom'
import message from "../../images/message.png"
import flag from "../../images/flag.png"
import Aos from "aos"
import "aos/dist/aos.css"
import newRequest from '../../utils/newRequest';
import { useQuery } from '@tanstack/react-query'
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
            <th>{currentUser?.isSeller?"Seller":"Buyer"}</th>
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
           <td>{currentUser?.isSeller?order.sellerid:order.buyerid}</td> 
            <td><img src={message} alt="" /></td>
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
