import Navbar from "./Components/navbar/Navbar"
import Home from "./Pages/home/Home"
import Gigs from "./Pages/gigs/Gigs"
import Gig from "./Pages/gig/Gig"
import Orders from "./Pages/orders/Orders"
import MyGigs from "./Pages/myGigs/MyGigs"
import Add from "./Pages/add/Add"
import Messages from "./Pages/messages/Messages"
import Message from "./Pages/message/Message"
import React from "react"
import Footer from "./Components/footer/Footer"
import {  Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import "./App.scss"
function App() {
  const Layout=()=>{
    return(
      <div className="app">
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/gigs",
          element:<Gigs/>
        },
        {
          path:"/gig/:id",
          element:<Gig/>
        },
        {
          path:"/orders",
          element:<Orders/>
        },
        {
          path:"/mygigs",
          element:<MyGigs/>
        },
        {
          path:"/add",
          element:<Add/>
        },
        {
          path:"/messages",
          element:<Messages/>
        },
        {
          path:"/message/:id",
          element:<Message/>
        },
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
