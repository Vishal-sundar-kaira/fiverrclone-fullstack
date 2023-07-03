import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./Pay.scss"
import newRequest from '../../utils/newRequest';
import { useParams } from "react-router-dom";
import CheckoutForm from "../checkoutform/CheckoutForm";
const stripePromise = loadStripe("pk_test_51NLLONSA7gFjAPXBfnazCy0T86EkQRk72TczoDvwihKjMnyDN5PnrxrTCqaeyz0TpAKs2TXWZuo9fSjRfbKofgBu00W3UIgV3g");
const Pay = () => {
    const [clientSecret, setClientSecret] = useState("");
    const {id}=useParams();
    useEffect(()=>{
        const makeRequest=async()=>{
            try{
                const res=newRequest.post(`/order/create-payment-intent/${id}`);
                setClientSecret(res.data.clientSecret);
            }catch(err){
                console.log(err);
            }
        }
        makeRequest();
    },[])
    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };
  return (
    <div className="Pay">
        {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Pay
