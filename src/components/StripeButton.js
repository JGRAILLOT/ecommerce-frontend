import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import userService from "../services/userService";

const StripePaymentButton = ({ amount, cartId, address, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      console.log("[error]", error);
    } else {
      const response = await userService.createStripePayment({
        token: token.id,
        amount,
        cartId,
        address,
      });
      onSuccess(response);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay with Stripe
      </button>
    </form>
  );
};

export default StripePaymentButton;
