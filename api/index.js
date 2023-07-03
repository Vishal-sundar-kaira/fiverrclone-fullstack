const express=require('express')
const mongoose=require('mongoose');
const dotenv=require('dotenv')
const userRoute=require("./routes/user.js")
const conversationRoute=require("./routes/conversation.js")
const reviewRoute=require("./routes/review.js")
const gigRoute=require("./routes/gig.js")
const messageRoute=require("./routes/message.js")
const orderRoute=require("./routes/order.js")
const authRoute=require("./routes/auth.js")
const cookieParser = require('cookie-parser');
const cors =require("cors")
const app=express();
dotenv.config();
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
app.use(express.json())//first middleware allowing to send json from client side to server
app.use(cookieParser())//second middleware for cookie for storing jwt token.
app.use(cors({origin:"https://64a2d67a082c1d00086e42cf--vishalkaira-fiverr.netlify.app",credentials:true}))
app.use((err,req,res,next)=>{
  const errorStatus=err.status||500
  const errorMessage=err.message||"something went wrong"
  return res.status(errorStatus).send(errorMessage);
})
app.use("/api/user",userRoute);
app.use("/api/gig",gigRoute);
app.use("/api/order",orderRoute);
app.use("/api/message",messageRoute);
app.use("/api/review",reviewRoute);
app.use("/api/conversation",conversationRoute);
app.use("/api/auth",authRoute);



app.listen(5000,()=>{
    console.log("backend server is running")
})