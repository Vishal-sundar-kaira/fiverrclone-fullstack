import React, { useState,useEffect } from 'react'
import "./Messages.scss"
import { Link } from 'react-router-dom'
import message from "../../images/message.png"
import flag from "../../images/flag.png"
import Aos from "aos"
import "aos/dist/aos.css"
import newRequest from '../../utils/newRequest';
import moment from "moment"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
const queryClient=useQueryClient();
const mutation = useMutation({
  mutationFn: (id) => {
    return newRequest.put(`/conversation/${id}`)
  },
  onSuccess:()=>{
    queryClient.invalidateQueries("conversation")//point toward querykey of other whom you want to refresh.
  }
})
const handleread=(id)=>{
  mutation.mutate(id)
}
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
          <thead>
          <tr>
            <th data-aos="fade-right">{currentUser.isSeller?"Buyer":"Seller"}</th>
            <th data-aos="fade-right">Last Message</th>
            <th data-aos="fade-left">Date</th>
            <th data-aos="fade-left">Action</th>
          </tr>
          </thead>
          <tbody>
          {data.map((c)=>{
            return(
              <tr data-aos="flip-up" className='active' key={c.id}>
              <td>
                <h3>{currentUser.isSeller?c.buyerid:c.sellerid}</h3>
              </td>
              <td><Link to={`/message/${c.id}`}className='link'>{c?.lastmessage?.substring(0,80)}....</Link></td>
              <td>{moment(c.updatedAt).fromNow()} </td>
              <td>
              {(currentUser.isSeller && c.Readbyseller=="false") || (!currentUser.isSeller && c.Readbybuyer=="false") && (
  <button onClick={() => handleread(c.id)}>Mark as read</button>
)}
              </td>
              {/* delete */}
            </tr>
            )
          })}
          </tbody>
        </table>
      </div>))}
    </div>
  )
}

export default Messages
