import React from 'react'
import "./Reviews.scss"
import Review from '../review/Review'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
const Reviews = ({gigid}) => {
  console.log("yo",gigid)
  const queryClient=useQueryClient();
  const {isLoading,error,data}=useQuery({
    queryKey:["review"],
    queryFn:()=>newRequest.get(`/review/${gigid}`).then(res=>{
      console.log(res.data,"done")
      return res.data
    })
  })
  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post('/review', review)
    },
    onSuccess:()=>{
      queryClient.invalidateQueries("review")
    }
  })
  const handlesubmit=(e)=>{
    e.preventDefault();
    const desc=e.target[0].value
    const star=e.target[1].value
    mutation.mutate({gigid,desc,star});
  }
  return (
    <>
    <div data-aos="fade-up"className="revbox">
          <h2>Reviews</h2>
          {isLoading?("Loading"):(error?("Something went wrong"):(
            data.map((review)=>{
                return <Review key={review._id} review={review}/>
            })
          ))}
          <div className="reviewadd">
            <h3>Add a review</h3>
            <form action="" onSubmit={handlesubmit}>
              <input type="text" placeholder='Write your opinion'/>
              <select name="" id="">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              <button>Send</button>
            </form>
          </div>
    </div>

    </>
  )
}

export default Reviews
