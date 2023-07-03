import React, { useState,useEffect } from 'react'
import "./Message.scss"
import { Link, useParams } from 'react-router-dom'
import profile from "../../images/profile.webp"
import projimg from "../../images/projimg.webp"
import Aos from "aos"
import "aos/dist/aos.css"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
const Message = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(()=>{
    Aos.init({duration:1000});
  },[])
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const {id}=useParams();
  const queryClient=useQueryClient();
  const {isLoading,error,data}=useQuery({
    queryKey:["messages"],
    queryFn:()=>newRequest.get(`/message/${id}`).then(res=>{
      console.log(res.data,"done")
      return res.data
    })
  })
  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/message`,message)
    },
    onSuccess:()=>{
      queryClient.invalidateQueries("messages")
    }
  })
  const handlesubmit=(e)=>{
    e.preventDefault();
    mutation.mutate({
      conversationid:id,
      desc:e.target[0].value
    });
    e.target[0].value="";
  }
  return (
    <div className='Message'>
      <div className="container">
        <span data-aos="fade-right" className="breadcrumbs">
          <Link to="/messages">MESSAGES</Link> Vishal Kaira
        </span>
        <div className="messages">
        {isLoading?"Loading":error?"error":(
        data.map((m)=>{
          return (
          <div   key={m._id} className={m.Userid===currentUser._id?"mess":"mess owner" }>
            <img src={profile} alt="" />
            <div className="chat">
              <p>{m.desc}</p>
            </div>
          </div>
        )
        })
)}
</div>
        <hr />
        <form className="write" onSubmit={handlesubmit}>
          <textarea name="" id="" cols="30" rows="10" placeholder='Write your message'></textarea>
          <button type='submit'>send</button>
        </form>
      </div>
    </div>
  )
}

export default Message
