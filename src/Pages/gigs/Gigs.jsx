import React, { useState,useEffect } from 'react'
import "./Gigs.scss"
import { gigs } from "../../data";
import GigCard from '../../Components/gigCard/GigCard';
import down from "../../images/check.png"
import Aos from "aos"
import "aos/dist/aos.css"
const Gigs = () => {
  const [menu,setmenu]=useState(false)
  const [cat,setcat]=useState("Bestselling")
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(()=>{
    Aos.init({duration:1000});
  },[])
  const change=(val)=>{
    setcat(val)
    if(menu==true){
      setmenu(false)
    }
    else{
      setmenu(true)
    }
  }
  const handleclick=()=>{
    if(menu==true){
      setmenu(false)
    }
    else{
      setmenu(true)
    }
  }
  useEffect(()=>{

  },[menu])
  return (
    <div className='Gigs'>
      <div data-aos="fade-down" className="container">
        <span className="breadcrumbs">FIVERR and GRAPHICS & DESIGN </span>
        <span className='dark'>AI Artists</span>
        <span className='p'>Explore the Boundaries of art and technology with Fiverr's Ai Artists</span>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input type="text" placeholder='min' />
            <input type="text" placeholder='max' />
            <button>Apply</button>
          </div>
          <div className="rightmen">
          <div data-aos="zoom-in" className="right">
            <span className='sortby'>SortBy</span>
            <span className='bestsell'>{cat}</span>
            <img src={down} alt="" onClick={handleclick}/>
          </div>
          {menu==true?(<div className="rightmenu">
              <span onClick={() => change("Newest")}>Newest</span>
              <span onClick={() => change("BestSelling")}>Best Selling</span>
            </div>):""}
          </div>
        </div>
      </div>
          <div className="cards">
          {gigs.map((gig) => (
            <GigCard key={gig.id} item={gig} />
          ))}
        </div>
    </div>
  )
}

export default Gigs

  
  
