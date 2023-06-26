import React, { useState,useEffect, useReducer } from 'react'
import "./Add.scss"
import Aos from "aos"
import "aos/dist/aos.css"
import { INITIAL_STATE, gigReducer } from '../../Reducers/gigReducer'
import axios from 'axios'
import upload from '../../utils/upload'
const Add = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(()=>{
    Aos.init({duration:1000});
  },[])
  const [state,dispatch]=useReducer(gigReducer,INITIAL_STATE);
  const [singleFile,setsingleFile]=useState(undefined)
  const [Files,setFiles]=useState([])
  const [uploading,setuploading]=useState(false)

  const handlechange=(e)=>{
    dispatch({type:"CHANGE_INPUT",
    payload:{name:e.target.name,value:e.target.value}})
  }
  const handlefeature=(e)=>{
    e.preventDefault();
    dispatch({type:"ADD_FEATURES",
    payload:e.target[0].value})
    e.target[0].value="";
  }
  const handleupload=async()=>{
    setuploading(true);
    try{
      const res=await upload(singleFile);//to add only one image
      const images=await Promise.all(//to add multiple image
        [...Files.map(async file=>{//normally it get stored in arraylist for we want in array form[...Files]
          const url=await upload(file);
          return url;
        })]
      )
      setuploading(false);
      dispatch({type:"ADD_IMAGES",payload:{cover,images}})
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='add'>
      <div className="container">
      <h1 data-aos="zoom-in-down">Add New Gig</h1>
      <div className="section">
        <div data-aos="fade-right" className="left">
          <label htmlFor="">Title</label>
          <input type="text" name="title" onChange={handlechange} placeholder='e.g.I will do something Im really good at'/>
          <label htmlFor="">Category</label>
          <select name="cat" id="cat" onChange={handlechange}>
            <option value="music">Music</option>
            <option value="dance">Dance</option>
            <option value="webdev">Webdev</option>
            <option value="ml">Machine Learning</option>
          </select>
          <div className="images">
            <div className="imagesInputs">
            <label htmlFor="">Cover Image</label>
          <input type="file" onChange={e=>setsingleFile(e.target.files[0])} />
          <label htmlFor="">Upload Images</label>
          <input type="file" onChange={e=>setFiles(e.target.files)} />
          <button>{uploading?"uploading":"upload"}</button>
            </div>
          </div>

          <label htmlFor="">Description</label>
          <textarea name="desc" id="description" cols="30" rows="10"onChange={handlechange} ></textarea>
          <button>Create</button>
        </div>
        <div data-aos="fade-left"  className="right">
          <label htmlFor="">Service Title</label>
          <input type="text" name='shorttitle' onChange={handlechange} placeholder='eg.One-page web design' />
          <label htmlFor="">Short Description</label>
          <textarea name="shortdesc" id="shortdesc" onChange={handlechange} cols="30" rows="10" placeholder='Short Description of your service'></textarea>
          <label htmlFor="">Delivery Time(e.g. 3days)</label>
          <input type="text" name='deliveryTime' onChange={handlechange} />
          <label htmlFor="" name="revisionNumber" onChange={handlechange}>Revision Number</label>
          <input type="number" />
          <label htmlFor="">Add Features</label>
          <form action="" onSubmit={handlefeature}>
          <input type="text" placeholder='e.g Page design' />
          <button type='submit'>Add</button>
          </form>
          <div className="addedfeatures">
            {state?.features?.map((f)=>{
              <div className="item" key={f}><button onClick={dispatch({type:"REMOVE_FEATURES",payload:f})}>Feature <span>X</span></button></div>
            })}
          </div>
          <label htmlFor="">price</label>
          <input type="number" name='price' onChange={handlechange} />
        </div>
      </div>
      <button className='resbutton'>Create</button>
      </div>
    </div>
  )
}

export default Add
