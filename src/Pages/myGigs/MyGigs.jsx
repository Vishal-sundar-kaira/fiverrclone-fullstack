import React, { useState,useEffect } from 'react'
import "./MyGigs.scss"
import { Link } from 'react-router-dom'
import del from "../../images/delete.png"
import flag from "../../images/flag.png"
import gig2 from "../../images/gig2.jpg"
import Aos from "aos"
import "aos/dist/aos.css"
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
const myGigs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(()=>{
    Aos.init({duration:2000});
  },[])
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  //to get mygigs
  const {isLoading,error,data}=useQuery({
    queryKey:["myGigs"],
    queryFn:()=>newRequest.get(`/gig?userid=${currentUser._id}`).then(res=>{
      return res.data
    })
  })
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gig/${id}`)
    },
    onSuccess:()=>{
      QueryClient.invalidateQueries("myGigs")//point toward querykey of other whom you want to refresh.
    }
  })
  const handledelete=(id)=>{
    mutation.mutate(id);
  }
  return (
    <div className='MyGigs'>
    <div className="container">

        <div data-aos="fade-down" className="title">
          <h1>Gigs</h1>
          <Link to="/add"><button>Add New Gig</button></Link>
        </div>
        <table>
          <tbody>
          <tr data-aos="fade-down" >
            <th >Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
          {isLoading?"Loading":error?"error":(data.map(gig=>{
            {console.log(gig)}
            return(
              <tr data-aos="flip-up" key={gig.id}>
              <td>
                <img className='image' src={gig.cover} alt="" />
              </td>
              <td>{gig.title}</td>
              <td>{gig.price}</td>
              <td>{gig.sales}</td>
              <td><img src={del} alt="" onClick={()=>{handledelete(gig._id)}} /></td>
              {/* delete */}
            </tr>
          )}))
          }
          
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default myGigs
