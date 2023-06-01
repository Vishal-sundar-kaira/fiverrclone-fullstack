import React from 'react'
import "./Reviews.scss"
import Review from '../review/Review'
import { useQuery } from '@tanstack/react-query'
const Reviews = ({gigid}) => {
    const {isLoading,error,data}=useQuery({
        queryKey:['reviews'],
        queryFn:()=>newRequest.get(`/review/${gigid}`).then(res=>{
          return res.data
        })
      })
  return (
    <>
    <div data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" className="revbox">
          <h2>Reviews</h2>
          {isLoading?("Loading"):(error?("Something went wrong"):(
            data.map((review)=>{
                <Review key={review._id} review={review}/>
            })
          ))}
          <Review/>
    </div>

    </>
  )
}

export default Reviews
