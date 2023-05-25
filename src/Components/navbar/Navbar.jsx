import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import gig from "../../images/gig1.jpg"
import Aos from "aos"
import { GiHamburgerMenu } from 'react-icons/gi';
import "aos/dist/aos.css"
function Navbar() {
  let r=0
  useEffect(()=>{
    Aos.init({duration:2000});
  },[])
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [responsive,setresponsive]=useState(false);
  const { pathname } = useLocation();
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  const isresponsive=()=>{
    setresponsive((prevState) => !prevState);
  }
  

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  // const currentUser = null

  const currentUser = {
    id: 1,
    username: "Vishal",
    isSeller: true,
  };

  return (
    <>
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div data-aos="flip-down" className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">fiverr</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Liverr Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {currentUser ? (
            <div className="user" onClick={()=>setOpen(!open)}>
              <img
                src={gig}
                alt=""
              />
              <span>{currentUser?.username}</span>
              {open && <div className="options">
                {currentUser.isSeller && (
                  <>
                    <Link className="link" to="/mygigs">
                      Gigs
                    </Link>
                    <Link className="link" to="/add">
                      Add New Gig
                    </Link>
                  </>
                )}
                <Link className="link" to="/orders">
                  Orders
                </Link>
                <Link className="link" to="/messages">
                  Messages
                </Link>
                <Link className="link" to="/">
                  Logout
                </Link>
              </div>}
            </div>
          ) : (
            <>
              <span>Sign in</span>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
    <div className="resnavbar">
      <div className="rescontainer">
        <div className="crumb" onClick={isresponsive}>
          <GiHamburgerMenu style={{ fontSize: '30px' }} />
        </div>
        <Link to='/'>
        <span className="name">fiverr
        <span className="dot">.</span></span>
        </Link>
        <span className="join">Join</span>
      </div>
    </div>
    {responsive && <div className="resoptions">
      <hr />
                <Link className="link" to="/orders" onClick={isresponsive}>
                  orders
                </Link>
                <hr />
                <Link className="link" to="/messages" onClick={isresponsive}>
                  Messages
                </Link>
                <hr />
                <Link className="link" to="/mygigs" onClick={isresponsive}>
                      Gigs
                </Link>
                <hr />
                <Link className="link" to="/add" onClick={isresponsive}>
                      Add New Gig
                </Link>
                <hr />
              </div>}
    </>
  );
}
// GiHamburgerMenu
export default Navbar;