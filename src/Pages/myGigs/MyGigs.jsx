import React, { useState,useEffect } from 'react'
import "./MyGigs.scss"
import { Link } from 'react-router-dom'
import del from "../../images/delete.png"
import flag from "../../images/flag.png"
import gig2 from "../../images/gig2.jpg"
import Aos from "aos"
import "aos/dist/aos.css"
const myGigs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(()=>{
    Aos.init({duration:2000});
  },[])
  return (
    <div className='MyGigs'>
      <div className="container">
        <div data-aos="fade-down" className="title">
          <h1>Gigs</h1>
          <Link to="/add"><button>Add New Gig</button></Link>
        </div>
        <table>
          <tr data-aos="fade-down" >
            <th >Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
          <tr data-aos="flip-up">
            <td>
              <img className='image' src={gig2} alt="" />
            </td>
            <td>Nidhi</td>
            <td>88</td>
            <td>123</td>
            <td><img src={del} alt="" /></td>
            {/* delete */}
          </tr>
          <tr data-aos="flip-up">
            <td>
              <img className='image' src={gig2} alt="" />
            </td>
            <td>sahil</td>
            <td>88</td>
            <td>123</td>
            <td><img src={del} alt="" /></td>
            {/* delete */}
          </tr>
          <tr data-aos="flip-up">
            <td>
              <img className='image' src={gig2} alt="" />
            </td>
            <td>absek</td>
            <td>88</td>
            <td>123</td>
            <td><img src={del} alt="" /></td>
            {/* delete */}
          </tr>
          <tr data-aos="flip-up">
            <td>
              <img className='image' src={gig2} alt="" />
            </td>
            <td>bittu</td>
            <td>88</td>
            <td>123</td>
            <td><img src={del} alt="" /></td>
            {/* delete */}
          </tr>
          <tr data-aos="flip-up">
            <td>
              <img className='image' src={gig2} alt="" />
            </td>
            <td>vishal</td>
            <td>88</td>
            <td>123</td>
            <td><img src={del} alt="" /></td>
            {/* delete */}
          </tr>
        </table>
      </div>
    </div>
  )
}

export default myGigs
