import React from 'react'
import "./Review.scss"
import like from "../../images/like.png"
import dislike from "../../images/dislike.png"
import flag from "../../images/flag.png"
import profile from "../../images/profile.webp"
import star from "../../images/star.png"
const Review = () => {
  return (
    <>
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
    </>
  )
}

export default Review
