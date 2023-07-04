import React,{useEffect} from 'react'
import "./Gig.scss"
import star from "../../images/star.png"
import projimg from "../../images/projimg.webp"
import nouser from "../../images/nouser.png"
import recycle from "../../images/recycle.png"
import clock from "../../images/clock.png"
import checkk from "../../images/checkk.png"
import Aos from "aos"
import "aos/dist/aos.css"
import { useParams,Link, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import Slider from '../../Components/slider/Slider'
import Reviews from '../../Components/reviews/Reviews'
import Gpay from '../../Components/Gpay/Gpay'
const Gig = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate=useNavigate();
  useEffect(()=>{
    Aos.init({duration:1000});
  },[])
  const {id}=useParams();
  // console.log(id)
  const mutation = useMutation({
    mutationFn: () => {
      return newRequest.post(`/order/${id}`)
    },
    onSuccess:()=>{
      navigate("/orders")
    }
  })
  const handlepayment=()=>{
    mutation.mutate();
  }
  const {isLoading,error,data}=useQuery({
    queryKey:['gigs'],
    queryFn:()=>newRequest.get(`/gig/single/${id}`).then(res=>{
      // console.log(res.data.userid)
      return res.data
    })
  })
  // const userId = data?.userId;
  const {isLoading:isLoadingUser,error:errorUser,data:dataUser}=useQuery({
    queryKey:["user"],
    queryFn:()=>newRequest.get(`/user/${data?.userid}`).then(res=>{
      return res.data
    }),
    enabled:!!data,//run only when data value is enabled or ready.
    waitFor: data
  })
  // console.log(data.title)
  return (
    <div className='gig'>
       {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong"
      ) : data? (<><div className="gigcontainer">
        <div className="left">
        <span data-aos="fade-down" className="breadcrumbs">FIVERR and GRAPHICS & DESIGN </span>
        <h1 data-aos="fade-left">{data.title}</h1>
        {isLoadingUser?"Loadinguser":error?"something went wrong":dataUser?(<div data-aos="fade-left" className="name">
          <img className="img1" src={dataUser.img?dataUser.img:nouser} alt="" />
          <div className="username">{dataUser.username}</div>
          {!isNaN(data.totalStars/data.starNumber)&&(
            <div className="stars">
              {Array(Math.round(data.totalStars/data.starNumber))
              .fill()
              .map((item,i)=>(
                <img className='img2' src={star} key={i} alt="" />
              ))}  
          <h3>{Math.round(data.totalStars/data.starNumber)}</h3>
            </div>
         )}
        </div>):null}
        <div data-aos="fade-right" className="imgcontain">
        <Slider slidesToShow={2} arrowsScroll={1}>
          {data.images.map((img)=>{
            return <img key={img} src={img||projimg} alt='cant find image'/>
          })}
      </Slider>
        </div>
        <h2 data-aos="fade-up"
     data-aos-anchor-placement="center-bottom">About This Gig</h2>
        <p data-aos="fade-up"
     data-aos-anchor-placement="center-bottom">{data.desc}</p>
          {isLoadingUser?"Loadinguser":errorUser?"something went wrong":dataUser?(<><div data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" className="seller">
            <h2>About The Seller</h2>
            <div className="info2">
              <img className="userimg" src={dataUser.img?dataUser.img:nouser} alt="" />
              <div className="name2">
                <h3>{dataUser.username}</h3>
                {!isNaN(data.totalStars/data.starNumber)&&(
            <div className="star2">
              {Array(Math.round(data.totalStars/data.starNumber))
              .fill()
              .map((item,i)=>(
                <img src={star} key={i} alt="" />
              ))}  
          <h3>{Math.round(data.totalStars/data.starNumber)}</h3>
            </div>
         )}
                <button className='contact'>Contact Me</button>
              </div>
            </div>
            </div>
          <div data-aos="flip-up" className="box">
            <div className="container">
              <div className="left">
                <span className="tag">From</span>
                <span className='ans'>{dataUser.country}</span>
                <span className="tag">Avg.response time</span>
                <span className='ans'>4 hours</span>
                <span className="tag">Languages</span>
                <span className='ans'>English</span>
              </div>
              <div className="right">
                <span className="tag">Member since</span>
                <span className='ans'>Aug 2022</span>
                <span className="tag">Last delivery</span>
                <span className='ans'>1 day</span>
              </div>
            </div>
            <hr />
            <div className="para">
              <p>{dataUser.desc}</p>
            </div>
          </div></>):null}
        <Reviews gigid={id}/>
        </div>
        <div data-aos="fade-left" className="right">
          <div className="gigrightcontainer">
            <div className="money">
              <h2>{data.shorttitle}</h2>
              <h3>RS {data.price}</h3>
            </div>
            <p>Contact me privately (via "Contact Seller" below), send the image and I'll quote you the price</p>
            <div className="days">
              <div className="leftdays">
              <img src={clock} alt="" />
              <h3>{data.deliveryTime} Days Delivery</h3>
              </div>
              <div className="rightdays">
                <img src={recycle} alt="" />
                <h3>{data.revisionNumber} Revisions</h3>
              </div>
            </div>
            <div className="work">
                {data.features?.map((feature)=>(
                    <div className="line" key={feature}>
                    <img src={checkk} alt="" />
                    <h3>{feature}</h3>
                  </div>
                ))}
            </div>
            <Gpay/>
            <button className="button" onClick={handlepayment}>Continue</button>
          </div>
        </div>
        </div></>) : null}
    </div>
  )
}

export default Gig