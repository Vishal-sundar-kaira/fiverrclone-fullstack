import React, { useState,useEffect,useRef } from 'react'
import "./Gigs.scss"
import GigCard from '../../Components/gigCard/GigCard';
import down from "../../images/check.png"
import Aos from "aos"
import "aos/dist/aos.css"
import { useQuery,useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useLocation } from 'react-router-dom';
const Gigs = () => {
  const queryClient = useQueryClient()
  const [menu,setmenu]=useState(false)
  const [cat,setcat]=useState("Bestselling")
  const minRef = useRef();
  const maxRef = useRef();
  const {search}=useLocation()
  // console.log(location)
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
  const apply=()=>{
    refetch();
  }
  const {isLoading,error,data,refetch}=useQuery({
    queryKey:['gig'],
    queryFn:()=>newRequest.get(`/gig${search}${minRef.current.value? `&min=${minRef.current.value}` : ''}${maxRef.current.value? `&max=${maxRef.current.value}` : ''}&sort=${cat}`).then(res=>{
      return res.data
    })
  })
  useEffect(() => {
    refetch()
  }, [cat])
  
  // console.log(data)
  return (
    <div className='Gigs'>
      <div data-aos="fade-down" className="container">
        <span className="breadcrumbs">FIVERR and GRAPHICS & DESIGN </span>
        <span className='dark'>AI Artists</span>
        <span className='p'>Explore the Boundaries of art and technology with Fiverr's Ai Artists</span>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input  ref={minRef} type="text" placeholder='min' />
            <input ref={maxRef} type="text" placeholder='max' />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="rightmen">
          <div data-aos="zoom-in" className="right">
            <span className='sortby'>SortBy</span>
            <span className='bestsell'>{cat}</span>
            <img src={down} alt="" onClick={handleclick}/>
          </div>
          {menu==true?(<div className="rightmenu">
              <span onClick={() => change("createdAt")}>Newest</span>
              <span onClick={() => change("sale")}>Best Selling</span>
            </div>):""}
          </div>
        </div>
      </div>
          <div className="cards">
          {isLoading?"loading":error?"something went wrong":data.map((gig) => (
            <GigCard key={gig._id} item={gig} />
          ))}
        </div>
    </div>
  )
}

export default Gigs

  
  
