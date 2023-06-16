import React from 'react'
import "./Reviews.scss"
import Review from '../review/Review'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
const Reviews = ({gigid}) => {
  console.log("yo",gigid)
  const {isLoading,error,data}=useQuery({
    queryKey:['review'],
    queryFn:()=>newRequest.get(`/review/${gigid}`).then(res=>{
      console.log(res.data,"done")
      return res.data
    })
  })
  return (
    <>
    <div data-aos="fade-up"className="revbox">
          <h2>Reviews</h2>
          {isLoading?("Loading"):(error?("Something went wrong"):(
            data.map((review)=>{
                return <Review key={review._id} review={review}/>
            })
          ))}
          {/* <Review/> */}
    </div>

    </>
  )
}

export default Reviews
