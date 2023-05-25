import React from 'react'
import "./Featured.scss"
import searchicon from "../../images/searchicon.png"
import man from "../../images/man.png"
const Featured = () => {
  return (
    <>
    <div className='main'>
      <div className="left">
        <div className="lefttext">
            <div className="text1">Find the Perfect <i>Freelance</i></div>
            <div className="text2">Service For Your Business</div>
            <div className="search">
              <div className="searchin">
              <div className="searchicon"><img src={searchicon} alt="" /></div>
                <input type="text" className="input" placeholder='Try building mobile app' ></input>
              </div>
                <div className="searchbtn"> Search</div>
            </div>
            <div className="popular">
              <h3>Popular:</h3>
              <button className="p">Web Design</button>
              <button className="p">Wordpress</button>
              <button className="p">Logo Design</button>
              <button className="p"> AI Services</button>
            </div>
        </div>
      </div>
      <div className="right">
        <img src={man} alt="" />
      </div>
    </div>
    <div className="trust">
      <h2>Trusted by:-</h2>
      <h2>Facebook</h2>
      <h2>Google</h2>
      <h2>Netflix</h2>
      <h2>P&G</h2>
      <h2>PayPal</h2>
    </div>
    </>
  )
}

export default Featured
