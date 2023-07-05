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
import Register from "./Pages/register/Register"
import Login from "./Pages/login/Login"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Pay from "./Pages/pay/Pay.jsx"
import Success from "./Pages/success/Success"
import Gpay from "./Components/Gpay/Gpay"

function App() {
  const queryClient = new QueryClient()

  const Layout=()=>{
    return(
      <div className="app">
         <QueryClientProvider client={queryClient}>
         <Navbar/>
        <Outlet/>
        <Footer/>
         </QueryClientProvider>
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
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/pay/:id",
          element:<Pay/>
        },
        {
          path:"/success",
          element:<Success/>
        },
        {
          path:"/gpay",
          element:<Pay/>
        }
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
