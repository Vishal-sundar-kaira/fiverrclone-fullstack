import React, { useState,useEffect, useReducer } from 'react'
import "./Add.scss"
import Aos from "aos"
import "aos/dist/aos.css"
import { INITIAL_STATE, gigReducer } from '../../Reducers/gigReducer'
import axios from 'axios'
import upload from '../../utils/upload'
import { useMutation } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import { useNavigate } from 'react-router-dom'
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
      dispatch({type:"ADD_IMAGES",payload:{cover:res,images:images}})
    }catch(err){
      console.log(err)
    }
  }
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const navigate=useNavigate();
  const mutation = useMutation({
    mutationFn: () => {
      return newRequest.post(`/gig/createGig`,state)
    },
    onSuccess:()=>{
      // QueryClient.invalidateQueries("myGigs")//point toward querykey of other whom you want to refresh.
      navigate("/mygigs")
    }
  })
  const handlecreate=()=>{
    console.log("handle")
    mutation.mutate();
  }
  console.log(state);

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
            <option value="developer">Developer</option>
            <option value="design">Designer</option>
            <option value="marketing">Marketing</option>
            <option value="Writer">Writer</option>
          </select>
          <div className="images">
            <div className="imagesInputs">
              <label htmlFor="">Cover Image</label>
              <input type="file" onChange={e=>setsingleFile(e.target.files[0])} />
              <label htmlFor="">Upload Images</label>
              <input type="file" onChange={e=>setFiles([...e.target.files])} multiple />
              <div className='butt' onClick={handleupload}>{uploading?"uploading":"upload"}</div>
            </div>
          </div>

          <label htmlFor="">Description</label>
          <textarea name="desc" id="description" cols="30" rows="10"onChange={handlechange} ></textarea>
          <button onClick={handlecreate}>Create</button>
        </div>  
        <div data-aos="fade-left"  className="right">
          <label htmlFor="">Service Title</label>
          <input type="text" name='shorttitle' onChange={handlechange} placeholder='eg.One-page web design' />
          <label htmlFor="">Short Description</label>
          <textarea name="shortdesc" id="shortdesc" onChange={handlechange} cols="30" rows="10" placeholder='Short Description of your service'></textarea>
          <label htmlFor="">Delivery Time(e.g. 3days)</label>
          <input type="text" name='deliveryTime' onChange={handlechange} />
          <label htmlFor="">Revision Number</label>
          <input type="number"  name="revisionNumber" onChange={handlechange} />
          <label htmlFor="">Add Features</label>
          <form action="" onSubmit={handlefeature}>
          <input type="text"  placeholder='e.g Page design' />
          <button type='submit'>Add</button>
          </form>
          <div className="addedfeatures">
            {state?.features?.map((f)=>{
              return <div className="item" key={f}><button >{f} <span onClick={()=>dispatch({type:"REMOVE_FEATURES",payload:f})}>X</span></button></div>
            })}
          </div>
          {/* onClick={dispatch({type:"REMOVE_FEATURES",payload:f})} */}
          <label htmlFor="">price</label>
          <input type="number" name='price' onChange={handlechange} />
          <button className='butt' onClick={handlecreate}>Create</button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Add
