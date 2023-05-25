import React,{useEffect} from 'react'
import "./GigCard.scss"
import gig1 from "../../images/gig1.jpg"
import sample from "../../images/newimg.webp"
import heart from "../../images/heart.png"
import star from "../../images/star.png"
import gigimg from "../../images/gigimg.webp"
import { Link } from 'react-router-dom'
import Aos from "aos"
import "aos/dist/aos.css"
const GigCard = ({item}) => {
    useEffect(()=>{
        Aos.init({duration:1000,offset:0});
      },[])
  return (
                <Link className='link' to="/gig/123">
                <div data-aos="zoom-in" className="maincard">
                    <img className='img' src={item.img} alt="" />
                    <div className="cardright">
                    <div className="name">
                        <img src={item.pp} alt="" />
                        <h2>arpitdk123</h2>
                    </div>
                    <p>{item.desc}</p>
                    <div className="star">
                        <img src={star} alt="" />
                        <h2>{item.star}</h2>
                    </div>
                    <hr/>
                    <div className="status">
                        <img className='imag' src={heart} alt="" />
                        <div className="price">
                            <div className='h2gigcard'>Starting At</div>
                            <h1>{item.price}</h1>
                        </div>
                    </div>
                    </div>
                </div>
                </Link>
  )
}

export default GigCard
