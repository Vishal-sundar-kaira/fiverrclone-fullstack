import React,{useEffect} from 'react'
import "./Gig.scss"
import star from "../../images/star.png"
import projimg from "../../images/projimg.webp"
import profile from "../../images/profile.webp"
import like from "../../images/like.png"
import dislike from "../../images/dislike.png"
import flag from "../../images/flag.png"
import recycle from "../../images/recycle.png"
import clock from "../../images/clock.png"
import checkk from "../../images/checkk.png"
import Aos from "aos"
import "aos/dist/aos.css"
const Gig = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(()=>{
    Aos.init({duration:1000});
  },[])
  return (
    <div className='gig'>
      <div className="gigcontainer">
        <div className="left">
        <span data-aos="fade-down" class="breadcrumbs">FIVERR and GRAPHICS & DESIGN </span>
        <h1 data-aos="fade-left">I will create ai generated art for you</h1>
        <div data-aos="fade-left" className="name">
          <img classname="img1" src={profile} alt="" />
          <div className="username">Anna Bell</div>
          <img className='img2' src={star} alt="" />
          <img className='img2' src={star} alt="" />
          <img className='img2' src={star} alt="" />
          <img className='img2' src={star} alt="" />
          <img className='img2' src={star} alt="" />
          <h3>5</h3>
        </div>
        <div data-aos="fade-right" className="imgcontain">
          <img src={projimg} alt="" />
        </div>
        <h2 data-aos="fade-up"
     data-aos-anchor-placement="center-bottom">About This Gig</h2>
        <p data-aos="fade-up"
     data-aos-anchor-placement="center-bottom">Hi and welcome C:

          I'm a professional digital artist with years of experience and I would love to help you out with your AI-generated art.

          I can edit any style as I'm good with copying art styles--my job literally requires it.

          Eyes, ears, hands, fingers, noses--all facial features and human anatomy are not an issue. But I wont limit you with humans only. I know how to paint animals and therefore how to fix possible AI flaws.</p>
          <div data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" className="seller">
            <h2>About The Seller</h2>
            <div className="info2">
              <img classname="userimg" src={profile} alt="" />
              <div className="name2">
                <h3>Anna Bell</h3>
                <div className="star2">
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <h5>5</h5>
                </div>
                <button className='contact'>Contact Me</button>
              </div>
            </div>
            </div>
            {/* padding in box and container left right then para */}
          <div data-aos="flip-up" className="box">
            <div className="container">
              <div className="left">
                <span classname="tag">From</span>
                <span className='ans'>USA</span>
                <span classname="tag">Avg.response time</span>
                <span className='ans'>4 hours</span>
                <span classname="tag">Languages</span>
                <span className='ans'>English</span>
              </div>
              <div className="right">
                <span classname="tag">Member since</span>
                <span className='ans'>Aug 2022</span>
                <span classname="tag">Last delivery</span>
                <span className='ans'>1 day</span>
              </div>
            </div>
            <hr />
            <div className="para">
              <p>I am a professional 2D artist specialising in fantasy illustration and concept art. Having a degree in the field, I worked with international game studios and TTRPG publishers for 6 years.</p>
            </div>
          </div>
        <div data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" className="revbox">
          <h2>Reviews</h2>
          <div className="rev">
            <div className="person">
              <img src={profile} alt="" />
              <div className="nameloc">
                <h3>Vishal</h3>
                <div className="country">
                  <img src={flag} alt="" />
                  <h3>india</h3>
                </div>
              </div>
            </div>
            <div className="stars">
              <img src={star} alt=""/>
              <img src={star} alt=""/>
              <img src={star} alt=""/>
              <img src={star} alt=""/>
              <img src={star} alt=""/>
              <h3>5</h3>
            </div>
            <div className="reviewpara">
              Hi and welcome C: I'm a professional digital artist with years of experience and I would love to help you out with your AI-generated art. I can edit any style as I'm good with copying art styles--my job literally requires it. Eyes, ears, hands, fingers, noses--all facial features and human anatomy are not an issue
            </div>
            <div className="helpful">
              <h3>Helpful?</h3>
              <img src={like} alt="" />
              <h3>Yes</h3>
              <img src={dislike} alt="" />
              <h3>No</h3>
            </div>
          </div>
        </div>
        <hr />
        <div data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" className="revbox">
          <div className="rev">
            <div className="person">
              <img src={profile} alt="" />
              <div className="nameloc">
                <h3>Sahil</h3>
                <div className="country">
                  <img src={flag} alt="" />
                  <h3>India</h3>
                </div>
              </div>
            </div>
            <div className="stars">
              <img src={star} alt=""/>
              <img src={star} alt=""/>
              <img src={star} alt=""/>
              <img src={star} alt=""/>
              <img src={star} alt=""/>
              <h3>5</h3>
            </div>
            <div className="reviewpara">
              Hi and welcome C: I'm a professional digital artist with years of experience and I would love to help you out with your AI-generated art. I can edit any style as I'm good with copying art styles--my job literally requires it. Eyes, ears, hands, fingers, noses--all facial features and human anatomy are not an issue
            </div>
            <div className="helpful">
              <h3>Helpful?</h3>
              <img src={like} alt="" />
              <h3>Yes</h3>
              <img src={dislike} alt="" />
              <h3>No</h3>
            </div>
          </div>
        </div>
        <hr />
        <div data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" className="revbox">
          <div className="rev">
            <div className="person">
              <img src={profile} alt="" />
              <div className="nameloc">
                <h3>Absek</h3>
                <div className="country">
                  <img src={flag} alt="" />
                  <h3>India</h3>
                </div>
              </div>
            </div>
            <div className="stars">
              <img src={star} alt=""/>
              <img src={star} alt=""/>
              <img src={star} alt=""/>
              <img src={star} alt=""/>
              <img src={star} alt=""/>
              <h3>5</h3>
            </div>
            <div className="reviewpara">
              Hi and welcome C: I'm a professional digital artist with years of experience and I would love to help you out with your AI-generated art. I can edit any style as I'm good with copying art styles--my job literally requires it. Eyes, ears, hands, fingers, noses--all facial features and human anatomy are not an issue
            </div>
            <div className="helpful">
              <h3>Helpful?</h3>
              <img src={like} alt="" />
              <h3>Yes</h3>
              <img src={dislike} alt="" />
              <h3>No</h3>
            </div>
          </div>
        </div>
        </div>
        <div data-aos="fade-left" className="right">
          <div className="gigrightcontainer">
            <div className="money">
              <h2>1 AI Generated image</h2>
              <h3>$59.99</h3>
            </div>
            <p>Contact me privately (via "Contact Seller" below), send the image and I'll quote you the price</p>
            <div className="days">
              <div className="leftdays">
              <img src={clock} alt="" />
              <h3>2 Days Delivery</h3>
              </div>
              <div className="rightdays">
                <img src={recycle} alt="" />
                <h3>3 Revisions</h3>
              </div>
            </div>
            <div className="work">
              <div className="line">
                <img src={checkk} alt="" />
                <h3>Prompt Writing</h3>
              </div>
              <div className="line">
                <img src={checkk} alt="" />
                <h3>Artwork Delivery</h3>
              </div>
              <div className="line">
                <img src={checkk} alt="" />
                <h3>Image upscaling</h3>
              </div>
              <div className="line">
                <img src={checkk} alt="" />
                <h3>Additional design</h3>
              </div>
            </div>
            <button>Continue</button>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Gig
