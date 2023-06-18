import React from 'react'
import "./Review.scss"
import like from "../../images/like.png"
import dislike from "../../images/dislike.png"
import flag from "../../images/flag.png"
import profile from "../../images/profile.webp"
import star from "../../images/star.png"
import { useMutation, useQuery } from '@tanstack/react-query'
import nouser from "../../images/nouser.png"
import newRequest from '../../utils/newRequest'
const Review = ({review}) => {
  const {isLoading,error,data}=useQuery({
    queryKey:[review.userid],
    queryFn:()=>newRequest.get(`/user/${review.userid}`).then((res)=>{
      // console.log(res.data,"done")
      return res.data
    })
  })


  return (
    <>
    {isLoading?"Loading":(error?"There is some error":(
       <div className="rev">
       <div className="person">
         <img src={data.img?data.img:nouser} alt="" />
         <div className="nameloc">
           <h3>{data.username}</h3>
           <div className="country">
             <img src={flag} alt="" />
             <h3>{data.country}</h3>
           </div>
         </div>
       </div>
       <div className="stars">
       {Array(review.star).fill().map((item,i)=>(
           <img src={star} key={i}  alt=""/>
       ))}
       </div>
       <div className="reviewpara">
         {review.desc}
       </div>
       <div className="helpful">
         <h3>Helpful?</h3>
         <img src={like} alt="" />
         <h3>Yes</h3>
         <img src={dislike} alt="" />
         <h3>No</h3>
       </div>
     </div>
    ))}
             
    </>
  )
}

export default Review
