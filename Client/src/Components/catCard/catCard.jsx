import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import "./catCard.scss";
import Aos from "aos"
import "aos/dist/aos.css"
function catCard({ card }) {
  useEffect(()=>{
    Aos.init({duration:2000});
  },[])
  return (
    <Link to={`/gigs?cat=${card.title}`}>
      <div data-aos="flip-left" className="catCard">
        <img className="images" src={card.img} alt="" />
        <span className="desc">{card.desc}</span>
        <span className="title">{card.title}</span>
      </div>
    </Link>
  );
}
export default catCard;