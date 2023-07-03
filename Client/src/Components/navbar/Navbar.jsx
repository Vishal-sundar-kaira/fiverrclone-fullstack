import React, { useEffect, useState} from "react";
import { Link, useLocation ,useNavigate} from "react-router-dom";
import "./Navbar.scss";
import gig from "../../images/gig1.jpg"
import Aos from "aos"
import { GiHamburgerMenu } from 'react-icons/gi';
import "aos/dist/aos.css"
import newRequest from "../../utils/newRequest";
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
  const Navigate=useNavigate();
  const handlelogout=async()=>{
    try{
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser",null)
      Navigate("/")
    }catch(err)
    {
      console.log(err)
    }
  }


  // const currentUser = null

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

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
          {currentUser? (
            <div className="user" onClick={()=>setOpen(!open)}>
              <img
                src={currentUser.img||gig}
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
                <Link className="link"onClick={handlelogout}>
                  Logout
                </Link>
              </div>}
            </div>
          ) : (
            <>
            <Link className="link" to="/login"><span>Sign in</span></Link>
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
        <Link to='/'onClick={isresponsive}>
        <span className="name">fiverr
        <span className="dot">.</span></span>
        </Link>
        <img
                src={currentUser&&currentUser.img||gig}
                alt=""
              />
      </div>
    </div>
    {responsive && <div className="resoptions">
      <hr />
      {!currentUser?(<Link className="link" to="/login" onClick={isresponsive}>
                  Login
                </Link>):(<Link className="link" onClick={handlelogout} >
                  logout
                </Link>)}
                <Link className="link" to="/register" onClick={isresponsive}>
                  join
                </Link>
                <Link className="link" to="/orders" onClick={isresponsive}>
                  orders
                </Link>
                <hr />
                
                {currentUser.isSeller&&(<><Link className="link" to="/messages" onClick={isresponsive}>
                  Messages
                </Link>
                <hr />
                <Link className="link" to="/mygigs" onClick={isresponsive}>
                      Gigs
                </Link>
                <hr />
                <Link className="link" to="/add" onClick={isresponsive}>
                      Add New Gig
                </Link></>)}
                <hr />
              </div>}
    </>
  );
}
// GiHamburgerMenu
export default Navbar;