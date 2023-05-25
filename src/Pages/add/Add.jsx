import React, { useState,useEffect } from 'react'
import "./Add.scss"
import Aos from "aos"
import "aos/dist/aos.css"
const Add = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(()=>{
    Aos.init({duration:1000});
  },[])
  return (
    <div className='add'>
      <div className="container">
      <h1 data-aos="zoom-in-down">Add New Gig</h1>
      <div className="section">
        <div data-aos="fade-right" className="left">
          <label htmlFor="">Title</label>
          <input type="text" placeholder='e.g.I will do something Im really good at'/>
          <label htmlFor="">Category</label>
          <select name="cat" id="cat">
            <option value="music">Music</option>
            <option value="dance">Dance</option>
            <option value="webdev">Webdev</option>
            <option value="ml">Machine Learning</option>
          </select>
          <label htmlFor="">Cover Image</label>
          <input type="file" />
          <label htmlFor="">Upload Images</label>
          <input type="file" />
          <label htmlFor="">Description</label>
          <textarea name="description" id="description" cols="30" rows="10"></textarea>
          <button>Create</button>
        </div>
        <div data-aos="fade-left"  className="right">
          <label htmlFor="">Service Title</label>
          <input type="text" placeholder='eg.One-page web design' />
          <label htmlFor="">Short Description</label>
          <textarea name="shortdesc" id="shortdesc" cols="30" rows="10" placeholder='Short Description of your service'></textarea>
          <label htmlFor="">Delivery Time(e.g. 3days)</label>
          <input type="text" />
          <label htmlFor="">Revision Number</label>
          <input type="number" />
          <label htmlFor="">Add Features</label>
          <input type="text" placeholder='e.g Page design' />
          <input type="text" placeholder='e.g file uploading' />
          <input type="text" placeholder='e.g hosting' />
          <label htmlFor="">price</label>
          <input type="number" />
        </div>
      </div>
      <button className='resbutton'>Create</button>
      </div>
    </div>
  )
}

export default Add
