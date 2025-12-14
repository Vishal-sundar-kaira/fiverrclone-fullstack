import React,{Component,useEffect} from 'react'
import Featured from '../../Components/featured/Featured'
import Slider from '../../Components/slider/Slider'
import "./Home.scss"
import CatCard from "../../Components/catCard/catCard";
import { cards, projects } from "../../data";
import check from "../../images/check.png"
import video from "../../images/video.webp"
import newimg from "../../images/newimg.webp"
import ProjectCard from "../../Components/projectCard/ProjectCard";
import "../../Components/projectCard/ProjectCard.scss"
import graphics from "../../images/graphics.svg"
import Aos from "aos"
import "aos/dist/aos.css"
const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(()=>{
    Aos.init({duration:1000});
  },[])
  return (
    <>
    <div className='Home'>
      <Featured/>
      <h1>Popular Services</h1>
      <Slider slidesToShow={4} arrowsScroll={2}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slider>
      <div className="features">
        <div  className="container">
          <div data-aos="fade-up-right" className="left">
            <div className="text">
              <h1>A Whole world of Freelance talent at your fingertips</h1>
              <div className="head">
                <img src={check} alt="" />
                <h3>The best for every budget</h3>
              </div>
              <p>Find high-quality services at every price point. No hourly rates, just project-based pricing.</p>
              <div className="head">
                <img src={check} alt="" />
                <h3>Quality work done quickly</h3>
              </div>
              <p>Find the right freelancer to begin working on your project within minutes.</p>
              <div className="head">
                <img src={check} alt="" />
                <h3>Protected payments, every time</h3>
              </div>
              <p>Always know what you'll pay upfront. Your payment isn't released until you approve the work.</p>
              <div className="head">
                <img src={check} alt="" />
                <h3>24/7 support</h3>
              </div>
              <p>Questions? Our round-the-clock support team is available to help anytime, anywhere.</p>
            </div>
          </div>
          <div data-aos="fade-up-left" className="right">
            <img src={video} alt="" />
          </div>
        </div>
      </div>
      
      <div className="explore">
        <div  className="explorecontainer">
        <h1>Explore The Marketplace </h1>
          <div className="row">
            <div data-aos="zoom-out" data-aos-offset="200" className="skill">
              <img src={graphics} alt="" />
              <h2>Graphics & Design</h2>
            </div>
            <div data-aos="zoom-out" data-aos-offset="300" className="skill">
              <img src={graphics} alt="" />
              <h2>Graphics & Design</h2>
            </div>
            <div data-aos="zoom-out" data-aos-offset="200" className="skill">
              <img src={graphics} alt="" />
              <h2>Graphics & Design</h2>
            </div>
            <div data-aos="zoom-out" data-aos-offset="200" className="skill">
              <img src={graphics} alt="" />
              <h2>Graphics & Design</h2>
            </div>
            <div data-aos="zoom-out" data-aos-offset="200" className="skill">
              <img src={graphics} alt="" />
              <h2>Graphics & Design</h2>
            </div>
            <div className="skill" data-aos="zoom-out" data-aos-offset="200">
              <img src={graphics} alt="" />
              <h2>Graphics & Design</h2>
            </div>
            <div className="skill" data-aos="zoom-out" data-aos-offset="200">
              <img src={graphics} alt="" />
              <h2>Graphics & Design</h2>
            </div>
            <div className="skill" data-aos="zoom-out" data-aos-offset="200">
              <img src={graphics} alt="" />
              <h2>Graphics & Design</h2>
            </div>
            <div className="skill" data-aos="zoom-out" data-aos-offset="200">
              <img src={graphics} alt="" />
              <h2>Graphics & Design</h2>
            </div>
            <div className="skill" data-aos="zoom-out" data-aos-offset="200">
              <img src={graphics} alt="" />
              <h2>Graphics & Design</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="features new">
        <div className="container">
          <div data-aos="fade-up-right"  className="left">
            <div className="text">
              <h1>Gigzo<span> business</span> </h1> 
              <h2>A business solution designed for <span>teams</span> </h2>
              <p>Upgrade to a curated experience packed with tools and benefits, dedicated to businesses</p>
              <div className="head">
                <img src={check} alt="" />
                <h3>connect to freelancers with proven business experiene</h3>
              </div>
              <div className="head">
                <img src={check} alt="" />
                <h3>Get matched with the perfect talent by a customer success manager</h3>
              </div>
              <div className="head">
                <img src={check} alt="" />
                <h3>Manage teamwork and boost productivity with one powerful workspace</h3>
              </div>
              <button className="button">Explore Gigzo Business</button>
            </div>
          </div>
          <div data-aos="fade-up-left"  className="right">
            <img src={newimg} alt=""/>
          </div>
        </div>
      </div>
      <h1>Get inspired with projects made by our freelancers</h1>
      <Slider slidesToShow={4} arrowsScroll={3}>
        {projects.map((project) => (
          <ProjectCard key={project.id} item={project} />
        ))}
      </Slider>
    </div>
    </>
  )
}

export default Home
