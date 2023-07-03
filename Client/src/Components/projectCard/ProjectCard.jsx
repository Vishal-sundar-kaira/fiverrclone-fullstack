import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.scss?inline";
import Aos from "aos"
import "aos/dist/aos.css"
function projectCard({ item }) {
  useEffect(()=>{
    Aos.init({duration:1000});
  },[])
  return (
    <Link to="/">
      <div data-aos="zoom-in" className="projectCard">
        <img src={item.img} alt="" />
        <div className="info">
          <img src={item.pp} alt="" />
          <div className="texts">
            <h2>{item.cat}</h2>
            <span>{item.username}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default projectCard;