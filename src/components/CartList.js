// src/components/CartList.js
import React, { useState, useContext, useEffect } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { loadStripe } from "@stripe/stripe-js";
import paymentService from "../services/paymentService";
import orderService from "../services/orderService";
import cartService from "../services/cartService";
import { AuthContext } from "../contexts/AuthContext";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CartList = () => {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchCart = async () => {
      const cartItems = await cartService.getCart(user._id);
      setCart(cartItems);
    };
    fetchCart();
  }, [user]);

  const handleAddressChange = (e) => setAddress(e.target.value);
  const handlePaymentChange = (e) => setPaymentMethod(e.target.value);

  const handlePaymentSuccess = async (details) => {
    const orderData = {
      userId: user._id,
      products: cart,
      address: address,
      paymentDetails: details,
    };

    await orderService.createOrder(orderData);
    await cartService.clearCart(user._id);
    setCart([]);
    alert("Payment successful and order placed!");
  };

  const handleStripePayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
      alert("Payment failed: " + error.message);
      return;
    }

    // Use paymentService to process Stripe payment
    const paymentDetails = {
      id: paymentMethod.id,
      amount:
        cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100, // amount in cents
    };

    try {
      const paymentResult = await paymentService.createStripePayment(
        paymentDetails
      );
      handlePaymentSuccess(paymentResult);
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment processing failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.map((item) => (
        <div key={item.productId}>
          <h2>{item.productName}</h2>
          <p>Price: {item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}

      <h2>Shipping Address</h2>
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Enter your address"
      />

      <h2>Payment Method</h2>
      <select value={paymentMethod} onChange={handlePaymentChange}>
        <option value="PayPal">PayPal</option>
        <option value="Card">Credit Card</option>
      </select>

      {paymentMethod === "PayPal" && (
        <PayPalScriptProvider
          options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
        >
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: cart
                        .reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0
                        )
                        .toString(),
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                const paymentResult = { id: data.orderID, details: details };
                handlePaymentSuccess(paymentResult);
              });
            }}
          />
        </PayPalScriptProvider>
      )}

      {paymentMethod === "Card" && (
        <Elements stripe={stripePromise}>
          <form onSubmit={handleStripePayment}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
              Pay
            </button>
          </form>
        </Elements>
      )}
    </div>
  );
};

export default CartList;
