import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "../Stripe.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/Order/orderSlice";
import { Navigate } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51PeWf8LHckqwykmeQhhq3cbnTH00eGKe0DXAFyrCx6rH7VnlPn0IJPd5FCNAOkN9En0H2NPvWzx4ORK9b0aCPRbJ00BycNeaLL");

function StripePaymentCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder)
  const totalAmount = Math.round(currentOrder.totalAmount*100)

  useEffect(() => {
    async function payment(){
        const {data} = await axios.post('/create-payment-intent', {totalAmount, orderId: currentOrder.id})
        setClientSecret(data.clientSecret)
    }

    payment()
  }, []);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  if(!currentOrder){
    <Navigate to='/' replace={true}/>
  }

  return (
    <div className="stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default StripePaymentCheckout