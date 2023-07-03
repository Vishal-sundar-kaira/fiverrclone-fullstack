import React,{useEffect} from 'react'
import "./GigCard.scss"
import gig1 from "../../images/gig1.jpg"
import sample from "../../images/newimg.webp"
import heart from "../../images/heart.png"
import star from "../../images/star.png"
import nouser from "../../images/nouser.png"
import { Link } from 'react-router-dom'
import Aos from "aos"
import "aos/dist/aos.css"
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
const GigCard = ({item}) => {
    useEffect(()=>{
        Aos.init({duration:1000,offset:0});
      },[])

      const {isLoading,error,data}=useQuery({
        queryKey:[`${item.userid}`],
        queryFn:()=>newRequest.get(`/user/${item.userid}`).then(res=>{
          return res.data
        })
      })
      // useEffect(() => {
      //   refetch()
      // }, [])

  return (
                <Link className='link' to={`/gig/${item._id}`}>
                <div data-aos="zoom-in" className="maincard">
                    <img className='img' src={item.cover||gig1} alt="no image" />
                    <div className="cardright">
                    {isLoading?"loading":error?"something went wrong":<div className="name">
                        <img src={data.img||nouser} alt="" />
                        <h2>{data.username}</h2>
                    </div>}
                    <p>{item.shortdesc}</p>
                    <div className="star">
                        <img src={star} alt="" />
                        <h2>{!isNaN(item.totalStars/item.starNumber)&&Math.round(item.totalStars/item.starNumber)}</h2>
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
