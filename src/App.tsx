import './App.css'
import {loadStripe} from "@stripe/stripe-js";
import {useEffect, useState} from "react";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm.tsx";
const stripePromise = loadStripe("pk_test_51OdwfXLd5JZyVKqkCSRo6wzTsbpeunFktrrUWMIABySpH4Qk8rUKkfPrSLMlnUpx1Guri0HEk008fOiUdwcaBhoz00PtFCYYFe");
function App() {
    const[clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/apiv1/payment/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:5173"
            },
            body: JSON.stringify({currency:"usd", amount:500})
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

  return (
    <>
        {clientSecret && (
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm/>
            </Elements>
        )}
    </>
  )
}

export default App
