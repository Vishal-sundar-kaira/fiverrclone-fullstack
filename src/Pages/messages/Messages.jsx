import React, { useState,useEffect } from 'react'
import "./Messages.scss"
import { Link } from 'react-router-dom'
import message from "../../images/message.png"
import flag from "../../images/flag.png"
import Aos from "aos"
import "aos/dist/aos.css"
import newRequest from '../../utils/newRequest';
import moment from "moment"
import { useQuery } from '@tanstack/react-query'
const Messages = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
const {isLoading,error,data}=useQuery({
  queryKey:['conversation'],
  queryFn:()=>newRequest.get(`/conversation`).then(res=>{
    // console.log(res.data.userid)
    return res.data
  })
})
useEffect(()=>{
  Aos.init({duration:2000});
},[])
const message="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit veritatis sed dolores quis iure ratione beatae dolorem" 
  return (
    <div className='Messages'>
      {isLoading?"Loading":(error?"error":(
        <div className="container">
        <div data-aos="fade-down" className="title">
          <h1>Messages</h1>
        </div>
        <table>
          <tr>
            <th data-aos="fade-right">Buyer</th>
            <th data-aos="fade-right">Last Message</th>
            <th data-aos="fade-left">Date</th>
            <th data-aos="fade-left">Action</th>
          </tr>
          {data.map((c)=>{
            return(
              <tr data-aos="flip-up" className='active' key={c.id}>
              <td>
                <h3>{currentUser.isSeller?c.buyerid:sellerid}</h3>
              </td>
              <td><Link to="/message/123"className='link'>{c?.lastmessage?.substring(0,80)}....</Link></td>
              <td>{moment(c.updatedAt).fromNow()} </td>
              <td><button>Mark as read</button></td>
              {/* delete */}
            </tr>
            )
          })}
        </table>
      </div>))}
    </div>
  )
}

export default Messages
